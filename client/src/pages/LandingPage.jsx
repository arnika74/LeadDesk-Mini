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

      <section id="features" className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">
            Features
          </h2>
          <p className="mt-3 text-base text-slate-600 lg:text-lg">
            Everything you need for a professional lead capture workflow — nothing you don’t.
          </p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section id="about" className="border-y border-slate-200/80 bg-white/60">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">
            About
          </h2>
          <p className="mt-3 max-w-4xl text-base leading-relaxed text-slate-600 lg:text-lg">
            LeadDesk Mini is a production-minded training build: public capture, secure admin,
            real PostgreSQL storage, and deployment-ready architecture.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
        <div className="rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10 lg:px-12 lg:py-12">
          <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">Ready to talk?</h2>
          <p className="mt-3 max-w-3xl text-base text-slate-300 lg:text-lg">
            Tell us your budget range and goals. We’ll follow up with next steps.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex rounded-lg bg-teal-500 px-6 py-3 text-base font-medium text-slate-950 hover:bg-teal-400"
          >
            Open the form
          </a>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1400px] px-4 pb-14 sm:px-6 lg:px-10 lg:pb-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">
              Lead form
            </h2>
            <p className="mt-3 text-base text-slate-600 lg:text-lg">
              Share a few details and we’ll route your request into the admin desk.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  )
}
