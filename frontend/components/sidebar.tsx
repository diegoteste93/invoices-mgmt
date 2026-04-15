import Link from 'next/link';

const items = [
  ['Dashboard', '/dashboard'],
  ['Invoices', '/invoices'],
  ['Revisão', '/revisao'],
  ['Rateio', '/rateio'],
  ['Centros de Custo', '/centros-de-custo'],
  ['Regras', '/regras'],
  ['Configurações', '/configuracoes']
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white p-4">
      <h1 className="mb-4 text-lg font-semibold">Invoices Ops</h1>
      <nav className="space-y-2">
        {items.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded px-3 py-2 text-sm hover:bg-slate-100">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
