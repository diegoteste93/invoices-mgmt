import { apiGet } from '../../lib/api';

export default async function RateioPage() {
  const rules = await apiGet<any[]>('/rules/allocation', []);
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Rateio</h2>
      <pre className="rounded bg-white p-4 text-sm">{JSON.stringify(rules, null, 2)}</pre>
    </section>
  );
}
