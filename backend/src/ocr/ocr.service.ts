import { Injectable } from '@nestjs/common';

@Injectable()
export class OcrService {
  async extractFromImage(_filePath: string) {
    if (process.env.OCR_PROVIDER === 'mock') {
      return { provider: 'mock', confidence: 0.7, rawText: 'Mock OCR result for scanned invoice' };
    }
    return { provider: 'tesseract', confidence: 0.7, rawText: 'Tesseract OCR execution placeholder' };
  }
}
