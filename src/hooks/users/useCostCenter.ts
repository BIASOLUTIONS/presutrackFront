import { useState } from 'react'

import { useSession } from 'next-auth/react'

import { getConstCenterService } from '../../services/costCenter.service'

import type { costCenterType } from '@/types/apps/costCenterType'

export const useCostCenter = () => {
  const { data: session } = useSession()
  const [loading, setIsLoading] = useState(false)
  const [costCenters, setCostCenters] = useState<costCenterType[]>([])

  const getAllCostCenters = async () => {
    setIsLoading(true)

    const data = await getConstCenterService(session?.user?.token)

    setCostCenters(data)
    setIsLoading(false)
  }

  return {
    loading,
    costCenters,
    getAllCostCenters
  }
}
