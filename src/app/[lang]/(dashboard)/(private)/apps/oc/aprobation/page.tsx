// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import AprobationTable from '@views/apps/oc/aprobation/aprobation'
import type { aprobationTypeTAble } from '@/types/apps/aprobationTypes'

const ocToAprobationData: aprobationTypeTAble[] = [
  {
    id: 1,
    oc: 'CBC-TC-245-24',
    provider: 'Empresa uno SAS',
    total: '238',
    observation: '',
    status: 'Aprobada'
  }
]

const ocAprobationList = async () => {
  // Vars
  const data = { ocToAprobationData: ocToAprobationData } //await getEcommerceData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AprobationTable aprobationData={data?.ocToAprobationData} />
      </Grid>
    </Grid>
  )
}

export default ocAprobationList
