type usersSystemType = {
  id: string
  identification: string
  email: string
  role?: {
    id: string
    name: string
  }
  status?: string
  costCenters?: []
}

export type userSystemPaginationType = {
  elements: usersSystemType[]
  totalElements: number
  currentPage: number
  totalPages: number
}

export type usersExternalType = {
  identification: string
  fullName: string
  email?: string
}

export type usersSystemFormType = {
  identification?: string
  roleId: string
  status: string
}

export type userLogin = {
  email: string
  name: string
}

export type userAuth = {
  email: string
  name: string
  token: string
}
