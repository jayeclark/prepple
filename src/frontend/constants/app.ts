import { User } from "../scripts/context";

export const APP_NAME = "Prepple";
export const COMPANY_NAME = "Prepple LLC";
export const SIGN_IN = "Sign In";
export const SIGN_UP = "Register";
export const isUserLoggedIn = (user: User) => user?.jwt === undefined || user?.jwt === '';