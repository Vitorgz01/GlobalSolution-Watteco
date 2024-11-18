import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type CalculadoraData = {
  aparelhos: Array<{
    nome: string
    potencia: number
    tempoUso: number
    quantidade: number
  }>
  consumoTotalMensal: number
  acimaMedia: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Não autorizado' })
  }

  if (req.method === 'POST') {
    try {
      const data: CalculadoraData = req.body

      // Here, you would typically send this data to your backend
      const backendResponse = await fetch('https://seu-backend.com/api/salvar-dados-calculadora', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}` // Assuming you have the access token in the session
        },
        body: JSON.stringify(data)
      })

      if (!backendResponse.ok) {
        throw new Error('Falha ao salvar os dados no backend')
      }

      const result = await backendResponse.json()

      res.status(200).json({ message: 'Dados salvos com sucesso', id: result.id })
    } catch (error) {
      res.status(500).json({ error: 'Erro ao salvar dados' })
    }
  } else if (req.method === 'GET') {
    try {
      // Fetch data from your backend
      const backendResponse = await fetch('https://seu-backend.com/api/dados-calculadora', {
        headers: {
          'Authorization': `Bearer ${session.accessToken}` // Assuming you have the access token in the session
        }
      })

      if (!backendResponse.ok) {
        throw new Error('Falha ao recuperar os dados do backend')
      }

      const data = await backendResponse.json()

      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao recuperar dados' })
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}