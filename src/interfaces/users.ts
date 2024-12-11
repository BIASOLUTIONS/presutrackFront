export interface User {
  id?: string
  user: number | undefined
  rol: string
  status: string
}

export interface UserForm {
  identification?: string
  roleId: string
  status: string
}

export interface UserAutoCompleteSelect {
  label: string | undefined
  id: string | undefined
}

export interface UserDataChangeStatusRol {
  roleId?: string
  status?: string
}
