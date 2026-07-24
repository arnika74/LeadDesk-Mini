export default function FeatureCard({ title, description }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm shadow-slate-200/50">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </article>
  )
}
