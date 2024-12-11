import Grid from '@mui/material/Grid'

import ReportsSelect from '@views/apps/oc/reports/reports'

const Reports = async () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ReportsSelect />
      </Grid>
    </Grid>
  )
}

export default Reports
