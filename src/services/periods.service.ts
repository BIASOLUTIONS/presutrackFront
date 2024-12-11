import { config } from 'dotenv'

import type { Periods } from '@/types/apps/periodsTypes'

import type { ResponseFromServer } from '@interfaces/general'

import type { PeriodstatusInterface } from '@/interfaces/periods'

config()

// const url = `${process.env.API_BACK_PROTOCOL}://${process.env.API_BACK_HOST}:${process.env.API_BACK_PORT}`

const url = 'http://localhost:3001/api'

/**
 * Get all periods
 * @returns
 */
export const getPeriodsService = async (token: string | null | undefined): Promise<Periods[]> => {
  const controller = new AbortController()
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token

  try {
    const response = await fetch(`${url}/periods`, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${tokenLogin}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch periods')
    }

    const data = await response.json()

    return data?.periods
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    controller.abort()
  }
}

/**
 * Create period
 * @param period
 * @returns
 */
export const createPeriodService = async (
  period: Periods,
  token: string | null | undefined
): Promise<ResponseFromServer> => {
  const controller = new AbortController()
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token

  try {
    const response = await fetch(`${url}/periods`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenLogin}`
      },
      body: JSON.stringify(period)
    })

    return {
      status: response.ok,
      bodyResponse: {}
    }
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    controller.abort()
  }
}

/**
 * Edit period
 * @param id
 * @param status
 * @param token
 * @returns
 */
export const editPeriodService = async (
  id: string | undefined,
  status: PeriodstatusInterface,
  token: string | null | undefined
): Promise<ResponseFromServer> => {
  const controller = new AbortController()
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token

  try {
    const response = await fetch(`${url}/periods/${id}`, {
      method: 'PUT',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenLogin}`
      },
      body: JSON.stringify(status)
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
