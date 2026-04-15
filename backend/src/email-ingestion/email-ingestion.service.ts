import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImapEmailProvider } from './imap-email.provider';

@Injectable()
export class EmailIngestionService {
  constructor(private prisma: PrismaService) {}

  async scanAndPersist() {
    const provider = new ImapEmailProvider();
    const messages = await provider.scanInbox();
    const created: string[] = [];

    for (const msg of messages) {
      const exists = await this.prisma.emailMessage.findUnique({ where: { messageId: msg.messageId } });
      if (exists) continue;

      const email = await this.prisma.emailMessage.create({
        data: {
          messageId: msg.messageId,
          fromEmail: msg.from,
          toEmail: msg.to,
          subject: msg.subject,
          sentAt: msg.date,
          snippet: msg.body.slice(0, 180),
          body: msg.body,
          status: 'ingested',
          attachments: { create: msg.attachments.map((a) => ({ fileName: a.fileName, mimeType: a.mimeType, size: a.size, path: a.path })) }
        }
      });

      await this.prisma.invoice.create({
        data: {
          externalId: msg.subject,
          sourceType: 'email',
          amount: 0,
          currency: 'USD',
          rawText: msg.body,
          status: 'received'
        }
      });
      created.push(email.id);
    }
    return { scanned: messages.length, created: created.length, ids: created };
  }
}
