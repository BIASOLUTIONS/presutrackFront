import React from 'react'

import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'

interface VeilProps {
  message: string
  opened: boolean
}

const Veil = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  position: 'absolute',
  zIndex: 9,
  backgroundColor: theme.palette.mode === 'dark' ? '#322d4ae8' : '#ffffffb3',
  backdropFilter: 'blur(8px)'
}))

export default function DialogVeilDisabler({ message, opened }: VeilProps) {
  const [open, setOpen] = React.useState(opened)

  React.useEffect(() => {
    setOpen(opened)
  }, [opened])

  return (
    <Fade in={open}>
      <Veil>
        <div style={{ display: 'grid' }}>
          <CircularProgress style={{ margin: 'auto' }} size={50} className='buttonProgress' />
          <p>{message}</p>
        </div>
      </Veil>
    </Fade>
  )
}
