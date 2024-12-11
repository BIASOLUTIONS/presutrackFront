export type BudgetTypes = {
  id: string
  version: string
  fileName: string
  uploadedAt: string
  observation: string
  status: string
}

export type BudgetFormType = {
  periodId: string
  observation: string
  file?: File
}
