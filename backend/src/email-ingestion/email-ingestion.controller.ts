import { Controller, Post } from '@nestjs/common';
import { EmailIngestionService } from './email-ingestion.service';

@Controller('email-ingestion')
export class EmailIngestionController {
  constructor(private readonly service: EmailIngestionService) {}
  @Post('scan') scan() { return this.service.scanAndPersist(); }
}
