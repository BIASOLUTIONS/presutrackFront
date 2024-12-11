'use client'

// Third-party Imports
import classnames from 'classnames'

import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'

import { msalConfig } from '../../../authAzure/authConfig'

// Component Imports
import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const NavbarContent = () => {
  const msalInstance = new PublicClientApplication(msalConfig)

  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-2 is-full')}>
      <div className='flex items-center gap-2'>
        <NavToggle />
      </div>
      <div className='flex items-center'>
        <ModeDropdown />
        <MsalProvider instance={msalInstance}>
          <UserDropdown />
        </MsalProvider>
      </div>
    </div>
  )
}

export default NavbarContent
