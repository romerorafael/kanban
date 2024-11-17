export interface TokenInfos{
  id?: string,
  name?: string,
  email?: string,
  expiration?: Date,
  permissions?: string[]
}

export interface TokenResponse{
  type:string,
  token:string
}
