import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}
  list() { return this.prisma.setting.findMany({ orderBy: { key: 'asc' } }); }
  upsert(key: string, value: string) {
    return this.prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
}
