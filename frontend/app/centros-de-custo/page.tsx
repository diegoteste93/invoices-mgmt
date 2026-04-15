import { apiGet } from '../../lib/api';

export default async function CostCentersPage() {
  const data = await apiGet<any[]>('/cost-centers');
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Centros de Custo</h2>
      <ul className="space-y-2">
        {data.map((c) => <li key={c.id} className="rounded border bg-white p-3">{c.code} - {c.name} ({c.area || 'N/A'})</li>)}
      </ul>
    </section>
  );
}
