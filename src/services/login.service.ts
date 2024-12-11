// import type { ResponseFromServer } from '@interfaces/general'
import { jwtDecode } from 'jwt-decode'

import type { JwtPayload } from '@interfaces/jwtPayload'

import type { userAuth } from '@/types/apps/usersType'

const url = 'http://localhost:3001/api/auth/login'

export const getUserWithEmailLogin = async (email: string): Promise<userAuth> => {
  const controller = new AbortController()

  try {
    const response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    const resp = await response.json()
    const decoded = jwtDecode<JwtPayload>(resp.token)

    return {
      email: decoded.email,
      name: decoded.role,
      token: resp.token
    }
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    controller.abort()
  }
}
