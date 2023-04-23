import { createContext } from "react";

export interface User {
  username: string;
  id: string;
  jwt: string;
  email: string;
}

type HandleSetUserFunction = (user: User) => void;

export const UserContext = createContext({ user: {} as User, handleSetUser: (() => { }) as HandleSetUserFunction });