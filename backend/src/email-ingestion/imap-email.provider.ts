import { EmailProvider, EmailMessagePayload } from './email.provider';

export class ImapEmailProvider implements EmailProvider {
  async scanInbox(): Promise<EmailMessagePayload[]> {
    if (process.env.EMAIL_MODE === 'mock') {
      return [{
        messageId: `mock-${Date.now()}`,
        from: 'billing@openai.com',
        to: 'invoices@empresa.com',
        subject: 'OpenAI Invoice Mar 2026',
        date: new Date(),
        body: 'Invoice INV-OAI-2026-03 amount 410.00 USD',
        attachments: [{ fileName: 'openai-mar-2026.pdf', mimeType: 'application/pdf', size: 1024, path: '/tmp/openai-mar-2026.pdf' }]
      }];
    }
    return [];
  }
}
