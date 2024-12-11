// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import TableOc from '@views/apps/oc/resumen/list/OcTable'
import type { ocResumenType } from '@/types/apps/ocResumenTyme'

const ocResumenData: ocResumenType[] = [
  {
    id: 1,
    oc: 'CB-TC145-24',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Aprobada'
  },
  {
    id: 1,
    oc: 'CB-TC145-25',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Syncronizada'
  },
  {
    id: 1,
    oc: 'CB-TC145-26',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Anulada'
  },
  {
    id: 1,
    oc: 'CB-TC145-27',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Aprobada'
  },
  {
    id: 1,
    oc: 'CB-TC145-28',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Syncronizada'
  },
  {
    id: 1,
    oc: 'CB-TC145-29',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Anulada'
  },
  {
    id: 1,
    oc: 'CB-TC145-30',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Aprobada'
  },
  {
    id: 1,
    oc: 'CB-TC145-31',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Syncronizada'
  },
  {
    id: 1,
    oc: 'CB-TC145-32',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Anulada'
  },
  {
    id: 1,
    oc: 'CB-TC145-33',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Aprobada'
  },
  {
    id: 1,
    oc: 'CB-TC145-24',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Syncronizada'
  },
  {
    id: 1,
    oc: 'CB-TC145-24',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Anulada'
  },
  {
    id: 1,
    oc: 'CB-TC145-24',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Aprobada'
  },
  {
    id: 1,
    oc: 'CB-TC145-24',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Syncronizada'
  },
  {
    id: 1,
    oc: 'CB-TC145-40',
    creador: 'carlos.perez@cbolivar.com',
    aprobador: 'Martha.Suarez@cbolivar.com',
    creacion: '01-01-2024',
    observacionModificacion: 'Proveedor cambio valor',
    estado: 'Anulada'
  }
]

const ocResumenList = async () => {
  // Vars
  const data = { ocResumenes: ocResumenData } //await getEcommerceData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableOc resumenData={data?.ocResumenes} />
      </Grid>
    </Grid>
  )
}

export default ocResumenList
