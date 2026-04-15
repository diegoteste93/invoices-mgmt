import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  it('deve autenticar usuário válido', async () => {
    const prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          id: '1',
          email: 'admin@local.test',
          role: 'admin',
          name: 'Admin',
          passwordHash: await bcrypt.hash('admin123', 10)
        })
      }
    } as any;
    const service = new AuthService(prisma, new JwtService({ secret: 'test' }));
    const result = await service.login('admin@local.test', 'admin123');
    expect(result.accessToken).toBeDefined();
  });
});
