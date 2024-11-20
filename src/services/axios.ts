import axios from "axios";
import { parseCookies } from "nookies";


type RegisterData = {
    name: string;
    email: string;
    password: string;
};

export type RegisterResponse = {
    message: string;
    user?: {
        email: string; 
    };
};

export function getAPIClient(ctx?: any) {
  const { 'nextauth.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3000/'
  })

  api.interceptors.request.use(config => {
    console.log(config);

    return config;
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}


export const simulateRegister = async (data: RegisterData): Promise<RegisterResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.email === 'existente@exemplo.com') {
                return reject(new Error('Usuário já existe'));
            }

            resolve({
                message: 'Usuário registrado com sucesso',
                user: { email: data.email },
            });
        }, 1000);
    });
};
