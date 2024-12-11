// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import AuditList from '@views/apps/oc/audit/auditList'
import type { AuditTypeTable } from '@/types/apps/auditType'

const auditData: AuditTypeTable[] = [
  {
    id: 1,
    time: '12/12/2024 11:11',
    user: 'carlos.perez',
    value: 'CBC-TC-2215-24',
    action: 'Crear OC'
  },
  {
    id: 2,
    time: '12/12/2024 11:11',
    user: 'carlos.perez',
    value: 'CBC-TC-2215-24',
    action: 'Editar OC'
  },
  {
    id: 3,
    time: '12/12/2024 11:11',
    user: 'carlos.perez',
    value: 'CBC-TC-2215-24',
    action: 'Aprobar OC'
  }
]

const AuditListPage = async () => {
  // Vars
  const data = { auditData } //await getEcommerceData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AuditList auditData={data?.auditData} />
      </Grid>
    </Grid>
  )
}

export default AuditListPage
