export default function ConfiguracoesPage() {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">Configurações</h2>
      <div className="rounded border bg-white p-4 text-sm">
        <p>Credenciais de e-mail por variável de ambiente (IMAP_HOST, IMAP_USER, IMAP_PASSWORD).</p>
        <p>Modo IA: AI_MODE=mock | openai.</p>
        <p>Provider OCR: OCR_PROVIDER=mock | tesseract.</p>
        <p>Confidence threshold: CONFIDENCE_THRESHOLD (padrão 0.75).</p>
        <p>Janela de conciliação: RECONCILIATION_WINDOW_DAYS.</p>
      </div>
    </section>
  );
}
