import HomeIcon from "../svgs/HomeIcon";
import {  NavElementWrapperProps } from "./types";
import { NavElement } from "./NavElement";
import { useRouter } from "next/router";


export const HomeNavElement = ({ path, setActivePage }: NavElementWrapperProps) => {
  const router = useRouter();
  return router.pathname == path ? null : (
    <NavElement
      name="Home"
      Icon={HomeIcon}
      path={path}
      setActivePage={setActivePage}
    />
  )
}
