'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useVerticalNav()

  return (
    <div
      style={{ textAlign: 'center' }}
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      {!isBreakpointReached && (
        <div>
          <span>Copyright 2024 </span>
          <Link href='#' target='_blank' className='text-primary'>
            BIA Solution S.A.S
          </Link>
          <span>All Rights Reserved.</span>
        </div>
      )}
    </div>
  )
}

export default FooterContent
