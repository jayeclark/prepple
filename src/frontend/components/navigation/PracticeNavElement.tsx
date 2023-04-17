import { NavElementWrapperProps } from "./types";
import PracticeIcon from "../svgs/PracticeIcon";
import { NavElement } from "./NavElement";

export const PracticeNavElement = ({ path, setActivePage, user }: NavElementWrapperProps) => (
  <NavElement
      user={user}
      name="Practice"
      Icon={PracticeIcon}
      path={path}
      setActivePage={setActivePage}
    />
  )
