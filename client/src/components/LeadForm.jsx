import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BUDGET_RANGES } from '../utils/constants'
import { submitLead } from '../services/leadService'
import { useToast } from '../context/ToastContext'
import Button from './ui/Button'

const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  email: z.string().trim().email('Enter a valid email address'),
  budget: z.enum(BUDGET_RANGES, { message: 'Select a valid budget range' }),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
})

const fieldClass =
  'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20'

export default function LeadForm() {
  const { success, error } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      email: '',
      budget: '',
      message: '',
    },
  })

  const onSubmit = async (values) => {
    try {
      await submitLead(values)
      success('Thanks — your lead was submitted successfully.')
      reset()
    } catch (err) {
      const apiMessage =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        'Could not submit the form. Please try again.'
      error(apiMessage)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      noValidate
    >
      <div>
        <label htmlFor="name" className="text-sm font-medium text-slate-800">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          aria-invalid={Boolean(errors.name)}
          {...register('name')}
        />
        {errors.name ? (
          <p className="mt-1 text-sm text-rose-600" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-800">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
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
        <label htmlFor="budget" className="text-sm font-medium text-slate-800">
          Budget range
        </label>
        <select
          id="budget"
          className={fieldClass}
          aria-invalid={Boolean(errors.budget)}
          {...register('budget')}
        >
          <option value="">Select a range</option>
          {BUDGET_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
        {errors.budget ? (
          <p className="mt-1 text-sm text-rose-600" role="alert">
            {errors.budget.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-slate-800">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={fieldClass}
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
        />
        {errors.message ? (
          <p className="mt-1 text-sm text-rose-600" role="alert">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">
        Submit lead
      </Button>
    </form>
  )
}
