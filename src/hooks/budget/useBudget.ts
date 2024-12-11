import { useState } from 'react'

import { useSession } from 'next-auth/react'

import type { BudgetFormType, BudgetTypes } from '@/types/apps/budgetTypes'

import type { ResponseFromServer } from '@interfaces/general'

import { getBudgetService, createBudgetService, getBudgetFileService } from '../../services/budget.service'

export const UseBudget = () => {
  const [loading, setIsLoading] = useState(false)
  const [budgets, setBudgets] = useState<BudgetTypes[]>([])
  const { data: session } = useSession()

  /**
   * Fetches all budget data.
   */

  const getAllBudget = async (periodId: string) => {
    setIsLoading(true)
    const data = await getBudgetService(periodId, session?.user?.token)

    setBudgets(data)
    setIsLoading(false)
  }

  const getFileBudget = async (metadataId: string, fileName: string) => {
    setIsLoading(true)
    await getBudgetFileService(metadataId, session?.user?.token, fileName)
    setIsLoading(false)
  }

  const createBudget = async (budget: BudgetFormType, formData: FormData): Promise<ResponseFromServer> => {
    setIsLoading(true)

    const resp = await createBudgetService(budget, formData, session?.user?.token)

    setIsLoading(false)

    return resp
  }

  return {
    loading,
    budgets,
    getAllBudget,
    createBudget,
    getFileBudget
  }
}
