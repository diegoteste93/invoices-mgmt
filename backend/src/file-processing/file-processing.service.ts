import { Injectable } from '@nestjs/common';

@Injectable()
export class FileProcessingService {
  async extractStructured(rawText: string) {
    const amountMatch = rawText.match(/(\d+[\.,]\d{2})/);
    const confidence = amountMatch ? 0.82 : 0.55;
    return {
      invoiceNumber: rawText.match(/INV[-\w]+/)?.[0] ?? null,
      detectedAmount: amountMatch?.[1] ?? null,
      confidence,
      source: 'raw-text-parser'
    };
  }
}
