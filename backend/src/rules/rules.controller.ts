import { Body, Controller, Get, Patch, Param, Post } from '@nestjs/common';
import { z } from 'zod';
import { RulesService } from './rules.service';

const classificationSchema = z.object({ name: z.string(), ruleType: z.string(), condition: z.string(), action: z.any(), confidenceBoost: z.number().optional(), requireReview: z.boolean().optional(), active: z.boolean().optional() });
const allocationSchema = z.object({ name: z.string(), ruleType: z.string(), condition: z.string(), allocation: z.any(), active: z.boolean().optional() });

@Controller('rules')
export class RulesController {
  constructor(private readonly service: RulesService) {}

  @Get('classification') listClassification() { return this.service.listClassification(); }
  @Get('allocation') listAllocation() { return this.service.listAllocation(); }
  @Post('classification') createClassification(@Body() body: unknown) { return this.service.createClassification(classificationSchema.parse(body)); }
  @Post('allocation') createAllocation(@Body() body: unknown) { return this.service.createAllocation(allocationSchema.parse(body)); }
  @Patch('classification/:id') updateClassification(@Param('id') id: string, @Body() body: unknown) { return this.service.updateClassification(id, classificationSchema.partial().parse(body)); }
  @Patch('allocation/:id') updateAllocation(@Param('id') id: string, @Body() body: unknown) { return this.service.updateAllocation(id, allocationSchema.partial().parse(body)); }
}
