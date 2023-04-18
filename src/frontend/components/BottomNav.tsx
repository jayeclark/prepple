import { useState, useContext, useEffect, useRef, MutableRefObject } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTheme } from "@mui/material"
import SignInForm from "./SignInForm"
import { User, UserContext } from "../scripts/context"
import mdi from "../assets/mdi.png"
import profile from "../assets/profile_small.jpg"
import practice from "../assets/camera-video-fill.svg"
import review from "../assets/video.svg"
import home from "../assets/house-fill.svg"
import plan from "../assets/list-check.svg"
import share from "../assets/share-fill.svg"
import down from "../assets/caret-down-fill.svg"

function BottomNav({ currentActivePage }: {currentActivePage: string}) {
  const theme = useTheme();
  const router = useRouter();
  const { handleSetUser, user } = useContext(UserContext);
  const [showSignIn, setShowSignIn] = useState(false);
  const [activePage, setActivePage] = useState(currentActivePage)

  const handleSetShowSignIn = (visible: boolean) => {
    setShowSignIn(visible);
  }

  const logout = () => {
    localStorage.removeItem("mdi-session-access-token")
    handleSetUser({
      email: '',
      jwt: ''
    } as User)
    router.push("/");
  }

  return (
    <>
      <nav className="navigation">
        <div className="menu-options">
        <div className={router.pathname  == "/" ? "nav-item-active" : "nav-item"} onClick={() => setActivePage("/")}>
          <Link href="/" passHref>
            <div className="nav-link">
              <div className="option-icon"> 
                <Image width="22" height="22" src={home} alt="home" />
              </div>
            </div>
          </Link>
        </div>
        {user.jwt !== '' && (
            <div className={router.pathname == "/plan" ? "nav-item-active" : "nav-item"} onClick={() => setActivePage("/plan")}>
            <Link href="/plan" passHref>
                <div className="nav-link">
                  <div className="option-icon" >
                    <Image width="24" height="24" src={plan} alt="plan" />
                  </div>
              </div>
            </Link>
          </div>)}
          <div className={router.pathname  == "/practice" ? "nav-item-active" : "nav-item"} onClick={() => setActivePage("/practice")}>
            <Link href="/practice" passHref>
              <div className="nav-link">
                <div className="option-icon"> 
                  <Image width="24" height="24" className="practice-img" src={practice} alt="practice" />
                </div>
              </div>
            </Link>
          </div>
          {user.jwt !== '' && (
            <div className={router.pathname  == "/review" ? "nav-item-active" : "nav-item"} onClick={() => setActivePage("/review")}>
              <Link href="/review" passHref>
                <div className="nav-link">
                    <Image width="18" height="18" src={review} alt="review" />
                </div>
              </Link>
            </div>)}
          {user.jwt !== '' && (
            <div className={router.pathname  == "/share" ? "nav-item-active" : "nav-item"} onClick={() => setActivePage("/share")}>
              <Link href="/share" passHref>
                <div className="nav-link">
                  <Image width="18" height="18" src={share} alt="share" />
                </div>
              </Link>
            </div>)}
        </div>
      </nav>
      <SignInForm showSignIn={showSignIn} setShowSignIn={handleSetShowSignIn} />
      <style jsx>{`
        .navigation {
          width: 100vw;
          position: fixed;
          bottom: 0;
          height: 57px;
          min-height: 45px;
          max-height: 57px;
          padding: 8px 16px;
          display: none;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0px -1px 4px rgb(0,0,0,0.1);
          left: 0;
          color: #000;
          z-index: 999999;
          background-color: ${theme.palette.background.paper};
        }
        .menu-options {
          margin: 8px 0px;
          height: calc(100% + 16px);
          display: flex; 
          align-items: center; 
          min-height: 100%;
          width: 100vw;
          justify-content: space-between;
        }
        .option-label {
          padding-top: 2px;
        }
        .practice-img {
          margin: -3px 0px;
        }
        .option-icon {
          overflow: hidden;
          display: flex;
          max-height: 21px; 
          align-items: center;
          justify-content: center; 
        }
        .nav-item-active,
        .nav-item:hover {
          cursor: pointer;
          font-weight: 500;
          font-size: 0.8rem;
          opacity: 1;
        }
        .nav-item {
          cursor: pointer;
          font-weight: 500;
          font-size: 0.8rem;
          opacity: 0.6;
        }
        .nav-label {
          opacity: 0.6;
        }
        .nav-label:hover {
          opacity: 1;
        }
        .nav-link {
          padding: 10px 8px;
          text-align: center;
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.75px;
        }

        .profile-label {
           display: flex; 
           flex-wrap: nowrap; 
           align-items: center;
        }
        @media only screen and (max-width: 700px) {

          .navigation {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}

export default BottomNav