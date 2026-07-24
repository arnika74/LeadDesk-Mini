import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

export default function AdminLayout() {
  const { admin, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <Link to="/admin" className="text-lg font-semibold text-slate-900">
              LeadDesk Admin
            </Link>
            <p className="text-sm text-slate-500">{admin?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 sm:inline"
            >
              View site
            </Link>
            <Button type="button" variant="secondary" onClick={logout}>
              Log out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
