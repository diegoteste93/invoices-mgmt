import { PrismaClient, RoleName, InvoiceStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@local.test' },
    update: {},
    create: { email: 'admin@local.test', name: 'Admin User', passwordHash, role: RoleName.admin }
  });

  const costCenters = await Promise.all([
    prisma.costCenter.upsert({ where: { code: 'ENG-001' }, update: {}, create: { code: 'ENG-001', name: 'Engenharia', area: 'Produto' } }),
    prisma.costCenter.upsert({ where: { code: 'FIN-001' }, update: {}, create: { code: 'FIN-001', name: 'Financeiro', area: 'Backoffice' } }),
    prisma.costCenter.upsert({ where: { code: 'DATA-001' }, update: {}, create: { code: 'DATA-001', name: 'Data Platform', area: 'Tech' } })
  ]);

  const aws = await prisma.vendor.upsert({ where: { name: 'AWS' }, update: {}, create: { name: 'AWS', domain: 'amazonaws.com' } });
  const ms = await prisma.vendor.upsert({ where: { name: 'Microsoft' }, update: {}, create: { name: 'Microsoft', domain: 'microsoft.com' } });
  const openai = await prisma.vendor.upsert({ where: { name: 'OpenAI' }, update: {}, create: { name: 'OpenAI', domain: 'openai.com' } });

  await prisma.allocationRule.createMany({
    data: [
      { name: 'AWS Engenharia 100%', ruleType: 'vendor', condition: 'AWS', allocation: { splits: [{ costCenterCode: 'ENG-001', percent: 100 }] } },
      { name: 'OpenAI dividido', ruleType: 'vendor', condition: 'OpenAI', allocation: { splits: [{ costCenterCode: 'ENG-001', percent: 70 }, { costCenterCode: 'DATA-001', percent: 30 }] } }
    ],
    skipDuplicates: true
  });

  await prisma.invoice.createMany({
    data: [
      { externalId: 'INV-AWS-2026-03', vendorId: aws.id, amount: 1200, currency: 'USD', status: InvoiceStatus.classified, sourceType: 'email', confidence: 0.96, costCenterCode: costCenters[0].code, rawText: 'AWS invoice March 2026' },
      { externalId: 'INV-MS-2026-03', vendorId: ms.id, amount: 840, currency: 'USD', status: InvoiceStatus.review_required, sourceType: 'email', confidence: 0.62, rawText: 'Microsoft Azure invoice' },
      { externalId: 'INV-OAI-2026-03', vendorId: openai.id, amount: 410, currency: 'USD', status: InvoiceStatus.parsed, sourceType: 'email', confidence: 0.81, rawText: 'OpenAI API usage' },
      { externalId: 'INV-SAAS-2026-03', amount: 199, currency: 'USD', status: InvoiceStatus.received, sourceType: 'upload', confidence: 0.5, rawText: 'Generic SaaS subscription' }
    ],
    skipDuplicates: true
  });

  const inv = await prisma.invoice.findFirst({ where: { externalId: 'INV-MS-2026-03' } });
  if (inv) {
    await prisma.reviewTask.upsert({
      where: { id: inv.id },
      update: {},
      create: { id: inv.id, invoiceId: inv.id, status: 'pending', reason: 'Baixa confiança de extração' }
    });
  }

  await prisma.payment.createMany({
    data: [
      { vendorName: 'AWS', amount: 1200, currency: 'USD', paidAt: new Date('2026-03-29'), source: 'csv', reference: 'CARD-9981' },
      { vendorName: 'Microsoft', amount: 840, currency: 'USD', paidAt: new Date('2026-03-30'), source: 'manual', reference: 'TRX-20260330-89' }
    ],
    skipDuplicates: true
  });
}

main().finally(() => prisma.$disconnect());
