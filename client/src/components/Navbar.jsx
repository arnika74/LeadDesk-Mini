import { useEffect, useId, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const headerRef = useRef(null)

  const closeMenu = () => setOpen(false)
  const toggleMenu = () => setOpen((prev) => !prev)

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }

    const onPointerDown = (event) => {
      if (headerRef.current?.contains(event.target)) return
      closeMenu()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) closeMenu()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-10">
          <a
            href="#top"
            className="text-lg font-semibold tracking-tight text-slate-900 lg:text-xl"
            onClick={closeMenu}
          >
            LeadDesk Mini
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center justify-end gap-5 text-sm md:flex lg:gap-6 lg:text-base"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
            <NavLink
              to="/admin/login"
              className="rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white hover:bg-slate-800"
            >
              Admin
            </NavLink>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-800 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-haspopup="true"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={toggleMenu}
          >
            <span className="relative block h-5 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                  open ? 'top-2 rotate-45' : 'top-0.5'
                }`}
              />
              <span
                className={`absolute left-0 top-2 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                  open ? 'scale-x-0 opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out ${
                  open ? 'top-2 -rotate-45' : 'top-3.5'
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id={menuId}
          role="region"
          aria-label="Mobile navigation"
          aria-hidden={!open}
          className={`overflow-hidden border-t border-slate-200/80 bg-white transition-[max-height,opacity] duration-300 ease-out md:hidden ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    tabIndex={open ? 0 : -1}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <NavLink
                  to="/admin/login"
                  tabIndex={open ? 0 : -1}
                  className="block rounded-lg bg-slate-900 px-3 py-3 text-center text-base font-medium text-white transition hover:bg-slate-800"
                  onClick={closeMenu}
                >
                  Admin
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/30 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={closeMenu}
      />
    </>
  )
}
