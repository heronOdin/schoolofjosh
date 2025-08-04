import apiClient from './axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useAuthStore from '../store/auth.store'
import { useNavigate } from 'react-router-dom'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  username: string
  email: string
  password: string
  role: string // 'user' | 'admin' | 'teacher' | 'student'
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    username: string
    role: 'user' | 'admin' | 'teacher'
  }
}

export const registerApi = async (data: RegisterPayload) => {
  const response = await apiClient.post('/users/register', data)
  return response.data
}

export const loginApi = async (data: LoginPayload) => {
  const response = await apiClient.post('/users/login', data)
  return response.data
}

export const getData = async (url: string) => {
  const response = await apiClient.get(url)

  return response.data
}

export const useLogin = (navigate: ReturnType<typeof useNavigate>) => {
  const { login } = useAuthStore()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem('token', data.token)
      login(data.user)
      navigate('/')
      qc.invalidateQueries({ queryKey: ['user'] })
    }
  })
}

export const useRegister = (navigate: ReturnType<typeof useNavigate>) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: registerApi,
    retry: false,
    onSuccess: data => {
      console.log(`User registered successfully: ${data.user.username}`)
      localStorage.setItem('token', data.token)
      qc.invalidateQueries({ queryKey: ['user'] })
      navigate('/auth')
    }
  })
}

export const useData = <R = unknown>(url?: string) => {
  const { isLoggedIn } = useAuthStore()

  if (!url) {
    throw new Error('URL is required for useData hook')
  }

  return useQuery<R>({
    queryKey: ['data', url],
    queryFn: () => getData(url!),
    enabled: isLoggedIn,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000
  })
}
