import { config } from 'dotenv'

import type { usersExternalType, usersSystemFormType, userSystemPaginationType } from '@/types/apps/usersType'
import type { rolType } from '@/types/apps/rolType'

import type { ResponseFromServer } from '@interfaces/general'
import type { UserDataChangeStatusRol } from '@/interfaces/users'

config()

const url = 'http://localhost:3001/api'

/**
 * Get All Internal users
 * @param token
 * @returns
 */
export const getUsersService = async (
  token: string | null | undefined,
  search: string,
  pagination?: Record<string, string>
): Promise<userSystemPaginationType> => {
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token
  const controller = new AbortController()

  try {
    // const response = await fetch(`${url}/users?userType=system&page=0&size=10`, {
    const response = await fetch(
      `${url}/users?${new URLSearchParams({ searcher: search, userType: 'system', ...pagination })}`,
      {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${tokenLogin}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Users')
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    controller.abort()
  }
}

/**
 * Get All external users
 * @param token
 * @returns
 */
export const getExternalUsersService = async (token: string | null | undefined): Promise<usersExternalType[]> => {
  const controller = new AbortController()
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token

  try {
    const response = await fetch(`${url}/users?userType=external&page=0&size=10`, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${tokenLogin}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch External users')
    }

    const data = await response.json()

    return data?.elements
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    controller.abort()
  }
}

/**
 * Get Rol users
 * @param token
 * @returns
 */
export const getUsersProfileService = async (token: string | null | undefined): Promise<rolType[]> => {
  const controller = new AbortController()
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token

  try {
    const response = await fetch(`${url}/roles`, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${tokenLogin}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Profiles')
    }

    const data = await response.json()

    return data?.roles
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    controller.abort()
  }
}

/**
 * Create user from external user data
 * @param userData
 * @param token
 * @returns
 */
export const createUserSystemService = async (
  userData: usersSystemFormType,
  token: string | null | undefined
): Promise<ResponseFromServer> => {
  const controller = new AbortController()
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token

  try {
    const response = await fetch(`${url}/users`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenLogin}`
      },
      body: JSON.stringify(userData)
    })

    return {
      status: response.ok,
      bodyResponse: { statusCode: response?.status }
    }
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    controller.abort()
  }
}

/**
 * Change rol or status of a user
 * @param id
 * @param data
 * @param token
 * @returns
 */
export const editStatusRolUserService = async (
  id: string | undefined,
  data: UserDataChangeStatusRol,
  token: string | null | undefined
): Promise<ResponseFromServer> => {
  const controller = new AbortController()
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token

  try {
    const response = await fetch(`${url}/users/${id}`, {
      method: 'PATCH',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenLogin}`
      },
      body: JSON.stringify(data)
    })

    return {
      status: response.ok,
      bodyResponse: {
        statusCode: response.status
      }
    }
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    controller.abort()
  }
}

export const addCostCenterUserService = async (
  idUSer: string | null,
  codes: [],
  token: string | null | undefined
): Promise<ResponseFromServer> => {
  const controller = new AbortController()
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token

  try {
    const response = await fetch(`${url}/users/${idUSer}/cost-center`, {
      method: 'PUT',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenLogin}`
      },
      body: JSON.stringify({ codes })
    })

    return {
      status: response.ok,
      bodyResponse: {
        statusCode: response.status
      }
    }
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    controller.abort()
  }
}
