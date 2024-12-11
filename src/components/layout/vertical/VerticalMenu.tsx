/* eslint-disable @typescript-eslint/no-unused-vars */
// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Menu Data Imports
// import menuData from '@/data/navigation/verticalMenuData'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='bx-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const params = useParams()
  const verticalNavOptions = useVerticalNav()

  // Vars
  const { transitionDuration, isBreakpointReached } = verticalNavOptions
  const { lang: locale } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 27 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='bx-bxs-circle' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href={`/${locale}/dashboards/home`} icon={<i className='bx-home-smile' />}>
          {dictionary['navigation'].dashboard}
        </MenuItem>
        <MenuSection label={dictionary['navigation'].oc}>
          <MenuItem href={`/${locale}/apps/oc/resumen`} icon={<i className='bx-file' />}>
            {dictionary['navigation'].summaryoc}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/oc/aprobation`} icon={<i className='bx-check-double'></i>}>
            {dictionary['navigation'].aprobationoc}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/oc/receptionBills`} icon={<i className='bx-book-content'></i>}>
            {dictionary['navigation'].receptionBills}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/oc/budget`} icon={<i className='bx-wallet' />}>
            {dictionary['navigation'].budget}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/oc/reports`} icon={<i className='bx-coin-stack'></i>}>
            {dictionary['navigation'].reports}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/oc/audit`} icon={<i className='bx-file-find' />}>
            {dictionary['navigation'].audit}
          </MenuItem>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].configurations}>
          <MenuItem href={`/${locale}/apps/oc/configuration/periods`} icon={<i className='bx-calendar' />}>
            {dictionary['navigation'].periods}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/oc/configuration/users`} icon={<i className='bx-user' />}>
            {dictionary['navigation'].users}
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
