/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      name: string
      email: string
      token: string
    }
  }
}
