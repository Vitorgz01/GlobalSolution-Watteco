import type { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'
import { wattecoApi } from '@/services/wattecoServices'

type WattecoAparelho = {
  nome: string
  potencia: number
  tempoUso: number
  quantidade: number
}

type WattecoCalculadoraData = {
  aparelhos: WattecoAparelho[]
  consumoTotalMensal: number
  acimaMedia: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { 'watteco.token': token } = parseCookies({ req })

  if (!token) {
    return res.status(401).json({ error: 'Não autorizado' })
  }

  if (req.method === 'POST') {
    try {
      const data: WattecoCalculadoraData = req.body

      const backendResponse = await wattecoApi.post('/api/salvar-dados-calculadora', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (backendResponse.status !== 200) {
        throw new Error('Falha ao salvar os dados no backend da Watteco')
      }

      const result = backendResponse.data

      res.status(200).json({ message: 'Dados salvos com sucesso na Watteco', id: result.id })
    } catch (error) {
      res.status(500).json({ error: 'Erro ao salvar dados na Watteco' })
    }
  } else if (req.method === 'GET') {
    try {
      const backendResponse = await wattecoApi.get('/api/dados-calculadora', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (backendResponse.status !== 200) {
        throw new Error('Falha ao recuperar os dados do backend da Watteco')
      }

      const data = backendResponse.data

      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao recuperar dados da Watteco' })
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}