import {User} from "./user.interface.model";

export interface UserConfig {
  id?: number,
  userId?: string,
  numberOfCards?: number,
  icon?: string,
  color?: string,
  user?: User
};
