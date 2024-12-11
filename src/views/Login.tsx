/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/consistent-type-imports */
'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import { useParams, useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// Third-party Imports
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'

// Type Imports
import type { Locale } from '@configs/i18n'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { Box, CardProps } from '@mui/material'

import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { loginRequest } from '@/authAzure/authConfig'
import { callMsGraph } from '@/authAzure/graph'

// Styled Custom Components
const ImgReel = styled(Box)<CardProps>(({ theme }) => ({
  backgroundImage: `url("/images/illustrations/login/constructora-bolivar-portada.jpg")`,
  width: 'calc(100% - 0px)',
  height: '100vh',
  position: 'absolute',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  left: 0,
  [theme.breakpoints.down('sm')]: {
    left: 'initial',
    width: '100%'
  }
}))

type ErrorType = {
  message: string[]
}

const Login = () => {
  // States
  const [errorState, setErrorState] = useState<ErrorType | null>(null)
  const isAuthenticated = useIsAuthenticated()
  const { instance, accounts } = useMsal()

  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang: locale } = useParams()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>()

  const onSubmit = async (response: any) => {
    const res = await signIn('credentials', {
      email: response?.userPrincipalName,
      redirect: false
    })

    console.log(res)

    if (res && res.ok && res.error === null) {
      // Vars
      const redirectURL = searchParams.get('redirectTo') ?? '/dashboards/home'

      router.replace(getLocalizedUrl(redirectURL, locale as Locale))
    } else {
      if (res?.error) {
        const error = JSON.parse(res.error)

        setErrorState(error)
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      })
      .then(response => {
        callMsGraph(response.accessToken).then(response => onSubmit(response))
      })
  }

  useEffect(() => {
    if (isAuthenticated === true) {
      RequestProfileData()
    }
  }, [isAuthenticated])

  const handleLogin = (loginType: string) => {
    if (loginType === 'popup') {
      instance.loginPopup(loginRequest).catch(e => {
        console.log(e)
      })
    } else if (loginType === 'redirect') {
      instance.loginRedirect(loginRequest).catch(e => {
        console.log(e)
      })
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img style={{ width: '235px' }} alt='ecomlogo' src='/images/logos/bolivar_grande.png' />
          </Box>
          <div style={{ textAlign: 'center' }} className='flex flex-col gap-1'>
            <Typography marginBottom={10} variant='h2'>
              Ordenes de Compras
            </Typography>
            <Typography marginBottom={2} variant='h4'>
              Iniciar Sesion
            </Typography>
            <Typography sx={{ fontSize: '16px' }}>Ingresa a tu cuenta corporativa para acceder</Typography>
          </div>
          <div
            className='flex flex-col gap-6'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              sx={{
                width: '50%'
              }}
              variant='contained'
              onClick={() => handleLogin('redirect')}
            >
              INGRESAR
            </Button>
            {/* {isAuthenticated ? <p> ya esta logueado </p> : <p> no esta logueado </p>} */}
          </div>
        </div>
      </div>
      <div className='flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-0 max-md:hidden'>
        <ImgReel />
      </div>
    </div>
  )
}

export default Login
