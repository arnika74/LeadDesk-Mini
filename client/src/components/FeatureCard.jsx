export default function FeatureCard({ title, description }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm shadow-slate-200/50 lg:p-7">
      <h3 className="text-xl font-semibold text-slate-900 lg:text-2xl">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-slate-600 lg:text-lg">{description}</p>
    </article>
  )
}
