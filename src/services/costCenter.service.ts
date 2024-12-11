import type { costCenterType } from '@/types/apps/costCenterType'

const url = 'http://localhost:3001/api'

export const getConstCenterService = async (token: string | null | undefined): Promise<costCenterType[]> => {
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token
  const controller = new AbortController()

  try {
    const response = await fetch(`${url}/cost-centers`, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${tokenLogin}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Users')
    }

    const data = await response.json()

    console.log('Entroooo', data)

    return data?.costCenters
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    controller.abort()
  }
}
