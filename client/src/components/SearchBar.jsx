export default function SearchBar({ value, onChange, placeholder = 'Search leads…' }) {
  return (
    <div className="w-full">
      <label htmlFor="lead-search" className="sr-only">
        Search leads
      </label>
      <input
        id="lead-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
      />
    </div>
  )
}
