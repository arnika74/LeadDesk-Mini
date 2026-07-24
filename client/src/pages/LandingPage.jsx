import FeatureCard from '../components/FeatureCard'
import Hero from '../components/Hero'
import LeadForm from '../components/LeadForm'

const features = [
  {
    title: 'Clean lead intake',
    description: 'Validated forms on client and server so junk data never reaches your desk.',
  },
  {
    title: 'Status that stays clear',
    description: 'Move leads from New to Contacted to Closed without spreadsheet chaos.',
  },
  {
    title: 'Admin built for focus',
    description: 'Search, paginate, and update status from one protected dashboard.',
  },
]

export default function LandingPage() {
  return (
    <>
      <Hero />

      <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Features</h2>
          <p className="mt-3 text-slate-600">
            Everything you need for a professional lead capture workflow — nothing you don’t.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section id="about" className="border-y border-slate-200/80 bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">About</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            LeadDesk Mini is a production-minded training build: public capture, secure admin,
            real PostgreSQL storage, and deployment-ready architecture.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-slate-900 px-6 py-12 text-white sm:px-10">
          <h2 className="text-3xl font-semibold tracking-tight">Ready to talk?</h2>
          <p className="mt-3 max-w-xl text-slate-300">
            Tell us your budget range and goals. We’ll follow up with next steps.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-medium text-slate-950 hover:bg-teal-400"
          >
            Open the form
          </a>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Lead form
            </h2>
            <p className="mt-3 text-slate-600">
              Share a few details and we’ll route your request into the admin desk.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  )
}
