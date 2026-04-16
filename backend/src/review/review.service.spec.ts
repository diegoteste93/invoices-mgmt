import { ReviewService } from './review.service';

describe('ReviewService', () => {
  it('deve listar fila de revisão', async () => {
    const service = new ReviewService({
      reviewTask: { findMany: jest.fn().mockResolvedValue([]) }
    } as any);
    await expect(service.queue()).resolves.toEqual([]);
  });
});
