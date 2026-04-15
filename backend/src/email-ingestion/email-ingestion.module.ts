import { Module } from '@nestjs/common';
import { EmailIngestionService } from './email-ingestion.service';
import { EmailIngestionController } from './email-ingestion.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({ providers: [EmailIngestionService, PrismaService], controllers: [EmailIngestionController] })
export class EmailIngestionModule {}
