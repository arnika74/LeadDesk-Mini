import api from './api'

export const submitLead = (payload) => api.post('/leads', payload)
