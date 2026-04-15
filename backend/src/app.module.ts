import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { CostCentersModule } from './cost-centers/cost-centers.module';
import { RulesModule } from './rules/rules.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ReviewModule } from './review/review.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';
import { HealthModule } from './health/health.module';
import { EmailIngestionModule } from './email-ingestion/email-ingestion.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, CostCentersModule, RulesModule, InvoicesModule, ReviewModule, DashboardModule, SettingsModule, HealthModule, EmailIngestionModule],
  providers: [PrismaService]
})
export class AppModule {}
