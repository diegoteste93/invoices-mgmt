import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { z } from 'zod';
import { CostCentersService } from './cost-centers.service';

const createSchema = z.object({ code: z.string(), name: z.string(), description: z.string().optional(), area: z.string().optional(), status: z.string().optional() });
const updateSchema = createSchema.partial();

@Controller('cost-centers')
export class CostCentersController {
  constructor(private readonly service: CostCentersService) {}

  @Get() list() { return this.service.list(); }
  @Post() create(@Body() body: unknown) { return this.service.create(createSchema.parse(body)); }
  @Patch(':id') update(@Param('id') id: string, @Body() body: unknown) { return this.service.update(id, updateSchema.parse(body)); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
