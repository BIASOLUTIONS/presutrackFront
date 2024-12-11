// ** Fake user data and data type

// ** Please remove below user data and data type in production and verify user with Real Database
export type UserTable = {
  id: number
  rol: string
  email: string
  image: string
  password: string
}

// =============== Fake Data ============================

export const users: UserTable[] = [
  {
    id: 1,
    rol: 'John Doe',
    password: 'admin1',
    email: 'admin@sneat1.com',
    image: '/images/avatars/1.png'
  }
]
