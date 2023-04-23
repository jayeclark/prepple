import { JSXElementConstructor } from "react";

export interface SvgElementProps {
  fillColor?: string;
}

interface SvgIconProps {
  width: number;
  height: number;
  fillColor?: string;
  Icon: JSXElementConstructor<any>;
}

const SvgIcon = ({Icon, ...props}: SvgIconProps) => (
  <div style={{ width: props.width, height: props.height }}>
    <Icon fillColor={props.fillColor}/>
  </div>
)
export default SvgIcon