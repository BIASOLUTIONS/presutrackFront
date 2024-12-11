import React from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

import PeriodsCreateList from '@views/apps/oc/configuration/periods/create'

const PeriodsCreatePage = async () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PeriodsCreateList />
      </Grid>
    </Grid>
  )
}

export default PeriodsCreatePage
