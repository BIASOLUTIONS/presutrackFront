'use client'

import React from 'react'

import { Button, Card, CardContent, CardHeader, Divider, Grid, InputLabel, MenuItem, Select } from '@mui/material'

const ReportsSelect = () => {
  return (
    <Card>
      <CardHeader title='Informes' />
      <Divider />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <InputLabel id='demo-simple-select-label'>Periodo</InputLabel>
            <Select fullWidth labelId='demo-simple-select-label' id='demo-simple-select' label='Periodo'>
              <MenuItem value='2024'>2024</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabel id='demo-simple-select-label'>Filtrar por NIT – Razón Social</InputLabel>
            <Select
              fullWidth
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Filtrar por NIT – Razón Social'
            >
              <MenuItem value='900111222 – EMPRESA SAS'>900111222 – EMPRESA SAS</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabel id='demo-simple-select-label'>Centro de Costo</InputLabel>
            <Select fullWidth labelId='demo-simple-select-label' id='demo-simple-select' label='Centro de Costo'>
              <MenuItem value='01010101-GERENCIA GENERA'>01010101-GERENCIA GENERA</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button sx={{ mt: '20px', width: '156px', height: '51px' }} variant='contained'>
              Descargar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ReportsSelect
