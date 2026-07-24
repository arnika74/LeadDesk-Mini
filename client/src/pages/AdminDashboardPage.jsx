import { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import SearchBar from '../components/SearchBar'
import LeadTable from '../components/LeadTable'
import Pagination from '../components/Pagination'
import Spinner from '../components/ui/Spinner'
import { useDebounce } from '../hooks/useDebounce'
import { getLeads, getStats, updateLeadStatus } from '../services/adminService'
import { useToast } from '../context/ToastContext'
import { LEAD_STATUSES } from '../utils/constants'

export default function AdminDashboardPage() {
  const { success, error } = useToast()
  const [stats, setStats] = useState(null)
  const [leads, setLeads] = useState([])
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 })
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const debouncedSearch = useDebounce(search, 400)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, statusFilter])

  useEffect(() => {
    let cancelled = false

    const loadDashboard = async () => {
      setLoading(true)
      try {
        const [statsRes, leadsRes] = await Promise.all([
          getStats(),
          getLeads({
            search: debouncedSearch || undefined,
            status: statusFilter || undefined,
            page,
            limit: 8,
          }),
        ])

        if (cancelled) return

        setStats(statsRes.data.data)
        setLeads(leadsRes.data.data)
        setMeta(leadsRes.data.meta)
      } catch (err) {
        if (!cancelled) {
          error(err.response?.data?.message || 'Failed to load dashboard data.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadDashboard()

    return () => {
      cancelled = true
    }
  }, [debouncedSearch, statusFilter, page, error])

  const handleStatusChange = async (id, nextStatus) => {
    if (nextStatus === 'CLOSED') {
      const confirmed = window.confirm(
        'Mark this lead as CLOSED? You can change it again later if needed.',
      )
      if (!confirmed) return
    }

    setUpdatingId(id)
    try {
      await updateLeadStatus(id, nextStatus)
      success('Lead status updated.')

      const [statsRes, leadsRes] = await Promise.all([
        getStats(),
        getLeads({
          search: debouncedSearch || undefined,
          status: statusFilter || undefined,
          page,
          limit: 8,
        }),
      ])
      setStats(statsRes.data.data)
      setLeads(leadsRes.data.data)
      setMeta(leadsRes.data.meta)
    } catch (err) {
      error(err.response?.data?.message || 'Could not update status.')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Search leads, review status, and keep the pipeline moving.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Total leads" value={stats?.total ?? '—'} accent="slate" />
        <DashboardCard label="New" value={stats?.new ?? '—'} accent="teal" />
        <DashboardCard label="Contacted" value={stats?.contacted ?? '—'} accent="amber" />
        <DashboardCard label="Closed" value={stats?.closed ?? '—'} accent="rose" />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="sm:w-48">
            <label htmlFor="status-filter" className="sr-only">
              Filter by status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
            >
              <option value="">All statuses</option>
              {LEAD_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <Spinner label="Loading leads…" />
        ) : (
          <>
            <p className="text-sm text-slate-500">{meta.total} lead(s) found</p>
            <LeadTable
              leads={leads}
              onStatusChange={handleStatusChange}
              updatingId={updatingId}
            />
            <Pagination
              page={meta.page}
              totalPages={meta.totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  )
}
