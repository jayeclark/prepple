import { JSXElementConstructor } from "react";
import { SvgElementProps } from "../svgs/SvgIcon";

export interface NavElementWrapperProps {
  path: string;
  setActivePage: (path: string) => void;
  user: {
    username: string;
    id: string;
    jwt: string;
    email: string;
  }
}

export interface NavElementProps extends NavElementWrapperProps {
  name: string;
  Icon: (props: SvgElementProps) => JSX.Element;
}