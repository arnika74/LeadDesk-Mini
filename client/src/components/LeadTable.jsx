import StatusBadge from './StatusBadge'
import { LEAD_STATUSES } from '../utils/constants'
import { formatDate } from '../utils/format'
import EmptyState from './ui/EmptyState'

export default function LeadTable({ leads, onStatusChange, updatingId }) {
  if (!leads?.length) {
    return (
      <EmptyState
        title="No leads found"
        description="Try a different search or status filter, or wait for new submissions."
      />
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">
              Name
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Email
            </th>
            <th scope="col" className="hidden px-4 py-3 font-medium md:table-cell">
              Budget
            </th>
            <th scope="col" className="hidden px-4 py-3 font-medium lg:table-cell">
              Message
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Status
            </th>
            <th scope="col" className="hidden px-4 py-3 font-medium sm:table-cell">
              Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-slate-100 last:border-0">
              <td className="px-4 py-3 font-medium text-slate-900">{lead.name}</td>
              <td className="px-4 py-3 text-slate-600">{lead.email}</td>
              <td className="hidden px-4 py-3 text-slate-600 md:table-cell">
                {lead.budget}
              </td>
              <td
                className="hidden max-w-xs truncate px-4 py-3 text-slate-600 lg:table-cell"
                title={lead.message}
              >
                {lead.message}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <StatusBadge status={lead.status} />
                  <label className="sr-only" htmlFor={`status-${lead.id}`}>
                    Change status for {lead.name}
                  </label>
                  <select
                    id={`status-${lead.id}`}
                    value={lead.status}
                    disabled={updatingId === lead.id}
                    aria-busy={updatingId === lead.id}
                    onChange={(e) => onStatusChange(lead.id, e.target.value)}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20 disabled:opacity-60"
                  >
                    {LEAD_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
              <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">
                {formatDate(lead.updatedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
