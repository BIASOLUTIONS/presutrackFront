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

import type { AcountsAutoComplete, acount } from '../../../../../../interfaces/associateAcounts'
import type { General } from '../../../../../../interfaces/index'

import { useCostCenter } from '@/hooks/users/useCostCenter'

import DialogVeilDisabler from '@core/components/DialogVeilDisabler'
import { UseUsers } from '@/hooks/users/useUsers'
import type { costCenterType } from '@/types/apps/costCenterType'

interface Props {
  opened: boolean
  user: string | null
  costCenterUsers: costCenterType[] | undefined
  callback: () => void
  handleAsociateAcountsDialogState: (
    newState: boolean,
    user: string | null,
    costCenterUsers: costCenterType[] | undefined
  ) => void
}

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiBackdrop-root': {}
}))

export default function AssociateAccounts({
  opened,
  user,
  handleAsociateAcountsDialogState,
  callback,
  costCenterUsers
}: Props) {
  const [open, setOpen] = React.useState(opened)
  const { costCenters, getAllCostCenters } = useCostCenter()
  const { addCostCenterUser } = UseUsers()

  const [intransaction, setIntransaction] = React.useState(false)
  const [acountsAsociate, setAcountsAsociate] = React.useState<any>()
  const [tableAsociateAcount, setTableAsociateAcount] = React.useState<any[] | undefined>([])
  const [arrayAcountList, setarrayAcountList] = React.useState<any[] | null>([])

  const [constCenterDefault, setconstCenterDefault] = React.useState<any[] | undefined>([])

  const handleClose = () => {
    setOpen(false)
    handleAsociateAcountsDialogState(false, null, [])
  }

  const selectedCostCenterUser = () => {
    const data = costCenterUsers?.map(item => {
      return { label: item.name, id: item.code }
    })

    setTableAsociateAcount(data)

    setconstCenterDefault(data)
  }

  const handleSubmitModal = async () => {
    setIntransaction(true)

    console.log('id usuario', user)
    console.log('asociadas', acountsAsociate)

    const transaction = await addCostCenterUser(user, acountsAsociate)

    console.log('result', transaction)

    transaction.status && toast.success('Cuentas asignadas')

    !transaction.status && toast.error(`Error al asignar las cuentas `)

    transaction.status ? [callback(), handleClose()] : setIntransaction(false)
  }

  const reloadAsociateAcount = () => {
    const array: any[] = []
    let key = 1

    if (tableAsociateAcount) {
      for (let index = 0; index < tableAsociateAcount.length; index++) {
        array.push(<li key={key}>{tableAsociateAcount[index].label}</li>)
        key++
      }
    }

    setarrayAcountList(array)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    // reset()
    async function fetchData() {
      await getAllCostCenters()
    }

    fetchData()
    setTableAsociateAcount([])
    setarrayAcountList([])
    setOpen(opened)
    setIntransaction(false)
    selectedCostCenterUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened])

  React.useEffect(() => {
    reloadAsociateAcount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableAsociateAcount])

  return (
    <React.Fragment>
      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogVeilDisabler message='Asociando' opened={intransaction} />
        <DialogTitle id='customized-dialog-title'>Asociar cuentas a usuario</DialogTitle>
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
          <Grid container spacing={5}>
            <Grid item xs={12} md={12}>
              <Autocomplete
                multiple
                id='user'
                disablePortal
                value={constCenterDefault}
                options={costCenters.map(cc => {
                  return { label: cc.name, id: cc.code }
                })}
                sx={{ width: '100%' }}
                renderInput={params => <TextField {...params} label='Cuentas' />}
                onChange={(event: any, newValue: AcountsAutoComplete[]) => {
                  setconstCenterDefault(newValue)
                  setAcountsAsociate(newValue.map(el => el.id))
                  setTableAsociateAcount(newValue)
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <ol style={{ marginLeft: '30px' }}>{arrayAcountList}</ol>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button aria-label='close dialog' onClick={handleClose}>
            CANCELAR
          </Button>
          <Button onClick={() => handleSubmitModal()}>GUARDAR</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  )
}
