import { createContext } from "react";

export const UserContext = createContext({ user: { username: '', id: '', jwt: '', email: '' }, handleSetUser: (user: any) => { } });