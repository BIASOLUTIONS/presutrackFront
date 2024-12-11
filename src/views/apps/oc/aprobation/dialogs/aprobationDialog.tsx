import * as React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogTitle from '@mui/material/DialogTitle'

import { DialogContentText, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import CustomTextField from '@/@core/components/mui/TextField'

export default function FormDialog() {
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
        Ejecutar Acción
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'> Ejecutar Acción</DialogTitle>
        <DialogContent>
          <DialogContentText>Observación</DialogContentText>
        </DialogContent>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <CustomTextField rows={6} fullWidth multiline label='' />
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
