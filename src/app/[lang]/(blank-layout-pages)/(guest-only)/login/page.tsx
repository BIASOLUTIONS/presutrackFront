'use client'
/* eslint-disable import/order */
// Next Imports
// import type { Metadata } from 'next'

// Component Imports
import Login from '@views/Login'

import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from '../../../../../authAzure/authConfig'

// export const metadata: Metadata = {
//   title: 'Login',
//   description: 'Login to your account'
// }

const msalInstance = new PublicClientApplication(msalConfig)

const LoginPage = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <Login />
    </MsalProvider>
  )
}

export default LoginPage
