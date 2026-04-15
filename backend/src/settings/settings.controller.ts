import { Body, Controller, Get, Post } from '@nestjs/common';
import { z } from 'zod';
import { SettingsService } from './settings.service';

const schema = z.object({ key: z.string(), value: z.string() });

@Controller('settings')
export class SettingsController {
  constructor(private readonly service: SettingsService) {}
  @Get() list() { return this.service.list(); }
  @Post() upsert(@Body() body: unknown) { const data = schema.parse(body); return this.service.upsert(data.key, data.value); }
}
