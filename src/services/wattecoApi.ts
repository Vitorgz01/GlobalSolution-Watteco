import axios from "axios"
import { parseCookies } from "nookies"

export function getWattecoApiClient(ctx?: any) {
  const { 'watteco.token': token } = parseCookies(ctx)

  const wattecoApi = axios.create({
    baseURL: 'http://localhost:8080/api' // Replace with your actual API base URL
  })

  wattecoApi.interceptors.request.use(config => {
    console.log(config)
    return config
  })

  if (token) {
    wattecoApi.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return wattecoApi
}

export const wattecoApi = getWattecoApiClient()

export type WattecoRegisterData = {
  name: string
  email: string
  password: string
}

export type WattecoRegisterResponse = {
  message: string
  user?: {
    name: string
    email: string
  }
}

export type WattecoSignInData = {
  email: string
  password: string
}

export type WattecoSignInResponse = {
  token: string
  user: {
    name: string
    email: string
  }
}

export const wattecoRegisterUser = async (data: WattecoRegisterData): Promise<WattecoRegisterResponse> => {
  const response = await wattecoApi.post('/register', data)
  return response.data
}

export const wattecoSignInUser = async (data: WattecoSignInData): Promise<WattecoSignInResponse> => {
  const response = await wattecoApi.post('/signin', data)
  return response.data
}

// Simulated functions (remove in production)
export const simulateWattecoRegister = async (data: WattecoRegisterData): Promise<WattecoRegisterResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === 'existente@watteco.com') {
        return reject(new Error('Usuário já existe'))
      }

      resolve({
        message: 'Usuário registrado com sucesso',
        user: { name: data.name, email: data.email },
      })
    }, 1000)
  })
}

export const simulateWattecoSignIn = async (data: WattecoSignInData): Promise<WattecoSignInResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === 'nonexistent@watteco.com') {
        return reject(new Error('Usuário não encontrado'))
      }

      resolve({
        token: 'simulated-jwt-token',
        user: { name: 'Simulated User', email: data.email },
      })
    }, 1000)
  })
}