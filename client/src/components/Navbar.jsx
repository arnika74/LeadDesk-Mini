import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="#top" className="text-lg font-semibold tracking-tight text-slate-900">
          LeadDesk Mini
        </a>
        <nav aria-label="Primary" className="flex items-center gap-4 text-sm">
          <a href="#features" className="text-slate-600 hover:text-slate-900">
            Features
          </a>
          <a href="#about" className="hidden text-slate-600 hover:text-slate-900 sm:inline">
            About
          </a>
          <a href="#contact" className="text-slate-600 hover:text-slate-900">
            Contact
          </a>
          <NavLink
            to="/admin/login"
            className="rounded-lg bg-slate-900 px-3 py-2 font-medium text-white hover:bg-slate-800"
          >
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
