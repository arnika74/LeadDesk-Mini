import { createContext, useContext, useMemo, useState } from 'react'
import { loginAdmin } from '../services/adminService'
import { ADMIN_KEY, TOKEN_KEY } from '../utils/constants'

const AuthContext = createContext(null)

const readStoredAdmin = () => {
  try {
    const raw = localStorage.getItem(ADMIN_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [admin, setAdmin] = useState(readStoredAdmin)
  const [loading, setLoading] = useState(false)

  const login = async (credentials) => {
    setLoading(true)
    try {
      const { data } = await loginAdmin(credentials)
      const nextToken = data.data.token
      const nextAdmin = data.data.admin

      localStorage.setItem(TOKEN_KEY, nextToken)
      localStorage.setItem(ADMIN_KEY, JSON.stringify(nextAdmin))
      setToken(nextToken)
      setAdmin(nextAdmin)
      return nextAdmin
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ADMIN_KEY)
    setToken(null)
    setAdmin(null)
  }

  const value = useMemo(
    () => ({
      token,
      admin,
      isAuthenticated: Boolean(token),
      loading,
      login,
      logout,
    }),
    [token, admin, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
