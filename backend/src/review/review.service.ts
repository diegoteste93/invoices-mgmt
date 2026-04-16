import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}
  queue() { return this.prisma.reviewTask.findMany({ where: { status: { in: ['pending', 'in_review'] } }, include: { invoice: { include: { vendor: true } } }, orderBy: { createdAt: 'asc' } }); }
  async resolve(id: string, payload: { costCenterCode?: string; notes?: string }) {
    const task = await this.prisma.reviewTask.update({ where: { id }, data: { status: 'resolved' } });
    await this.prisma.invoice.update({ where: { id: task.invoiceId }, data: { status: 'classified', costCenterCode: payload.costCenterCode ?? undefined } });
    await this.prisma.auditLog.create({ data: { entityType: 'ReviewTask', entityId: id, action: 'resolved', details: payload as any } });
    return task;
  }
}
