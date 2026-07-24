const styles = {
  NEW: 'bg-sky-100 text-sky-800 ring-sky-200',
  CONTACTED: 'bg-amber-100 text-amber-900 ring-amber-200',
  CLOSED: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status] || styles.NEW}`}
    >
      {status}
    </span>
  )
}
