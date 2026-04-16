import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AllocationsService {
  constructor(private prisma: PrismaService) {}

  async suggest(vendorId?: string | null, fallbackCostCenterCode?: string | null) {
    if (vendorId) {
      const vendor = await this.prisma.vendor.findUnique({ where: { id: vendorId } });
      if (vendor) {
        const rule = await this.prisma.allocationRule.findFirst({ where: { condition: vendor.name, active: true } });
        if (rule) {
          return { split: rule.allocation as any, source: 'rule', ruleId: rule.id };
        }
      }
    }
    if (fallbackCostCenterCode) {
      return { split: { splits: [{ costCenterCode: fallbackCostCenterCode, percent: 100 }] }, source: 'ai', ruleId: null };
    }
    return { split: { splits: [] }, source: 'manual', ruleId: null };
  }
}
