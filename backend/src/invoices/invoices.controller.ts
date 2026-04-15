import { Controller, Get, Param, Query, Post } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly service: InvoicesService) {}

  @Get()
  list(@Query() query: any) { return this.service.list(query); }

  @Get(':id')
  detail(@Param('id') id: string) { return this.service.detail(id); }

  @Post(':id/process')
  process(@Param('id') id: string) { return this.service.runProcessing(id); }
}
