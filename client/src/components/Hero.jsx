import Button from './ui/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
            LeadDesk Mini
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Capture leads. Close faster.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            A focused lead desk for teams that want clean intake, clear status,
            and an admin view that stays out of the way.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact">
              <Button type="button">Get started</Button>
            </a>
            <a href="#features">
              <Button type="button" variant="secondary">
                See features
              </Button>
            </a>
          </div>
        </div>
        <div
          className="min-h-64 rounded-2xl bg-[linear-gradient(145deg,#0f766e_0%,#134e4a_45%,#0f172a_100%)] p-8 text-white shadow-xl shadow-teal-900/20"
          aria-hidden="true"
        >
          <p className="text-sm uppercase tracking-widest text-teal-100">Pipeline snapshot</p>
          <p className="mt-6 text-3xl font-semibold">From form to follow-up</p>
          <p className="mt-3 max-w-sm text-teal-50/90">
            Public landing page for capture. Protected admin desk for triage.
          </p>
        </div>
      </div>
    </section>
  )
}
