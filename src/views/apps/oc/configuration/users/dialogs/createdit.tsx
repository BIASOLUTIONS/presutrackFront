/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'

import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import { FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select, styled } from '@mui/material'
import Dialog from '@mui/material/Dialog'

import { type Control, Controller, type FieldValues, useForm } from 'react-hook-form'

import { toast } from 'react-toastify'

import type { User, UserAutoCompleteSelect, UserForm } from '../../../../../../interfaces/users'
import type { General } from '../../../../../../interfaces/index'

import DialogVeilDisabler from '@core/components/DialogVeilDisabler'

import type { usersExternalType } from '@/types/apps/usersType'
import { UseUsers } from '@/hooks/users/useUsers'

import type { rolType } from '@/types/apps/rolType'

interface Props {
  opened: boolean
  userRol: rolType[]
  callback: () => void
  handleCreateditDialogState: (newState: boolean) => void
}

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiBackdrop-root': {}
}))

export default function CreateditUser({ opened, userRol, handleCreateditDialogState, callback }: Props) {
  const { externalUsers, getAllExternalUsers, createUserSystem } = UseUsers()
  const [open, setOpen] = React.useState(opened)
  const [intransaction, setIntransaction] = React.useState(false)
  const [selectUserValue, setSelectUserValue] = React.useState<number | null>()

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<UserForm>()

  const handleClose = () => {
    reset()
    setOpen(false)
    handleCreateditDialogState(false)
  }

  const handleSubmitModal = async () => {
    setIntransaction(true)

    const formValues = {
      ...getValues()
    }

    const transaction = await createUserSystem(formValues)

    const mensajeError = transaction?.bodyResponse?.statusCode === 409 ? 'Datos duplicados o erróneos' : ''

    transaction.status && toast.success('Usuario interno Creado')

    !transaction.status && toast.error(`Error al crear el usuario: ${mensajeError} `)

    transaction.status ? [callback(), handleClose()] : setIntransaction(false)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    reset()
    setOpen(opened)
    setIntransaction(false)

    async function fetchData() {
      await getAllExternalUsers()
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, reset])

  return (
    <React.Fragment>
      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogVeilDisabler message='Creando' opened={intransaction} />
        <DialogTitle id='customized-dialog-title'>Crear usuario</DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <i className='bx bx-x'></i>
        </IconButton>
        <DialogContent style={{ width: '600px' }}>
          <form className='displayForm'>
            <Grid container spacing={5}>
              <Grid item xs={12} md={12}>
                <FormControl
                  style={{ width: '100%' }}
                  required
                  error={errors.identification !== undefined}
                  variant='standard'
                >
                  <Autocomplete
                    id='identification'
                    disablePortal
                    options={externalUsers.map(user => {
                      return { label: user.fullName, id: user.identification }
                    })}
                    sx={{ width: '100%' }}
                    renderInput={params => <TextField {...params} label='Usuario' />}
                    {...register('identification', {
                      required: 'Este campo es obligatorio.'
                    })}
                    onChange={(event: any, newValue: UserAutoCompleteSelect | null) => {
                      setValue('identification', newValue?.id)
                    }}
                  />
                  <FormHelperText id='name'>{errors.identification?.message}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl style={{ width: '100%' }} required error={errors.roleId !== undefined} variant='standard'>
                  <Autocomplete
                    id='roleId'
                    disablePortal
                    options={userRol.map(rol => {
                      return { label: rol.name, id: rol.id }
                    })}
                    sx={{ width: '100%' }}
                    renderInput={params => <TextField {...params} label='' />}
                    onChange={(event: any, newValue: UserAutoCompleteSelect | null) => {
                      if (newValue?.id) setValue('roleId', newValue?.id)
                    }}
                  />
                  <FormHelperText id='name'>{errors.roleId?.message}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl style={{ width: '100%' }} required error={errors.status !== undefined} variant='standard'>
                  <InputLabel id='status'>Estado</InputLabel>
                  <Select
                    fullWidth
                    labelId='status'
                    id='status'
                    label='Estado'
                    {...register('status', {
                      required: 'Este campo es obligatorio.'
                    })}
                    style={{ width: '100%' }}
                  >
                    <MenuItem value={'ACTIVO'}>Activo</MenuItem>
                    <MenuItem value={'INACTIVO'}>Inactivo</MenuItem>
                  </Select>
                  <FormHelperText id='name'>{errors.status?.message}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button aria-label='close dialog' onClick={handleClose}>
            CANCELAR
          </Button>
          <Button onClick={handleSubmit(handleSubmitModal)}>GUARDAR</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  )
}
