'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()

  return (
    <div
      className={classnames(horizontalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
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
