import api from './api'

export const loginAdmin = (payload) => api.post('/auth/login', payload)

export const getStats = () => api.get('/admin/stats')

export const getLeads = (params) => api.get('/admin/leads', { params })

export const updateLeadStatus = (id, status) =>
  api.patch(`/admin/leads/${id}`, { status })
