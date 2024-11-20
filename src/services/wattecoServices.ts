import axios from "axios"
import { parseCookies } from "nookies"
import { v4 as uuid } from 'uuid'

// Types
type WattecoUser = {
  name: string
  email: string
}

type WattecoSignInRequestData = {
  email: string
  password: string
}

type WattecoRegisterData = {
  name: string
  email: string
  password: string
}

export type WattecoRegisterResponse = {
  message: string
  user?: {
    email: string
  }
}

// API Client
export function getWattecoApiClient(ctx?: any) {
  const { 'watteco.token': token } = parseCookies(ctx)

  const wattecoApi = axios.create({
    baseURL: 'http://localhost:3000/' // Update this to your actual API URL
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

// Simulated delay function
const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

// Auth functions
export async function signInRequest(data: WattecoSignInRequestData) {
  await delay()

  // Simulated response - replace with actual API call in production
  return {
    token: uuid(),
    user: {
      name: 'Watteco User',
      email: data.email
    }
  }
}

export async function recoverUserInformation(): Promise<{ user: WattecoUser }> {
  await delay()

  // Simulated response - replace with actual API call in production
  return {
    user: {
      name: 'Watteco User',
      email: 'user@watteco.com'
    }
  }
}

export async function registerWattecoUser(data: WattecoRegisterData): Promise<WattecoRegisterResponse> {
  // In production, use the actual API call
  // const response = await wattecoApi.post('/register', data)
  // return response.data

  // Simulated response
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === 'existente@watteco.com') {
        return reject(new Error('Usuário já existe'))
      }

      resolve({
        message: 'Usuário registrado com sucesso',
        user: { email: data.email },
      })
    }, 1000)
  })
}