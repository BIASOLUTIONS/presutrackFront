import Grid from '@mui/material/Grid'

import FormToCreateOc from '@views/apps/oc/create/Form'

const createOc = async () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormToCreateOc />
      </Grid>
    </Grid>
  )
}

export default createOc
