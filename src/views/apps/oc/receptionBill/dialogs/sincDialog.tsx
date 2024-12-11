import * as React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogTitle from '@mui/material/DialogTitle'

import { DialogContentText, Grid, InputLabel, OutlinedInput } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function SincDialog() {
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleClickOpen}>
        Sincronizar
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>Sincronizar</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <InputLabel htmlFor='outlined-adornment-amount'>Numero de Factura</InputLabel>
              <OutlinedInput id='outlined-adornment-amount' label='Numero de Factura' />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel htmlFor='outlined-adornment-amount'>Fecha de Factura</InputLabel>
              <OutlinedInput id='outlined-adornment-amount' label='Fecha de Factura' />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
