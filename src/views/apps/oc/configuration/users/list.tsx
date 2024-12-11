/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

// React Imports
import React, { useEffect, useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

// Type Imports
import { Grid, LinearProgress, IconButton, Autocomplete, TextField, InputLabel, OutlinedInput } from '@mui/material'

import { toast } from 'react-toastify'

import MUIDataTable from 'mui-datatables'

// Component Imports
import CreateditUser from './dialogs/createdit'
import AssociateAccounts from './dialogs/acounts'

// Style Imports

import textFields from '@/configs/tables'
import { UseUsers } from '@/hooks/users/useUsers'
import type { costCenterType } from '@/types/apps/costCenterType'

// import type { General } from '@/interfaces'

interface Props {
  active: boolean
}

const optionsStatus = [
  { label: 'Activo', value: 'ACTIVO' },
  { label: 'Inactivo', value: 'INACTIVO' }
]

const columns = [
  'Usuario',
  'Rol',
  'Estado',
  'Cuentas',
  'Acciones',
  {
    name: '',
    options: {
      download: false,
      viewColumns: false,
      filter: false,
      sort: false,
      setCellProps: () => ({
        style: {
          whiteSpace: 'nowrap',
          position: 'sticky',
          left: '0',
          zIndex: 100
        }
      }),
      setCellHeaderProps: () => ({
        style: {
          width: '10px',
          whiteSpace: 'nowrap',
          position: 'sticky',
          left: 0,
          zIndex: 101
        }
      })
    }
  }
]

const UsersList = () => {
  // States
  const { loading, users, userRol, getAllUsers, getAllUsersProfile, updateStatusOrRolUser } = UseUsers()
  const [currentTextfields] = useState(textFields)
  const [createditDialogState, setCreateditDialogState] = useState(false)
  const [asociateAcountDialogState, setAsociateAcountDialogState] = useState(false)
  const [userAsigneAcoutn, setUserAsigneAcoutn] = useState<string | null>(null)
  const [userCostCenters, setUserCostCenters] = useState<costCenterType[] | undefined>([])
  const [search, setSearchFiter] = useState<string>('')

  const [paginaton, setPaginaton] = useState({
    page: 0,
    count: 10
  })

  const [paginatonFilter, setPaginatonFiler] = useState({
    page: '0',
    size: '10'
  })

  const selectUserRol = (idUserRol: string | undefined) => {
    const rolSelected = userRol.filter(rol => rol.id === idUserRol)[0]
    const selected = rolSelected?.id ? { label: rolSelected?.name, id: rolSelected?.id } : null

    return selected
  }

  const selectUserStatus = (userStatus: string | undefined) => {
    const status = optionsStatus.filter(o => o.value === userStatus)[0]
    const selectedStatus = status?.value ? status : null

    return selectedStatus
  }

  const setSearch = (event: any) => {
    setSearchFiter(event?.target?.value)
    getAllUsers(paginatonFilter, event?.target?.value)
  }

  const handleCreateditDialogState = (state: boolean) => {
    setCreateditDialogState(state)
  }

  const handleAsociateAcountsDialogState = (
    state: boolean,
    user: string | null,
    constCenters: costCenterType[] | undefined
  ) => {
    user !== undefined ? setUserAsigneAcoutn(user) : setUserAsigneAcoutn(null)
    setUserCostCenters(constCenters)
    setAsociateAcountDialogState(state)
  }

  const handleChangeStatus = async (idUser: string, status: string) => {
    const transaction = await updateStatusOrRolUser(idUser, { status })

    transaction.status && toast.success(`Se actualizo el estado del usuario a: ${status}`)

    !transaction.status && toast.error(`Error al actualizar el estado del usuario `)

    transaction.status && (await getAllUsers(paginatonFilter))
  }

  const handleChangeRol = async (idUser: string, roleId: string) => {
    const transaction = await updateStatusOrRolUser(idUser, { roleId })

    transaction.status && toast.success(`Rol actualizado`)

    !transaction.status && toast.error(`Error al actualizar el Rol `)

    transaction.status && (await getAllUsers(paginatonFilter))
  }

  const UsersData: (string | number | React.JSX.Element | undefined)[][] = useMemo(() => {
    return users?.elements.map(user => [
      user.email,
      <div className='flex items-center' key={user.id}>
        <Autocomplete
          id='userRol'
          disablePortal
          value={selectUserRol(user?.role?.id)}
          options={userRol.map(rol => {
            return { label: rol.name, id: rol.id }
          })}
          sx={{ width: '100%' }}
          renderInput={params => <TextField {...params} label='' />}
          onChange={(event: any, newValue: { label: string; id: string | undefined } | null) => {
            if (newValue?.id) handleChangeRol(user.id, newValue?.id)
          }}
        />
      </div>,
      <div className='flex items-center' key={user.id}>
        <Autocomplete
          id='userStatus'
          disablePortal
          value={selectUserStatus(user.status)}
          options={optionsStatus}
          sx={{ width: '100%' }}
          renderInput={params => <TextField {...params} label='' />}
          onChange={(event: any, newValue: { label: string; value: string | undefined } | null) => {
            if (newValue?.value) handleChangeStatus(user.id, newValue?.value)
          }}
        />
      </div>,
      user.costCenters?.length,
      <div className='flex items-center' key={user.id}>
        <IconButton onClick={() => handleAsociateAcountsDialogState(true, user.id, user?.costCenters)}>
          <i className='bx-notepad text-textSecondary' title='añadir cuentas' />
        </IconButton>
      </div>
    ])
  }, [users, selectUserRol, handleChangeStatus, userRol])

  const CustomToolbar: React.FC<Props> = (props: Props) => {
    return <>{props.active && <LinearProgress />}</>
  }

  useEffect(() => {
    async function fetchData() {
      await getAllUsers(paginatonFilter)
      await getAllUsersProfile()
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPaginaton({
      page: users?.currentPage > 0 ? users?.currentPage - 1 : 0,
      count: users?.totalElements || 0
    })
  }, [users])

  return (
    <>
      <Card>
        {/* Botones y cantidad de datos para ver */}
        <div className='flex items-center justify-between flex-wrap gap-4 p-6'>
          <div
            className='flex sm:items-center flex-wrap max-sm:flex-col max-sm:is-full gap-4'
            style={{ width: '100%' }}
          >
            <Grid container spacing={6}>
              <Grid item xs={6} md={4} sm={12}>
                <InputLabel htmlFor='outlined-adornment-amount'>Buscar usuario</InputLabel>
                <OutlinedInput
                  style={{ width: '100%' }}
                  id='outlined-adornment-amount'
                  startAdornment={
                    <IconButton>
                      <i className='bx-search text-textSecondary' title='Ver' />
                    </IconButton>
                  }
                  label='Buscar usuario'
                  onChange={e => setSearch(e)}
                />
              </Grid>
              <Grid item xs={6} md={4} sm={12}>
                <Button
                  variant='contained'
                  onClick={() => handleCreateditDialogState(true)}
                  startIcon={<i className='bx-plus' />}
                  style={{ marginTop: '20px', height: '55px' }}
                >
                  Crear usuario
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
        {/* Tabla */}
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12}>
            <div className='overflow-x-auto'>
              <MUIDataTable
                data={UsersData}
                columns={columns}
                title={''}
                options={{
                  customToolbar: () => {
                    return <CustomToolbar active={loading} />
                  },
                  filterType: 'checkbox',
                  selectableRows: 'none',
                  elevation: 0,
                  textLabels: currentTextfields,
                  print: false,
                  filter: false,
                  search: false,
                  serverSide: true,
                  ...paginaton,
                  onTableChange: async (action, tableState) => {
                    switch (action) {
                      case 'changePage': {
                        await getAllUsers({
                          page: (tableState.page * tableState.rowsPerPage).toString(),
                          size: tableState.rowsPerPage.toString()
                        })
                        setPaginatonFiler({
                          page: (tableState.page * tableState.rowsPerPage).toString(),
                          size: tableState.rowsPerPage.toString()
                        })
                        break
                      }

                      case 'changeRowsPerPage': {
                        await getAllUsers({
                          page: (tableState.page * tableState.rowsPerPage).toString(),
                          size: tableState.rowsPerPage.toString()
                        })
                        setPaginatonFiler({
                          page: (tableState.page * tableState.rowsPerPage).toString(),
                          size: tableState.rowsPerPage.toString()
                        })
                        break
                      }

                      case 'sort':
                        break
                      default:
                        break
                    }
                  },
                  sortOrder: {
                    name: 'Periodo',
                    direction: 'asc'
                  },
                  downloadOptions: {
                    filename: `Periodos ${new Date()}.csv`
                  }
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Card>
      <CreateditUser
        opened={createditDialogState}
        userRol={userRol}
        handleCreateditDialogState={handleCreateditDialogState}
        callback={() => getAllUsers(paginatonFilter)}
      />
      <AssociateAccounts
        opened={asociateAcountDialogState}
        user={userAsigneAcoutn}
        costCenterUsers={userCostCenters}
        handleAsociateAcountsDialogState={handleAsociateAcountsDialogState}
        callback={() => getAllUsers(paginatonFilter)}
      />
    </>
  )
}

export default UsersList
