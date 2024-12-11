// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ReceptiomBillsTable from '@views/apps/oc/receptionBill/billsList'
import type { receptionBillsTypeTAble } from '@/types/apps/recpetionBillsType'

const receptionBillData: receptionBillsTypeTAble[] = [
  {
    id: 1,
    oc: 'CBC-TC-245-24',
    provider: 'Empresa uno SAS',
    subtotal: 100,
    total: 200,
    numberBill: 'FV1245',
    dateBill: ''
  }
]

const receptionBillsList = async () => {
  // Vars
  const data = { receptionBillData } //await getEcommerceData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ReceptiomBillsTable billsData={data?.receptionBillData} />
      </Grid>
    </Grid>
  )
}

export default receptionBillsList
