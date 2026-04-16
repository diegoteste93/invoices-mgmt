import { AiService } from './ai.service';

describe('AiService', () => {
  it('deve sugerir centro de custo para openai', async () => {
    const service = new AiService();
    const res = await service.analyze('openai monthly invoice', undefined);
    expect(res.suggestedCostCenterCode).toBe('ENG-001');
  });
});
