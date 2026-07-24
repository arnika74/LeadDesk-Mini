export default function DashboardCard({ label, value, accent = 'teal' }) {
  const accents = {
    teal: 'border-teal-200 bg-teal-50 text-teal-800',
    slate: 'border-slate-200 bg-slate-50 text-slate-800',
    amber: 'border-amber-200 bg-amber-50 text-amber-900',
    rose: 'border-rose-200 bg-rose-50 text-rose-900',
  }

  return (
    <article className={`rounded-2xl border p-5 ${accents[accent] || accents.teal}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
    </article>
  )
}
