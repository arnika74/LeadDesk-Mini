import Button from './ui/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-10 lg:py-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700 lg:text-base">
            LeadDesk Mini
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            Capture leads. Close faster.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 lg:text-xl">
            A focused lead desk for teams that want clean intake, clear status,
            and an admin view that stays out of the way.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#contact">
              <Button type="button" className="px-6 py-3 text-base">
                Get started
              </Button>
            </a>
            <a href="#features">
              <Button type="button" variant="secondary" className="px-6 py-3 text-base">
                See features
              </Button>
            </a>
          </div>
        </div>
        <div
          className="flex min-h-56 flex-col justify-center rounded-2xl bg-[linear-gradient(145deg,#0f766e_0%,#134e4a_45%,#0f172a_100%)] p-8 text-white shadow-xl shadow-teal-900/20 lg:min-h-72 lg:p-10"
          aria-hidden="true"
        >
          <p className="text-sm uppercase tracking-widest text-teal-100 lg:text-base">
            Pipeline snapshot
          </p>
          <p className="mt-4 text-3xl font-semibold lg:text-4xl">From form to follow-up</p>
          <p className="mt-3 max-w-md text-base text-teal-50/90 lg:text-lg">
            Public landing page for capture. Protected admin desk for triage.
          </p>
        </div>
      </div>
    </section>
  )
}
