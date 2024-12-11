/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

// React Imports
import React, { useEffect, useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

// Type Imports
import { Autocomplete, Grid, IconButton, LinearProgress, TextField, Tooltip } from '@mui/material'

import { toast } from 'react-toastify'

import { useForm } from 'react-hook-form'

import MUIDataTable from 'mui-datatables'

import moment from 'moment'

import textFields from '@/configs/tables'

import type { BudgetFormType, BudgetTypes } from '@/types/apps/budgetTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { UsePeriods } from '@/hooks/periods/usePeriods'
import { UseBudget } from '@hooks/budget/useBudget'

interface Props {
  active: boolean
}

const columns = [
  'Version',
  'Archivo',
  'Fecha',
  'Observación',
  'Estado',
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

const BudgetData = () => {
  // States
  const { loading, budgets, getAllBudget, createBudget, getFileBudget } = UseBudget()
  const { periods, getAllPeriods } = UsePeriods()
  const [currentTextfields] = useState(textFields)
  const [filename, setFilename] = useState('')
  const [fileToUpload, setFileToUpload] = useState()

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    control,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<BudgetFormType>()

  const handleUploadedFile = (event: any) => {
    const file = event.target.files[0]

    setFileToUpload(file)

    !!file ? setFilename(file.name) : setFilename('')
  }

  const getMetadataPeriod = async (periodId: string) => {
    setValue('periodId', periodId)
    await getAllBudget(periodId)
    console.log('consulta metada periodo', periodId)
  }

  const handleSubmitDataBudget = async () => {
    const formValues = {
      ...getValues()
    }

    const formData = new FormData()

    if (fileToUpload) formData.append('file', fileToUpload)

    const transaction = await createBudget(formValues, formData)

    transaction.status && toast.success('Presupuesto Creado')

    !transaction.status && toast.error(`Error al crear el Presupuesto`)

    await getAllBudget(formValues?.periodId)

    resetField('file')
    resetField('observation')
  }

  const budgetsData: (string | BudgetTypes | React.JSX.Element | undefined)[][] = useMemo(() => {
    return budgets.map(budget => [
      budget.version,
      budget.fileName,
      moment(budget.uploadedAt).format('YYYY-MM-DD'),
      budget.observation,
      budget.status,
      <div key={budget.id}>
        <IconButton onClick={() => getFileBudget(budget?.id, budget?.fileName)}>
          <i className='bx-download text-textSecondary' title='Descargar' />
        </IconButton>
        {budget.status === 'ACTIVO' ? (
          <IconButton>
            <i className='bx-chevrons-down text-textSecondary' title='Inactivar' />
          </IconButton>
        ) : (
          <IconButton>
            <i className='bx-check-double text-textSecondary' title='Activar' />
          </IconButton>
        )}
      </div>
    ])
  }, [budgets])

  const CustomToolbar: React.FC<Props> = (props: Props) => {
    return <>{props.active && <LinearProgress />}</>
  }

  useEffect(() => {
    reset()

    async function fetchData() {
      await getAllPeriods()
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Card>
        {/* Botones y cantidad de datos para ver */}
        <div className='flex items-center justify-between flex-wrap gap-4 p-6'>
          <form className='displayForm' style={{ width: '100%' }}>
            <Grid container spacing={6}>
              {periods.length > 0 ? (
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    id='periods'
                    disablePortal
                    options={periods
                      .filter(period => period.status === 'ACTIVO')
                      .map(period => {
                        return { label: period.year.toString(), id: period.id }
                      })}
                    sx={{ width: '100%' }}
                    renderInput={params => <TextField {...params} label='Periodos' />}
                    {...register('periodId', {
                      required: 'Este campo es obligatorio.'
                    })}
                    onChange={(event: any, newValue: { label: string; id: string | undefined } | null) => {
                      if (newValue?.id) getMetadataPeriod(newValue?.id)
                    }}
                  />
                  {errors.periodId?.message && <p style={{ color: 'red', margin: 0 }}>{errors.periodId?.message}</p>}
                </Grid>
              ) : null}

              <Grid item xs={12} sm={12}>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={4}>
                    <Button variant='contained' component='label' sx={{ marginRight: '1rem', width: '200px' }}>
                      Seleccionar archivo
                      <input
                        type='file'
                        {...register('file', {
                          required: 'Este campo es obligatorio.'
                        })}
                        accept='.xls, .xlsx'
                        name='receive'
                        hidden
                        onChange={handleUploadedFile}
                      />
                    </Button>
                    <span>{filename}</span>
                    {errors.file?.message && <p style={{ color: 'red', margin: 0 }}>{errors.file?.message}</p>}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      rows={3}
                      fullWidth
                      multiline
                      label='Observaciones para Modificación'
                      {...register('observation', {
                        required: 'Este campo es obligatorio.'
                      })}
                    />
                    {errors.observation?.message && (
                      <p style={{ color: 'red', margin: 0 }}>{errors.observation?.message}</p>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button sx={{ mr: '5px' }} variant='contained' onClick={handleSubmit(handleSubmitDataBudget)}>
                  Cargar
                </Button>
                <a href='#' target='_blank' download>
                  <Button variant='contained'>Descargar Plantilla Vacia</Button>
                </a>
              </Grid>
            </Grid>
          </form>
          <div></div>
        </div>
        {/* Tabla */}
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12}>
            <div className='overflow-x-auto'>
              <MUIDataTable
                data={budgetsData}
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
    </>
  )
}

export default BudgetData
