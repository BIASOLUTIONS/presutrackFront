import { config } from 'dotenv'

import type { BudgetFormType, BudgetTypes } from '@/types/apps/budgetTypes'

import type { ResponseFromServer } from '@interfaces/general'

config()

// const url = `${process.env.API_BACK_PROTOCOL}://${process.env.API_BACK_HOST}:${process.env.API_BACK_PORT}`

const url = 'http://localhost:3001/api'

/**
 * Get all Budget
 * @param token
 * @returns
 */
export const getBudgetService = async (periodId: string, token: string | null | undefined): Promise<BudgetTypes[]> => {
  const controller = new AbortController()
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token

  try {
    const response = await fetch(`${url}/budget/metadata/${periodId}`, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${tokenLogin}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Budgets')
    }

    const data = await response.json()

    return data?.metadata
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    controller.abort()
  }
}

/**
 * Download File budget
 * @param metadataId
 * @param token
 * @param fileName
 */
export const getBudgetFileService = async (
  metadataId: string,
  token: string | null | undefined,
  fileName: string
): Promise<any> => {
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token

  const settings = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + tokenLogin + '',
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  }

  try {
    const path = `${url}/budget/file/${metadataId}`
    const anchor = document.createElement('a')

    document.body.appendChild(anchor)
    const response = await fetch(path, settings)

    const blobby = await response.blob()
    const objectUrl = window.URL.createObjectURL(blobby)

    anchor.href = objectUrl
    anchor.download = `${fileName}.xlsx`
    anchor.click()
    window.URL.revokeObjectURL(objectUrl)
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Create Budget
 * @param budget
 * @param formData
 * @param token
 * @returns
 */
export const createBudgetService = async (
  budget: BudgetFormType,
  formData: any,
  token: string | null | undefined
): Promise<ResponseFromServer> => {
  const controller = new AbortController()
  const tokenLogin = localStorage.getItem('token') ? localStorage.getItem('token') : token

  try {
    const response = await fetch(`${url}/budget/file?periodId=${budget?.periodId}&observation=${budget?.observation}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenLogin}`
      },
      body: formData,
      signal: controller.signal
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
