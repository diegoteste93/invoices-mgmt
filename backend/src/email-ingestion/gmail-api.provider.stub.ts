import { EmailProvider, EmailMessagePayload } from './email.provider';

export class GmailApiProviderStub implements EmailProvider {
  async scanInbox(): Promise<EmailMessagePayload[]> {
    return [];
  }
}
