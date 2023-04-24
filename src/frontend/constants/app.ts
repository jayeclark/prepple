import { User } from "../scripts/context";

let url = 'http://localhost:1337'
if (typeof window !== "undefined") {
  if (window.location.href.includes("herokuapp") || window.location.href.includes("mydevinterview")) {
    url = "https://backend-sheltered-shelf-66946.herokuapp.com";
  }
} 

export const API_URL = process.env.API_URL || url
export const APP_NAME = "Prepple";
export const COMPANY_NAME = "Prepple LLC";
export const SIGN_IN = "Sign In";
export const SIGN_UP = "Register";
export const isUserLoggedIn = (user: User) => user?.jwt === undefined || user?.jwt === '';