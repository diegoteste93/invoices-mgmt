import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}
  async summary() {
    const [processed, pendingReview, withoutCostCenter, divergence, topVendors, dist] = await Promise.all([
      this.prisma.invoice.count(),
      this.prisma.invoice.count({ where: { status: 'review_required' } }),
      this.prisma.invoice.count({ where: { costCenterCode: null } }),
      this.prisma.invoice.count({ where: { confidence: { lt: 0.65 } } }),
      this.prisma.invoice.groupBy({ by: ['vendorId'], _sum: { amount: true }, _count: true }),
      this.prisma.invoice.groupBy({ by: ['costCenterCode'], _sum: { amount: true }, _count: true })
    ]);

    const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0,0,0,0);
    const monthTotal = await this.prisma.invoice.aggregate({ where: { createdAt: { gte: monthStart } }, _sum: { amount: true } });

    return {
      totalInvoices: processed,
      totalMonthAmount: monthTotal._sum.amount ?? 0,
      pendingReview,
      withoutCostCenter,
      divergence,
      topVendors,
      distributionByCostCenter: dist,
      alerts: [
        { type: 'review', message: `${pendingReview} invoices aguardando revisão` },
        { type: 'cost_center', message: `${withoutCostCenter} invoices sem centro de custo` }
      ]
    };
  }
}
