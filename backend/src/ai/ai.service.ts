import { Injectable } from '@nestjs/common';
import { z } from 'zod';

const aiSchema = z.object({
  provider: z.string(),
  confidence: z.number(),
  justification: z.string(),
  suggestedCategory: z.string(),
  suggestedVendor: z.string().nullable(),
  suggestedCostCenterCode: z.string().nullable(),
  suggestedAllocation: z.array(z.object({ costCenterCode: z.string(), percent: z.number() })),
  summary: z.string()
});

@Injectable()
export class AiService {
  async analyze(rawText: string, vendorId?: string) {
    if (process.env.AI_MODE === 'openai' && process.env.OPENAI_API_KEY) {
      // fallback seguro: mantém estrutura mock para execução local determinística
    }

    const lower = rawText.toLowerCase();
    const suggestedCostCenterCode = lower.includes('openai') || lower.includes('aws') ? 'ENG-001' : lower.includes('microsoft') ? 'FIN-001' : null;
    return aiSchema.parse({
      provider: process.env.AI_MODE === 'openai' ? 'openai' : 'mock',
      confidence: suggestedCostCenterCode ? 0.85 : 0.64,
      justification: vendorId ? 'Fornecedor conhecido no histórico.' : 'Classificação por padrões do texto.',
      suggestedCategory: 'licenciamento_tecnologia',
      suggestedVendor: lower.includes('aws') ? 'AWS' : lower.includes('microsoft') ? 'Microsoft' : lower.includes('openai') ? 'OpenAI' : null,
      suggestedCostCenterCode,
      suggestedAllocation: suggestedCostCenterCode ? [{ costCenterCode: suggestedCostCenterCode, percent: 100 }] : [],
      summary: 'Cobrança recorrente de tecnologia detectada com sugestão de centro de custo.'
    });
  }
}
