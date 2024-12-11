/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { toast } from 'react-toastify'
import type { SubmitHandler } from 'react-hook-form'
import { useForm, Controller } from 'react-hook-form'

// Components Imports
import { Divider, InputLabel, OutlinedInput, Select } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import { FilterPicker } from '@/@core/components/AutocompleteFilter/FilterPicker'
import type { Moment } from 'moment'
import moment from 'moment'
import dayjs from 'dayjs'

type FormValues = {
  dateoc: Date | null | undefined
  observation: string
  periodicity: string
  select: string
  numberPeriods: number | null
  checkboxRecurrent: boolean | null
  nit: string
  emailEnviooc: string
  emailCcEnviooc: string
  cuentaPresupuestada: string
  constCenter: string
  porcentajeCostCenter: string
  descriptionCostCenter: string
  groupCostCenter: string
  itemCostCenter: string
  availableConstCenter: string
}

type PeriocityType = {
  date: Date | null | undefined | Moment
  value: null
  stringDate: string
}

const atributesPeriocityType = ['diaria', 'mensual', 'bimestral', 'trimestral', 'semestral']

type GroupType = { [K in (typeof atributesPeriocityType)[number]]: any }

const dictionaryPeriocityMoment: GroupType = {
  diaria: {
    type: 'day',
    amount: 1
  },
  mensual: {
    type: 'months',
    amount: 1
  },
  bimestral: {
    type: 'months',
    amount: 2
  },
  trimestral: {
    type: 'months',
    amount: 3
  },
  semestral: {
    type: 'months',
    amount: 6
  }
}

const FormToCreateOc = () => {
  // states
  const [arrayPeriocity, setArrayPerio] = useState<any[] | null>(null)

  // Hooks
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      dateoc: null,
      observation: '',
      periodicity: '',
      select: '',
      numberPeriods: null,
      checkboxRecurrent: false,
      nit: '',
      emailEnviooc: '',
      emailCcEnviooc: '',
      cuentaPresupuestada: '',
      descriptionCostCenter: '',
      groupCostCenter: '',
      itemCostCenter: '',
      availableConstCenter: '1.200.200'
    }
  })

  const handleSelectPeriocity = (event: any) => {
    const numberPeriocity = event.target.value
    const periocity: string = watch('periodicity')
    const array: any[] = []
    let moreThanOneMouth = dictionaryPeriocityMoment[periocity].amount
    const typePeriocity = dictionaryPeriocityMoment[periocity].type

    for (let index = 0; index < numberPeriocity; index++) {
      const fieldDateName = `datePeriocity${index}`
      const dateocSelec = moment()

      if (index > 1) moreThanOneMouth += dictionaryPeriocityMoment[periocity].amount

      const amoutTime = ['diaria', 'mensual'].includes(periocity)
        ? index
        : index > 0
          ? index > 1
            ? moreThanOneMouth
            : dictionaryPeriocityMoment[periocity].amount
          : index

      const dateValue = dateocSelec.add(amoutTime, dictionaryPeriocityMoment[periocity].type)

      console.log(dateValue.format('MM/DD/YYYY'))

      // array.push(
      //   <Grid container spacing={4}>
      //     <Grid item xs={12} sm={6}>
      //       {/* Fecha */}
      //       <Grid item xs={12} sm={12}>
      //         <Controller
      //           name={fieldDateName as keyof FormValues}
      //           defaultValue={dateValue}
      //           control={control}
      //           rules={{ required: true }}
      //           render={({ field }) => (
      //             <FormControl>
      //               <FilterPicker
      //                 {...field}
      //                 control={control}
      //                 name={fieldDateName}
      //                 label=''
      //                 required={true}

      //                 // {...(errors.[fieldDateName] && { error: true, helperText: 'This field is required.' })}
      //               />
      //             </FormControl>
      //           )}
      //         />
      //       </Grid>
      //     </Grid>
      //     <Grid item xs={12} sm={6} sx={{ marginBottom: '5px' }}>
      //       {/* Valor */}
      //       <Grid item xs={12} sm={12}>
      //         <FormControl>
      //           <Controller
      //             name='firstName'
      //             control={control}
      //             rules={{ required: true }}
      //             render={({ field }) => (
      //               <>
      //                 <OutlinedInput
      //                   id='outlined-adornment-amount'
      //                   startAdornment={<InputAdornment position='end'>$</InputAdornment>}
      //                   disabled
      //                   {...field}
      //                   {...(errors.firstName && {
      //                     error: true,
      //                     helperText: 'This field is required.'
      //                   })}
      //                 />
      //               </>
      //             )}
      //           />
      //         </FormControl>
      //       </Grid>
      //     </Grid>
      //   </Grid>
      // )
    }

    setArrayPerio(array)
  }

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data)
    toast.success('OC Creada')
  }

  return (
    <Card>
      <CardHeader title='Creación OC' />
      <Divider />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            {/* fecha oc */}
            <Grid item xs={12}>
              <Controller
                name='dateoc'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl variant='standard'>
                    <span>
                      <strong>Fecha OC</strong>
                    </span>
                    <FilterPicker
                      {...field}
                      control={control}
                      name='dateoc'
                      label=''
                      required={true}
                      {...(errors.dateoc && { error: true, helperText: 'This field is required.' })}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            {/* precargar orden */}
            <Grid item xs={12} sm={12}>
              <Grid item xs={12} sm={12} sx={{ marginBottom: '10px' }}>
                <span>
                  <strong>Precargar Datos</strong>
                </span>
                <p>Seleccione una orden y precargue datos de esa orden</p>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ width: '500px' }}>
                  <Controller
                    name='select'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        <InputLabel id='demo-simple-select-label'>Orden</InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label='Orden'
                          {...field}
                          error={Boolean(errors.select)}
                        >
                          <MenuItem value='CB-TC145-24'>CB-TC145-24</MenuItem>
                          <MenuItem value='CB-TC145-25'>CB-TC145-25</MenuItem>
                          <MenuItem value='CB-TC145-26'>CB-TC145-26</MenuItem>
                          <MenuItem value='CB-TC145-27'>CB-TC145-27</MenuItem>
                        </Select>
                      </>
                    )}
                  />
                </FormControl>
                <Button sx={{ marginLeft: '10px', width: '156px', height: '51px' }} variant='contained'>
                  Precargar
                </Button>
                {errors.select && <FormHelperText error>This field is required.</FormHelperText>}
              </Grid>
            </Grid>
            {/* Observaciones para Modificación */}
            <Grid item xs={8}>
              <Controller
                name='observation'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    rows={6}
                    fullWidth
                    multiline
                    label='Observaciones para Modificación'
                    {...(errors.observation && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            {/* Ordenes Recurrentes */}
            <Grid item xs={12} sm={12}>
              <Grid item xs={12} sm={12}>
                <Grid item xs={12} sm={12} sx={{ marginBottom: '10px' }}>
                  <span>
                    <strong>Ordenes Recurrentes</strong>
                  </span>
                  <p>Active el check para mostrar los campos para configurar OC Recurrentes</p>
                </Grid>
                <FormControl>
                  <Controller
                    name='checkboxRecurrent'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label='Recurrente' />}
                  />
                  {errors.checkboxRecurrent && <FormHelperText error>This field is required.</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
            {/* periocidad */}
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ width: '100%' }}>
                <Controller
                  name='periodicity'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <InputLabel id='demo-simple-select-label'>Periocidad</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Periocidad'
                        {...field}
                        error={Boolean(errors.periodicity)}
                      >
                        <MenuItem value={'diaria'}>Diaria</MenuItem>
                        <MenuItem value={'mensual'}>Mensual</MenuItem>
                        <MenuItem value={'bimestral'}>Bimestral</MenuItem>
                        <MenuItem value={'trimestral'}>Trimestral</MenuItem>
                        <MenuItem value={'semestral'}>Semestral</MenuItem>
                      </Select>
                    </>
                  )}
                />
              </FormControl>
              {errors.select && <FormHelperText error>This field is required.</FormHelperText>}
            </Grid>
            {/* numero de periodos */}
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ width: '100%' }}>
                <Controller
                  name='numberPeriods'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor='outlined-adornment-amount'>Numero de periodos</InputLabel>
                      <OutlinedInput
                        id='outlined-adornment-amount'
                        startAdornment={<InputAdornment position='end'>#</InputAdornment>}
                        label='Numero de periodos'
                        onChangeCapture={e => handleSelectPeriocity(e)}
                        {...field}
                        {...(errors.numberPeriods && { error: true, helperText: 'This field is required.' })}
                      />
                    </>
                  )}
                />
              </FormControl>
            </Grid>
            {/* fecha y valor */}
            <Grid item xs={12} sm={12}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  {arrayPeriocity}
                </Grid>
              </Grid>
            </Grid>
            {/* Proveedor */}
            <Grid item xs={12} sm={12}>
              <Grid container spacing={4}>
                {/* NIT – Razón Social */}
                <Grid item xs={12} sm={4}>
                  <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='nit'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <InputLabel id='demo-simple-select-label'>NIT – Razón Social</InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            label='NIT – Razón Social'
                            {...field}
                            error={Boolean(errors.nit)}
                          >
                            <MenuItem value={'900111222 – EMPRESA SAS'}>900111222 – EMPRESA SAS</MenuItem>
                          </Select>
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* Email Envio OC */}
                <Grid item xs={12} sm={4}>
                  <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='emailEnviooc'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <InputLabel id='demo-simple-select-label'>Email Envio OC</InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            label='Email Envio OC'
                            {...field}
                            error={Boolean(errors.emailEnviooc)}
                          >
                            <MenuItem value={'empresa.sas@empresa.com'}>empresa.sas@empresa.com</MenuItem>
                          </Select>
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* Email CC Envio OC */}
                <Grid item xs={12} sm={4}>
                  <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='emailCcEnviooc'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <InputLabel id='demo-simple-select-label'>Email CC Envio OC</InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            label='NIT – Razón Social'
                            {...field}
                            error={Boolean(errors.emailCcEnviooc)}
                          >
                            <MenuItem value={'empresa2.sas@empresa.com'}>empresa2.sas@empresa.com</MenuItem>
                          </Select>
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* cuenta presupuestada */}
            <Grid item xs={12} sm={12}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} sx={{ marginBottom: '10px' }}>
                  <span>
                    <strong>Cuenta Presupuestada</strong>
                  </span>
                </Grid>
                {/* cuenta presupuestada */}
                <Grid item xs={12} sm={4}>
                  <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='cuentaPresupuestada'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <InputLabel id='demo-simple-select-label'>Cuenta Presupuestada</InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            label='Cuenta Presupuestada'
                            {...field}
                            error={Boolean(errors.cuentaPresupuestada)}
                          >
                            <MenuItem value={'51909059 – OTROS SERVICIOS'}>51909059 – OTROS SERVICIOS</MenuItem>
                          </Select>
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* Contenedor Distribución Centros de Costos */}
            <Grid item xs={12} sm={12}>
              <Grid container spacing={4}>
                {/* Distribución Centros de Costos */}
                <Grid item xs={12} sm={12}>
                  <Grid item xs={12} sm={12} sx={{ marginBottom: '10px' }}>
                    <span>
                      <strong>Distribución Centros de Costos</strong>
                    </span>
                  </Grid>
                  <Button
                    sx={{ width: '156px', height: '51px' }}
                    variant='contained'
                    startIcon={<i className='bx-plus' />}
                  >
                    Nueva Linea
                  </Button>
                </Grid>
                {/* nueva linea */}
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={2}>
                    {/* Centro de Costo */}
                    <Grid item xs={12} sm={2}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='constCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel id='demo-simple-select-label'>Centro de Costo</InputLabel>
                              <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                label='Centro de Costo'
                                {...field}
                                error={Boolean(errors.constCenter)}
                              >
                                <MenuItem value={'01010101-GERENCIA GENERA'}>01010101-GERENCIA GENERA</MenuItem>
                              </Select>
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* porcentaje */}
                    <Grid item xs={12} sm={2}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='porcentajeCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Porcentaje</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                startAdornment={<InputAdornment position='end'>#</InputAdornment>}
                                label='Porcentaje'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.porcentajeCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* description */}
                    <Grid item xs={12} sm={2}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='descriptionCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Descripción</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Descripción'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.descriptionCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* Grupo */}
                    <Grid item xs={12} sm={2}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='groupCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel id='demo-simple-select-label'>Grupo</InputLabel>
                              <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                label='Grupo'
                                {...field}
                                error={Boolean(errors.groupCostCenter)}
                              >
                                <MenuItem value={'HONORARIOS'}>HONORARIOS</MenuItem>
                              </Select>
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* item */}
                    <Grid item xs={12} sm={2}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='itemCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel id='demo-simple-select-label'>Ítem</InputLabel>
                              <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                label='Ítem'
                                {...field}
                                error={Boolean(errors.itemCostCenter)}
                              >
                                <MenuItem value={'REVISORIA FISCA'}>REVISORIA FISCA</MenuItem>
                              </Select>
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* Disponible */}
                    <Grid item xs={12} sm={2}>
                      <FormControl sx={{ width: '80%' }}>
                        <Controller
                          name='availableConstCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Disponible</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Descripción'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                disabled
                                defaultValue={'1.200.000'}
                                {...field}
                                {...(errors.availableConstCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                      <IconButton sx={{ mt: '10px' }}>
                        <i className='bx-search text-textSecondary' title='Ver' />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                {/* botones carga y descarga de plantilla */}
                <Grid item xs={12} sm={12} spacing={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <Button
                        sx={{ height: '51px' }}
                        fullWidth
                        variant='contained'
                        startIcon={<i className='bx-plus' />}
                      >
                        Descargar Plantilla
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        sx={{ height: '51px' }}
                        fullWidth
                        variant='contained'
                        startIcon={<i className='bx-plus' />}
                      >
                        Cargar Plantilla
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* Contenedor Productos o Servicios */}
            <Grid item xs={12} sm={12}>
              <Grid container spacing={4}>
                {/* Productos o Servicios */}
                <Grid item xs={12} sm={12}>
                  <Grid item xs={12} sm={12} sx={{ marginBottom: '10px' }}>
                    <span>
                      <strong>Productos o Servicios</strong>
                    </span>
                  </Grid>
                  <Button
                    sx={{ width: '156px', height: '51px' }}
                    variant='contained'
                    startIcon={<i className='bx-plus' />}
                  >
                    Nueva Linea
                  </Button>
                </Grid>
                {/* nueva linea */}
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={2}>
                    {/* Referencia */}
                    <Grid item xs={12} sm={1.5}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='porcentajeCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Referencia</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Referencia'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.porcentajeCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* description */}
                    <Grid item xs={12} sm={1.5}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='porcentajeCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Descripción</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Descripción'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.porcentajeCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* Presentación */}
                    <Grid item xs={12} sm={1.5}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='descriptionCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Presetación</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Presetación'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.descriptionCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                      <Grid item xs={12} sm={3}></Grid>{' '}
                    </Grid>
                    {/* Cantidad */}
                    <Grid item xs={12} sm={1.5}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='descriptionCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Cantidad</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Cantidad'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.descriptionCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* Valor uni */}
                    <Grid item xs={12} sm={1.5}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='descriptionCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Valor Unitario</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='valor Unitario'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.descriptionCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* Valor */}
                    <Grid item xs={12} sm={1.5}>
                      <FormControl>
                        <Controller
                          name='availableConstCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Valor</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Valor'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                disabled
                                {...field}
                                {...(errors.availableConstCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* Impuesto */}
                    <Grid item xs={12} sm={1.5}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='constCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel id='demo-simple-select-label'>Impuesto</InputLabel>
                              <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                label='Impuesto'
                                {...field}
                                error={Boolean(errors.constCenter)}
                              >
                                <MenuItem value={'01010101-GERENCIA GENERA'}>01010101-GERENCIA GENERA</MenuItem>
                              </Select>
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* Valor impuesto */}
                    <Grid item xs={12} sm={1.5}>
                      <FormControl sx={{ width: '70%' }}>
                        <Controller
                          name='availableConstCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Valor impuesto</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Valor impuesto'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                disabled
                                defaultValue={'1.200.000'}
                                {...field}
                                {...(errors.availableConstCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                      <IconButton sx={{ mt: '10px' }}>
                        <i className='bx-search text-textSecondary' title='Ver' />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* contenedor AIU */}
            <Grid item xs={12} sm={12}>
              <Grid container spacing={6}>
                {/* checkbox aui */}
                <Grid item xs={12} sm={12}>
                  <Grid item xs={12} sm={12}>
                    <Grid item xs={12} sm={12} sx={{ marginBottom: '10px' }}>
                      <span>
                        <strong>AIU</strong>
                      </span>
                    </Grid>
                    <FormControl>
                      <Controller
                        name='checkboxRecurrent'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label='AIU' />}
                      />
                      {errors.checkboxRecurrent && <FormHelperText error>This field is required.</FormHelperText>}
                    </FormControl>
                  </Grid>
                </Grid>
                {/* Contenedor valores */}
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={2}>
                    {/* Subtotal costo mano de obra */}
                    <Grid item xs={12} sm={3}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='porcentajeCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Subtotal costo mano de obra</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Subtotal costo mano de obra'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.porcentajeCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* % Administración */}
                    <Grid item xs={12} sm={3}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='porcentajeCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>% Administración</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='% Administración'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.porcentajeCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* % Imprevistos */}
                    <Grid item xs={12} sm={3}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='porcentajeCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>% Imprevistos</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='% Imprevistos'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.porcentajeCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* % Utilidad */}
                    <Grid item xs={12} sm={3}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='porcentajeCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>% Utilidad</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='% Utilidad'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.porcentajeCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                {/* contenedor totales */}
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={4}>
                    {/* administracion */}
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={1}>
                          <span>Administración</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl sx={{ width: '100%' }}>
                            <Controller
                              name='porcentajeCostCenter'
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <>
                                  <InputLabel htmlFor='outlined-adornment-amount'></InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-amount'
                                    label=''
                                    onChangeCapture={e => handleSelectPeriocity(e)}
                                    startAdornment={<InputAdornment position='end'>$</InputAdornment>}
                                    {...field}
                                    {...(errors.porcentajeCostCenter && {
                                      error: true,
                                      helperText: 'This field is required.'
                                    })}
                                  />
                                </>
                              )}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Imprevistos */}
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={1}>
                          <span>Imprevistos</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl sx={{ width: '100%' }}>
                            <Controller
                              name='porcentajeCostCenter'
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <>
                                  <InputLabel htmlFor='outlined-adornment-amount'></InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-amount'
                                    label=''
                                    onChangeCapture={e => handleSelectPeriocity(e)}
                                    startAdornment={<InputAdornment position='end'>$</InputAdornment>}
                                    {...field}
                                    {...(errors.porcentajeCostCenter && {
                                      error: true,
                                      helperText: 'This field is required.'
                                    })}
                                  />
                                </>
                              )}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Utilidad */}
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={1}>
                          <span>Utilidad</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl sx={{ width: '100%' }}>
                            <Controller
                              name='porcentajeCostCenter'
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <>
                                  <InputLabel htmlFor='outlined-adornment-amount'></InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-amount'
                                    label=''
                                    onChangeCapture={e => handleSelectPeriocity(e)}
                                    startAdornment={<InputAdornment position='end'>$</InputAdornment>}
                                    {...field}
                                    {...(errors.porcentajeCostCenter && {
                                      error: true,
                                      helperText: 'This field is required.'
                                    })}
                                  />
                                </>
                              )}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* IVA Utilidad */}
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={1}>
                          <span>IVA Utilidad</span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl sx={{ width: '100%' }}>
                            <Controller
                              name='porcentajeCostCenter'
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <>
                                  <InputLabel htmlFor='outlined-adornment-amount'></InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-amount'
                                    label=''
                                    onChangeCapture={e => handleSelectPeriocity(e)}
                                    startAdornment={<InputAdornment position='end'>$</InputAdornment>}
                                    {...field}
                                    {...(errors.porcentajeCostCenter && {
                                      error: true,
                                      helperText: 'This field is required.'
                                    })}
                                  />
                                </>
                              )}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Total Mano de obra */}
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={1}>
                          <span>
                            <strong>Total Mano de obra</strong>
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl sx={{ width: '100%' }}>
                            <Controller
                              name='porcentajeCostCenter'
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <>
                                  <InputLabel htmlFor='outlined-adornment-amount'></InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-amount'
                                    label=''
                                    onChangeCapture={e => handleSelectPeriocity(e)}
                                    startAdornment={<InputAdornment position='end'>$</InputAdornment>}
                                    {...field}
                                    {...(errors.porcentajeCostCenter && {
                                      error: true,
                                      helperText: 'This field is required.'
                                    })}
                                  />
                                </>
                              )}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Total (Incluido AIU) */}
                    <Grid item xs={12} sm={12}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={1}>
                          <span>
                            <strong>Total (Incluido AIU)</strong>
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl sx={{ width: '100%' }}>
                            <Controller
                              name='porcentajeCostCenter'
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <>
                                  <InputLabel htmlFor='outlined-adornment-amount'></InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-amount'
                                    label=''
                                    onChangeCapture={e => handleSelectPeriocity(e)}
                                    startAdornment={<InputAdornment position='end'>$</InputAdornment>}
                                    {...field}
                                    {...(errors.porcentajeCostCenter && {
                                      error: true,
                                      helperText: 'This field is required.'
                                    })}
                                  />
                                </>
                              )}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* contenedor Observaciones de Entrega Bien o Servicio */}
            <Grid item xs={12} sm={12}>
              <Grid container spacing={4}>
                {/* title observaciones de Entrega Bien o Servicio */}
                <Grid item xs={12} sm={12}>
                  <span>
                    <strong>Observaciones de Entrega Bien o Servicio</strong>
                  </span>
                </Grid>
                {/* Data */}
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={2}>
                    {/* Fecha Entrega */}
                    <Grid item xs={12} sm={2}>
                      <Controller
                        name='dateoc'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <FormControl variant='standard'>
                            <span>Fecha Entrega</span>
                            <FilterPicker
                              {...field}
                              control={control}
                              name='dateoc'
                              label=''
                              required={true}
                              {...(errors.dateoc && { error: true, helperText: 'This field is required.' })}
                            />
                          </FormControl>
                        )}
                      />
                    </Grid>
                    {/* Usuario Recepcionado */}
                    <Grid item xs={12} sm={2} sx={{ mt: '20px' }}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='groupCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel id='demo-simple-select-label'>Usuario Recepcionado</InputLabel>
                              <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                label='Usuario Recepcionado'
                                {...field}
                                error={Boolean(errors.groupCostCenter)}
                              >
                                <MenuItem value={'Carlos Perez'}>Carlos Perez</MenuItem>
                              </Select>
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* Email Recepcionador */}
                    <Grid item xs={12} sm={2} sx={{ mt: '20px' }}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='porcentajeCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Email Recepcionador</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Email Recepcionador'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.porcentajeCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* Dirección de entrega */}
                    <Grid item xs={12} sm={2} sx={{ mt: '20px' }}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='porcentajeCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Dirección de entrega</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Dirección de entrega'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.porcentajeCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* Telefono */}
                    <Grid item xs={12} sm={2} sx={{ mt: '20px' }}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='porcentajeCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Telefono</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Telefono'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.porcentajeCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Observacion */}
                <Grid item xs={12} sm={8}>
                  <Controller
                    name='observation'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        rows={6}
                        fullWidth
                        multiline
                        label='Observación'
                        {...(errors.observation && { error: true, helperText: 'This field is required.' })}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Grid container spacing={4}>
                {/* title Aprobador y Adjuntos */}
                <Grid item xs={12} sm={12}>
                  <span>
                    <strong>Aprobador y Adjuntos</strong>
                  </span>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={2}>
                    {/* Usuario Aprobador */}
                    <Grid item xs={12} sm={2} sx={{ mt: '20px' }}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='groupCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel id='demo-simple-select-label'>Usuario Aprobador</InputLabel>
                              <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                label='Usuario Aprobador'
                                {...field}
                                error={Boolean(errors.groupCostCenter)}
                              >
                                <MenuItem value={'Carlos Perez'}>Carlos Perez</MenuItem>
                              </Select>
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* Email CC Aprobación */}
                    <Grid item xs={12} sm={2} sx={{ mt: '20px' }}>
                      <FormControl sx={{ width: '100%' }}>
                        <Controller
                          name='porcentajeCostCenter'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <InputLabel htmlFor='outlined-adornment-amount'>Email CC Aprobación</InputLabel>
                              <OutlinedInput
                                id='outlined-adornment-amount'
                                label='Email CC Aprobación'
                                onChangeCapture={e => handleSelectPeriocity(e)}
                                {...field}
                                {...(errors.porcentajeCostCenter && {
                                  error: true,
                                  helperText: 'This field is required.'
                                })}
                              />
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                {/* botones carga y descarga de plantilla */}
                <Grid item xs={12} sm={12} spacing={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <span>
                        <strong>Cotizaciones y Soportes</strong>
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        sx={{ height: '51px' }}
                        fullWidth
                        variant='contained'
                        startIcon={<i className='bx-plus' />}
                      >
                        Adjuntar Archivos
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Botones */}
            <Grid item xs={12} sx={{ marginTop: '10%' }} className='flex gap-'>
              <Button sx={{ width: '156px', height: '51px' }} variant='contained' type='submit'>
                Guardar
              </Button>
              <Button
                sx={{ marginLeft: '10px', width: '156px', height: '51px' }}
                variant='tonal'
                color='secondary'
                type='reset'
                onClick={() => reset()}
              >
                Reset
              </Button>
              {/* Anular OC */}
              <Grid item xs={12}>
                <Button sx={{ marginLeft: '10px', width: '156px', height: '51px' }} variant='contained'>
                  Anula OC
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormToCreateOc
