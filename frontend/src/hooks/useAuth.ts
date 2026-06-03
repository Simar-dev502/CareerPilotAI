import { useEffect, useState } from 'react'
import api from '../services/api'

const STORAGE_KEY = 'careerpilot_token'

export function getToken() {
  return localStorage.getItem(STORAGE_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(STORAGE_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(STORAGE_KEY)
}

export function useAuth() {
  const [token, setTokenState] = useState<string | null>(getToken())

  useEffect(() => {
    setTokenState(getToken())
  }, [])

  const login = async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password })
    setToken(response.data.access_token)
    setTokenState(response.data.access_token)
  }

  const register = async (email: string, password: string, fullName: string) => {
    const response = await api.post('/api/auth/register', { email, password, full_name: fullName })
    setToken(response.data.access_token)
    setTokenState(response.data.access_token)
  }

  const logout = () => {
    clearToken()
    setTokenState(null)
  }

  return { token, login, register, logout }
}
