import { apiGet } from '../../lib/api';

export default async function RegrasPage() {
  const classRules = await apiGet<any[]>('/rules/classification');
  const allocRules = await apiGet<any[]>('/rules/allocation');
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Regras</h2>
      <div className="rounded border bg-white p-4">
        <h3 className="mb-2 font-medium">Classificação</h3>
        <pre className="text-xs">{JSON.stringify(classRules, null, 2)}</pre>
      </div>
      <div className="rounded border bg-white p-4">
        <h3 className="mb-2 font-medium">Rateio</h3>
        <pre className="text-xs">{JSON.stringify(allocRules, null, 2)}</pre>
      </div>
    </section>
  );
}
