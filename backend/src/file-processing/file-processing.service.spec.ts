import { FileProcessingService } from './file-processing.service';

describe('FileProcessingService', () => {
  it('deve extrair valor com confiança alta quando detecta padrão monetário', async () => {
    const service = new FileProcessingService();
    const result = await service.extractStructured('Invoice INV-1 amount 100.00 USD');
    expect(result.detectedAmount).toBe('100.00');
    expect(result.confidence).toBeGreaterThan(0.8);
  });
});
