// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import BudgetData from '@views/apps/oc/budget/budget'

const AuditListPage = async () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <BudgetData />
      </Grid>
    </Grid>
  )
}

export default AuditListPage
