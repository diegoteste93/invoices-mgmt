import Link from 'next/link';
import { apiGet } from '../../lib/api';

export default async function InvoicesPage() {
  const invoices = await apiGet<any[]>('/invoices', []);
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Invoices</h2>
      <table className="w-full rounded border bg-white text-sm">
        <thead><tr className="border-b bg-slate-100 text-left"><th className="p-2">Fornecedor</th><th>Competência</th><th>Valor</th><th>Status</th><th>Centro de custo</th><th>Confiança</th></tr></thead>
        <tbody>
          {invoices.map((i) => (
            <tr key={i.id} className="border-b">
              <td className="p-2"><Link className="text-blue-600" href={`/invoices/${i.id}`}>{i.vendor?.name || 'Não identificado'}</Link></td>
              <td>{i.competency ? new Date(i.competency).toLocaleDateString('pt-BR') : '-'}</td>
              <td>{i.currency} {i.amount}</td>
              <td>{i.status}</td>
              <td>{i.costCenterCode || '-'}</td>
              <td>{Math.round((i.confidence || 0) * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
