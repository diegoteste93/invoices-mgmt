import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { z } from 'zod';
import { ReviewService } from './review.service';

const resolveSchema = z.object({ costCenterCode: z.string().optional(), notes: z.string().optional() });

@Controller('review')
export class ReviewController {
  constructor(private readonly service: ReviewService) {}

  @Get('queue') queue() { return this.service.queue(); }
  @Post(':id/resolve') resolve(@Param('id') id: string, @Body() body: unknown) { return this.service.resolve(id, resolveSchema.parse(body)); }
}
