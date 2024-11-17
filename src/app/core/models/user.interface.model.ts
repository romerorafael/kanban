export interface User {
  guid?:string;
  userConfigId?: number;
  name?: string;
  password: string;
  email: string;
  username?: string;
  roleId?: number;
}
