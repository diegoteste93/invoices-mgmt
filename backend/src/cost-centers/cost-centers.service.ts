import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CostCentersService {
  constructor(private prisma: PrismaService) {}
  list() { return this.prisma.costCenter.findMany({ orderBy: { createdAt: 'desc' } }); }
  create(data: { code: string; name: string; description?: string; area?: string; status?: string }) { return this.prisma.costCenter.create({ data }); }
  update(id: string, data: Partial<{ code: string; name: string; description: string; area: string; status: string }>) { return this.prisma.costCenter.update({ where: { id }, data }); }
  remove(id: string) { return this.prisma.costCenter.delete({ where: { id } }); }
}
