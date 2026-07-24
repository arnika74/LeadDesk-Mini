const variants = {
  primary:
    'bg-teal-700 text-white hover:bg-teal-800 disabled:bg-teal-700/60',
  secondary:
    'bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 disabled:opacity-60',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 disabled:opacity-60',
}

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  loading = false,
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? 'Please wait…' : children}
    </button>
  )
}
