import {User} from "./user.interface.model";

export interface Board {
  id?: number;
  userId?: string;
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
}

export const emptyBoard: Board = {id: 0}
