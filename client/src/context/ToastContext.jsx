import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const success = useCallback((message) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type: 'success' }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const error = useCallback((message) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type: 'error' }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const value = useMemo(
    () => ({ success, error, toasts, removeToast }),
    [success, error, toasts, removeToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 flex w-[min(100%-2rem,22rem)] flex-col gap-2"
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`rounded-lg px-4 py-3 text-sm shadow-lg ${
              toast.type === 'success'
                ? 'bg-teal-700 text-white'
                : 'bg-rose-700 text-white'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p>{toast.message}</p>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="shrink-0 rounded text-white/80 hover:text-white"
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
