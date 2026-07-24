import { useCallback, useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import SearchBar from '../components/SearchBar'
import LeadTable from '../components/LeadTable'
import Pagination from '../components/Pagination'
import Spinner from '../components/ui/Spinner'
import { useDebounce } from '../hooks/useDebounce'
import { getLeads, getStats, updateLeadStatus } from '../services/adminService'
import { useToast } from '../context/ToastContext'

export default function AdminDashboardPage() {
  const { success, error } = useToast()
  const [stats, setStats] = useState(null)
  const [leads, setLeads] = useState([])
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 })
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const debouncedSearch = useDebounce(search, 400)

  const loadDashboard = useCallback(async () => {
    setLoading(true)
    try {
      const [statsRes, leadsRes] = await Promise.all([
        getStats(),
        getLeads({
          search: debouncedSearch || undefined,
          page,
          limit: 8,
        }),
      ])
      setStats(statsRes.data.data)
      setLeads(leadsRes.data.data)
      setMeta(leadsRes.data.meta)
    } catch (err) {
      error(err.response?.data?.message || 'Failed to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, page, error])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id)
    try {
      await updateLeadStatus(id, status)
      success('Lead status updated.')
      await loadDashboard()
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
        <SearchBar value={search} onChange={setSearch} />
        {loading ? (
          <Spinner label="Loading leads…" />
        ) : (
          <>
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
