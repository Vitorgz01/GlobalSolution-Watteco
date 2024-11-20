import { wattecoApi } from "@/services/wattecoApi"
import { v4 as uuid } from 'uuid'

type WattecoSignInRequestData = {
  email: string
  password: string
}

type WattecoUser = {
  name: string
  email: string
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function wattecoSignInRequest(data: WattecoSignInRequestData) {
  await delay()

  // Simulated response - replace with actual API call when Java backend is ready
  return {
    token: uuid(),
    user: {
      name: 'Vitor',
      email: 'vitor@watteco.com'
    }
  }
}

export async function wattecoRecoverUserInformation(): Promise<{ user: WattecoUser }> {
  await delay()

  // Simulated response - replace with actual API call when Java backend is ready
  return {
    user: {
      name: 'Vitor',
      email: 'vitor@watteco.com'
    }
  }
}

export async function wattecoRegisterRequest(data: { email: string; password: string; name: string }) {
  // For simulation purposes, we'll use the delay and return a mock response
  // When the Java API is ready, uncomment the following line and adjust the URL
  // const response = await wattecoApi.post('/register', data)
  
  await delay()

  // Simulated response
  return {
    message: 'Usuário registrado com sucesso',
    user: {
      email: data.email,
      name: data.name
    }
  }
}