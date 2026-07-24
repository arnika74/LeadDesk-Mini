export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10 lg:py-7 lg:text-base">
        <p>© {new Date().getFullYear()} LeadDesk Mini</p>
        <p>
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-teal-700 underline-offset-4 hover:underline"
          >
            Built for Digital Heroes Training Task
          </a>
        </p>
      </div>
    </footer>
  )
}
