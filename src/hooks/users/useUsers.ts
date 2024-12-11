import { useState } from 'react'

import { useSession } from 'next-auth/react'

import {
  getUsersService,
  getExternalUsersService,
  getUsersProfileService,
  createUserSystemService,
  editStatusRolUserService,
  addCostCenterUserService
} from '../../services/users.service'

import type { usersExternalType, usersSystemFormType, userSystemPaginationType } from '@/types/apps/usersType'

import type { rolType } from '@/types/apps/rolType'

import type { ResponseFromServer } from '@interfaces/general'

import type { UserDataChangeStatusRol } from '@/interfaces/users'

export const UseUsers = () => {
  const { data: session } = useSession()
  const [loading, setIsLoading] = useState(false)
  const [externalUsers, setExternalUsers] = useState<usersExternalType[]>([])
  const [userRol, setUserRol] = useState<rolType[]>([])

  const [users, setUsers] = useState<userSystemPaginationType>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    elements: []
  })

  /**
   * Get all users
   */
  const getAllUsers = async (pagination?: Record<string, string>, search: string = '') => {
    setIsLoading(true)

    const data = await getUsersService(session?.user?.token, search, pagination)

    setUsers(data)
    setIsLoading(false)
  }

  /**
   * Ger all external users
   */
  const getAllExternalUsers = async () => {
    setIsLoading(true)
    const data = await getExternalUsersService(session?.user?.token)

    setExternalUsers(data)
    setIsLoading(false)
  }

  /**
   * Get rol option users
   */
  const getAllUsersProfile = async () => {
    setIsLoading(true)
    const data = await getUsersProfileService(session?.user?.token)

    setUserRol(data)
    setIsLoading(false)
  }

  /**
   * Create user from external users
   * @param userData
   * @returns
   */
  const createUserSystem = async (userData: usersSystemFormType): Promise<ResponseFromServer> => {
    setIsLoading(true)
    const resp = await createUserSystemService(userData, session?.user?.token)

    setIsLoading(false)

    return resp
  }

  const updateStatusOrRolUser = async (
    id: string | undefined,
    data: UserDataChangeStatusRol
  ): Promise<ResponseFromServer> => {
    setIsLoading(true)
    const resp = await editStatusRolUserService(id, data, session?.user?.token)

    setIsLoading(false)

    return resp
  }

  const addCostCenterUser = async (idUser: string | null, codes: []): Promise<ResponseFromServer> => {
    setIsLoading(true)
    const resp = await addCostCenterUserService(idUser, codes, session?.user?.token)

    setIsLoading(false)

    return resp
  }

  return {
    loading,
    users,
    userRol,
    externalUsers,
    getAllUsers,
    getAllUsersProfile,
    getAllExternalUsers,
    createUserSystem,
    updateStatusOrRolUser,
    addCostCenterUser
  }
}
