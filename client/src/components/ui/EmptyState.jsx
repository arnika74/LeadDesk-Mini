export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      ) : null}
    </div>
  )
}
