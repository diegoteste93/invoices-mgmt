import { apiGet } from '../../lib/api';

export default async function RevisaoPage() {
  const tasks = await apiGet<any[]>('/review/queue', []);
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Fila de Revisão</h2>
      <div className="space-y-3">
        {tasks.map((t) => (
          <div key={t.id} className="rounded border bg-white p-4">
            <p className="font-medium">{t.invoice.vendor?.name || 'Fornecedor desconhecido'}</p>
            <p>Motivo: {t.reason}</p>
            <p>Status: {t.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
