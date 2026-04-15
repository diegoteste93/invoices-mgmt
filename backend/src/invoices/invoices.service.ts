import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileProcessingService } from '../file-processing/file-processing.service';
import { AiService } from '../ai/ai.service';
import { AllocationsService } from '../allocations/allocations.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService, private fileProcessing: FileProcessingService, private ai: AiService, private allocations: AllocationsService) {}

  list(filters: any) {
    return this.prisma.invoice.findMany({
      where: {
        status: filters.status,
        currency: filters.currency,
        vendor: filters.vendor ? { name: { contains: filters.vendor, mode: 'insensitive' } } : undefined,
        costCenterCode: filters.costCenterCode
      },
      include: { vendor: true, reviewTasks: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  detail(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: {
        vendor: true,
        extractionResults: true,
        ocrResults: true,
        aiAnalyses: true,
        reviewTasks: true,
        allocationResults: true
      }
    });
  }

  async runProcessing(id: string) {
    const invoice = await this.prisma.invoice.findUniqueOrThrow({ where: { id } });
    const parsed = await this.fileProcessing.extractStructured(invoice.rawText ?? '');
    const ai = await this.ai.analyze(invoice.rawText ?? '', invoice.vendorId ?? undefined);
    const allocation = await this.allocations.suggest(invoice.vendorId, ai.suggestedCostCenterCode);
    const confidence = Math.max(parsed.confidence, ai.confidence);

    await this.prisma.extractionResult.create({ data: { invoiceId: id, provider: 'parser', confidence: parsed.confidence, rawJson: parsed as any } });
    await this.prisma.aIAnalysis.create({ data: { invoiceId: id, provider: ai.provider, confidence: ai.confidence, justification: ai.justification, structuredData: ai as any } });
    await this.prisma.allocationResult.create({ data: { invoiceId: id, allocationType: 'percentage', split: allocation.split as any, decisionSource: allocation.source, ruleId: allocation.ruleId } });

    const reviewRequired = confidence < Number(process.env.CONFIDENCE_THRESHOLD || 0.75) || !ai.suggestedCostCenterCode;
    await this.prisma.invoice.update({
      where: { id },
      data: {
        confidence,
        status: reviewRequired ? 'review_required' : 'classified',
        costCenterCode: ai.suggestedCostCenterCode,
        suggestedAllocation: allocation.split as any,
        processedAt: new Date(),
        rawJson: { parsed, ai }
      }
    });

    if (reviewRequired) {
      await this.prisma.reviewTask.create({ data: { invoiceId: id, reason: 'Confiança baixa ou centro de custo ausente' } });
    }

    return this.detail(id);
  }
}
