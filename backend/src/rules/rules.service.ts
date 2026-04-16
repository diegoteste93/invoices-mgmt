import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RulesService {
  constructor(private prisma: PrismaService) {}
  listClassification() { return this.prisma.classificationRule.findMany({ orderBy: { createdAt: 'desc' } }); }
  listAllocation() { return this.prisma.allocationRule.findMany({ orderBy: { createdAt: 'desc' } }); }
  createClassification(data: any) { return this.prisma.classificationRule.create({ data }); }
  createAllocation(data: any) { return this.prisma.allocationRule.create({ data }); }
  updateClassification(id: string, data: any) { return this.prisma.classificationRule.update({ where: { id }, data }); }
  updateAllocation(id: string, data: any) { return this.prisma.allocationRule.update({ where: { id }, data }); }
}
