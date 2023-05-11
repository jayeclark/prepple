import { SvgElementProps } from "./SvgIcon";

const DEFAULT_FILL_COLOR = "currentColor";

const ArrowIcon = (props: SvgElementProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    style={{flexGrow: 1}}
    fill={props.fillcolor || DEFAULT_FILL_COLOR}
    className="bi bi-arrow-right-short"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
    />
  </svg>
)

export default ArrowIcon