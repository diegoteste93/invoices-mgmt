import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { PrismaService } from '../prisma/prisma.service';
import { FileProcessingService } from '../file-processing/file-processing.service';
import { AiService } from '../ai/ai.service';
import { OcrService } from '../ocr/ocr.service';
import { AllocationsService } from '../allocations/allocations.service';

@Module({ controllers: [InvoicesController], providers: [InvoicesService, PrismaService, FileProcessingService, AiService, OcrService, AllocationsService] })
export class InvoicesModule {}
