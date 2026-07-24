import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-10">
        <a href="#top" className="text-lg font-semibold tracking-tight text-slate-900 lg:text-xl">
          LeadDesk Mini
        </a>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center justify-end gap-4 text-sm sm:gap-5 lg:gap-6 lg:text-base"
        >
          <a href="#features" className="text-slate-600 hover:text-slate-900">
            Features
          </a>
          <a href="#about" className="text-slate-600 hover:text-slate-900">
            About
          </a>
          <a href="#contact" className="text-slate-600 hover:text-slate-900">
            Contact
          </a>
          <NavLink
            to="/admin/login"
            className="rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white hover:bg-slate-800"
          >
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
