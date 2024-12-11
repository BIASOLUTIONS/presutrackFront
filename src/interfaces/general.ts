export interface ResponseFromServer {
  status: boolean
  bodyResponse: {
    id?: string
    statusCode?: number
    message?: string
    code?: string
    timestamp?: string
    path?: string
    method?: string
    token?: string
    userModules?: string
  }
}


export interface DeleteDialogObject {
  id: string
  name?: string
  customMessage?: string
  className: string
}
