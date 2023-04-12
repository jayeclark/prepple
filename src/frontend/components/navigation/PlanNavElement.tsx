import { useTheme } from "@mui/material";
import { NavElementWrapperProps } from "./types";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import plan from "../../assets/list-check.svg"

export function PlanNavElement({ path, user, setActivePage }: NavElementWrapperProps) {
  const theme = useTheme();
  const router = useRouter();

  return !user?.jwt ? null : (
            <div className={router.pathname == path ? "nav-item-active" : "nav-item"} onClick={() => setActivePage(path)}>
            <Link href={path} passHref>
                <div className="nav-link">
                  <div className="option-icon" >
                    <Image width="24" height="24" src={plan} alt="plan" />
                  </div>
                <div className="option-label">Plan</div>
              </div>
            </Link>
          </div>
  )
}