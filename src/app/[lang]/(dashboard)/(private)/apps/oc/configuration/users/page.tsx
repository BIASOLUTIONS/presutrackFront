// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UsersList from '@views/apps/oc/configuration/users/list'

const usersListApp = async () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsersList />
      </Grid>
    </Grid>
  )
}

export default usersListApp
