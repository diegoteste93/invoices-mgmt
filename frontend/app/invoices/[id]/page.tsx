import { apiGet, apiPost } from '../../../lib/api';

export default async function InvoiceDetail({ params }: { params: { id: string } }) {
  const invoice = await apiGet<any>(`/invoices/${params.id}`);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Detalhe do Invoice</h2>
      <div className="rounded border bg-white p-4">
        <p><b>Fornecedor:</b> {invoice.vendor?.name || '-'}</p>
        <p><b>Status:</b> {invoice.status}</p>
        <p><b>Valor:</b> {invoice.currency} {invoice.amount}</p>
        <p><b>Texto bruto:</b> {invoice.rawText || '-'}</p>
        <p><b>Confiança:</b> {Math.round((invoice.confidence || 0) * 100)}%</p>
      </div>
      <form action={async () => { 'use server'; await apiPost(`/invoices/${params.id}/process`, {}); }}>
        <button className="rounded bg-blue-600 px-4 py-2 text-white" type="submit">Reprocessar</button>
      </form>
      <pre className="rounded bg-white p-4 text-xs">{JSON.stringify(invoice, null, 2)}</pre>
    </section>
  );
}
