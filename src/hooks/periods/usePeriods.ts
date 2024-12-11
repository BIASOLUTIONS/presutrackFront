import { useState } from 'react'

import { useSession } from 'next-auth/react'

import type { Periods } from '@/types/apps/periodsTypes'
import type { ResponseFromServer } from '@interfaces/general'

import { getPeriodsService, createPeriodService, editPeriodService } from '../../services/periods.service'

import type { PeriodstatusInterface } from '@/interfaces/periods'

export const UsePeriods = () => {
  const [loading, setIsLoading] = useState(false)
  const [periods, setPeriods] = useState<Periods[]>([])
  const { data: session } = useSession()

  /**
   * Fetches all periods data.
   */

  const getAllPeriods = async () => {
    setIsLoading(true)
    const data = await getPeriodsService(session?.user?.token)

    setPeriods(data)
    setIsLoading(false)
  }

  /**
   * Create period
   * @param period
   * @returns
   */
  const createPeriod = async (period: Periods): Promise<ResponseFromServer> => {
    setIsLoading(true)
    const resp = await createPeriodService(period, session?.user?.token)

    setIsLoading(false)

    return resp
  }

  /**
   * Update period
   * @param id
   * @param status
   * @returns
   */
  const updateStatusPeriods = async (
    id: string | undefined,
    status: PeriodstatusInterface
  ): Promise<ResponseFromServer> => {
    setIsLoading(true)
    const resp = await editPeriodService(id, status, session?.user?.token)

    setIsLoading(false)

    return resp
  }

  return {
    loading,
    periods,
    getAllPeriods,
    createPeriod,
    updateStatusPeriods
  }
}
