import { apiGet } from '../../lib/api';

export default async function DashboardPage() {
  const data = await apiGet<any>('/dashboard/summary');
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card title="Invoices processados" value={data.totalInvoices} />
        <Card title="Valor do mês" value={`$ ${data.totalMonthAmount}`} />
        <Card title="Pendentes revisão" value={data.pendingReview} />
        <Card title="Sem centro custo" value={data.withoutCostCenter} />
      </div>
      <pre className="rounded bg-white p-4 text-sm">{JSON.stringify(data.alerts, null, 2)}</pre>
    </section>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return <div className="rounded border bg-white p-4"><p className="text-sm text-slate-500">{title}</p><p className="text-2xl font-bold">{value}</p></div>;
}
