import { NavElementWrapperProps } from "./types";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import share from "../../assets/share-fill.svg"

export function ShareNavElement({ path, user, setActivePage }: NavElementWrapperProps) {
  const router = useRouter();

  return !user?.jwt ? null : (
    <div className={router.pathname == path ? "nav-item-active" : "nav-item"} onClick={() => setActivePage(path)}>
      <Link href={path} passHref>
          <div className="nav-link">
            <div className="option-icon" >
              <Image width="18" height="18" src={share} alt="share" />
            </div>
          <div className="option-label">Share</div>
        </div>
      </Link>
    </div>
  )
}