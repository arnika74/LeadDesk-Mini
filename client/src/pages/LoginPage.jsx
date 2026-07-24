import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import Button from '../components/ui/Button'

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const fieldClass =
  'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20'

export default function LoginPage() {
  const { login, isAuthenticated, loading } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (values) => {
    try {
      await login(values)
      success('Welcome back.')
      navigate('/admin', { replace: true })
    } catch (err) {
      error(err.response?.data?.message || 'Login failed. Check your credentials.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
          LeadDesk Mini
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">Admin login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to manage leads. No public access beyond this gate.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
          <div>
            <label htmlFor="login-email" className="text-sm font-medium text-slate-800">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="username"
              className={fieldClass}
              aria-invalid={Boolean(errors.email)}
              {...register('email')}
            />
            {errors.email ? (
              <p className="mt-1 text-sm text-rose-600" role="alert">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="login-password" className="text-sm font-medium text-slate-800">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              className={fieldClass}
              aria-invalid={Boolean(errors.password)}
              {...register('password')}
            />
            {errors.password ? (
              <p className="mt-1 text-sm text-rose-600" role="alert">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={isSubmitting || loading}
          >
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          <Link to="/" className="font-medium text-teal-700 hover:underline">
            Back to site
          </Link>
        </p>
      </div>
    </div>
  )
}
