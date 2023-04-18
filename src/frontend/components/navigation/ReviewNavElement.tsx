import { NavElementWrapperProps } from "./types";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import review from "../../assets/video.svg";

export function ReviewNavElement({ path, user, setActivePage }: NavElementWrapperProps) {
  const router = useRouter();

  return !user?.jwt ? null : (
    <div className={router.pathname == path ? "nav-item-active" : "nav-item"} onClick={() => setActivePage(path)}>
      <Link href={path} passHref>
          <div className="nav-link">
            <div className="option-icon" >
              <Image width="18" height="18" src={review} alt="review" />
            </div>
          <div className="option-label">Review</div>
        </div>
      </Link>
    </div>
  )
}