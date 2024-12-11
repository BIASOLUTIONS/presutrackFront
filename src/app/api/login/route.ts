// Next Imports
import { NextResponse } from 'next/server'

import type { userLogin } from '@/types/apps/usersType'

// Mock data for demo purpose
// import { users } from './users'
import { getUserWithEmailLogin } from '@/services/login.service'

export async function POST(req: Request) {
  // Vars
  const { email } = await req.json()

  // const user = users.find(u => u.email === email && u.password === 'asdasd')
  const userData = await getUserWithEmailLogin(email)

  let response: null | userLogin = null

  if (userData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ...filteredUserData } = userData

    response = {
      ...filteredUserData
    }

    return NextResponse.json(response)
  } else {
    // We return 401 status code and error message if user is not found
    return NextResponse.json(
      {
        // We create object here to separate each error message for each field in case of multiple errors
        message: ['Email is invalid']
      },
      {
        status: 401,
        statusText: 'Unauthorized Access'
      }
    )
  }
}
