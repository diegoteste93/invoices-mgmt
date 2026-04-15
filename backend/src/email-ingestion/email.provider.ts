export type EmailMessagePayload = {
  messageId: string;
  from: string;
  to: string;
  subject: string;
  date: Date;
  body: string;
  attachments: Array<{ fileName: string; mimeType: string; size: number; path: string }>;
};

export interface EmailProvider {
  scanInbox(): Promise<EmailMessagePayload[]>;
}
