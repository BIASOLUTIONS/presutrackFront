/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

// React Imports
import React, { useEffect, useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

import MUIDataTable from 'mui-datatables'

import type { RankingInfo } from '@tanstack/match-sorter-utils'
import { useForm } from 'react-hook-form'

// Type Imports
import { FormControl, FormHelperText, Grid, InputLabel, LinearProgress, OutlinedInput } from '@mui/material'

import { toast } from 'react-toastify'

import textFields from '@/configs/tables'

import type { PeriodsForm } from '@/interfaces/periods'

import { UsePeriods } from '../../../../../hooks/periods/usePeriods'
import type { General } from '@/interfaces'

interface Props {
  active: boolean
}

const columns = [
  'Periodo',
  'Estado',
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

const PeriodsCreateList = () => {
  // States
  const { loading, periods, getAllPeriods, createPeriod, updateStatusPeriods } = UsePeriods()
  const [currentTextfields] = useState(textFields)

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<PeriodsForm>()

  const validateOnlyOnePeriodActive = () => {
    const periodsActive = periods.filter(period => period?.status === 'ACTIVO')

    if (periodsActive.length > 0) {
      return false
    }

    return true
  }

  const validateIfExistPeriod = (year: number) => {
    const periodsExist = periods.filter(period => +period?.year === +year)

    if (periodsExist.length > 0) {
      return true
    }

    return false
  }

  const handleSubmitDataPeriod = async () => {
    setValue('description', 'N/A')

    const formValues = {
      ...getValues()
    }

    const yearExist = validateIfExistPeriod(formValues?.year)

    if (+formValues?.year < 2024) {
      toast.warn(`El año ingresado es menor al actual 2024`)

      return
    }

    if (yearExist) {
      toast.warn(`El Año ${formValues?.year} ya esta creado`)

      return
    }

    const transaction: Awaited<General.ResponseFromServer> = await createPeriod({
      year: +formValues.year,
      description: formValues.description
    })

    transaction.status && toast.success('Periodo Creado')

    !transaction.status && toast.error(`Error al crear el periodo`)

    await getAllPeriods()
  }

  const handleUpdateStatusPeriod = async (id: string | undefined, status: string) => {
    const cantActivePeriod = validateOnlyOnePeriodActive()

    if (!cantActivePeriod && status === 'ACTIVO') {
      toast.warning(`No se puede tener mas de un periodo activo`)

      return
    }

    const transaction = await updateStatusPeriods(id, { status })

    transaction.status && toast.success(`Se actualizo el estado: ${status}`)

    !transaction.status && toast.error(`Error en la actualización`)

    await getAllPeriods()
  }

  const periodsData: (string | number | React.JSX.Element | undefined)[][] = useMemo(() => {
    return periods.map(period => [
      period.year,
      period.status,
      <div key={period.id}>
        {period.status === 'INACTIVO' ? (
          <Button
            variant='contained'
            style={{ width: '100px' }}
            onClick={() => handleUpdateStatusPeriod(period.id, 'ACTIVO')}
          >
            Activar
          </Button>
        ) : (
          <Button
            variant='contained'
            color='warning'
            style={{ width: '100px' }}
            onClick={() => handleUpdateStatusPeriod(period.id, 'INACTIVO')}
          >
            Inactvar
          </Button>
        )}
      </div>
    ])
  }, [periods])

  const CustomToolbar: React.FC<Props> = (props: Props) => {
    return <>{props.active && <LinearProgress />}</>
  }

  React.useEffect(() => {
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
              <Grid item xs={12} sm={3}>
                <FormControl style={{ width: '100%' }}>
                  <InputLabel htmlFor='outlined-adornment-amount'>Año</InputLabel>
                  <OutlinedInput
                    fullWidth
                    {...register('year', {
                      required: true,
                      maxLength: 4,
                      pattern: /[0-9]*/
                    })}
                    id='year'
                    label='Año'
                    typeof='number'
                  />
                  {errors.year && errors.year.type === 'required' && <span>Este campo es obligatorio.</span>}
                  {errors.year && errors.year.type === 'maxLength' && <span>Solo se permiten 4 digitos.</span>}
                  {errors.year && errors.year.type === 'pattern' && <span>Solo se permite 4 numeros</span>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  sx={{ width: '156px', height: '51px' }}
                  variant='contained'
                  onClick={handleSubmit(handleSubmitDataPeriod)}
                >
                  Crear Periodo
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={6}></Grid>
          </form>
        </div>
        {/* Tabla */}
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12}>
            <div className='overflow-x-auto'>
              <MUIDataTable
                data={periodsData}
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

export default PeriodsCreateList
