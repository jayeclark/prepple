import { NextRouter } from "next/router";

export const redirectIfUnauthed = (jwt: string, router: NextRouter) => {
  if (!jwt) {
    router.push("/unauthed")
  }
}