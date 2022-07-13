import { useState, useContext, useEffect, useRef, MutableRefObject } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTheme } from "@mui/material"
import SignInForm from "./SignInForm"
import { UserContext } from "../scripts/context"
import mdi from "../assets/mdi.png"
import profile from "../assets/profile_small.jpg"
import practice from "../assets/camera-video-fill.svg"
import review from "../assets/video.svg"
import home from "../assets/house-fill.svg"
import plan from "../assets/list-check.svg"
import share from "../assets/share-fill.svg"
import down from "../assets/caret-down-fill.svg"

function NavBar({ currentActivePage }: {currentActivePage: string}) {
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
    })
    router.push("/");
  }

  return (
    <>
      <nav className="navigation">
        <div className="brand">
          <Image height="41" width="64" alt="logo" src={mdi} />
        </div>
        <div className="menu-options">
        <div className={router.pathname  == "/" ? "nav-item-active" : "nav-item"} onClick={() => setActivePage("/")}>
          <Link href="/" passHref>
            <div className="nav-link">
              <div className="option-icon"> 
                <Image width="22" height="22" src={home} alt="home" />
              </div>
              <div className="option-label">Home</div>
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
                <div className="option-label">Plan</div>
              </div>
            </Link>
          </div>)}
          <div className={router.pathname  == "/practice" ? "nav-item-active" : "nav-item"} onClick={() => setActivePage("/practice")}>
            <Link href="/practice" passHref>
              <div className="nav-link">
                <div className="option-icon"> 
                  <Image width="24" height="24" className="practice-img" src={practice} alt="practice" />
                </div>
                <div className="option-label">Practice</div>
              </div>
            </Link>
          </div>
          {user.jwt !== '' && (
            <div className={router.pathname  == "/review" ? "nav-item-active" : "nav-item"} onClick={() => setActivePage("/review")}>
              <Link href="/review" passHref>
                <div className="nav-link">
                    <Image width="18" height="18" src={review} alt="review" />
                  <div className="option-label">Review</div>
                </div>
              </Link>
            </div>)}
          {user.jwt !== '' && (
            <div className={router.pathname  == "/share" ? "nav-item-active" : "nav-item"} onClick={() => setActivePage("/share")}>
              <Link href="/share" passHref>
                <div className="nav-link">
                  <Image width="18" height="18" src={share} alt="share" />
                  <div className="option-label">Share</div>
                </div>
              </Link>
            </div>)}
          {user.jwt === '' && (
            <div className="nav-item sign-in-option" onClick={() => setShowSignIn(true)}>
              <div className="sign-in">
                <span className="sign-in-text">Sign in</span>
              </div>
            </div>)}
          {user.jwt !== '' && (
            <div className="nav-item profile-option">
              <div className="nav-link profile-img-contaimer">
                <div onClick={logout}><Image alt="profile" width="24" height="24" style={{ borderRadius: 41 }} src={profile} /></div>
                <div className="profile-label">
                  <div className="nav-label">Me</div>
                  <Image width="16" height="16" style={{ opacity: 0.6 }} src={down} alt="dropdown" />               
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <SignInForm showSignIn={showSignIn} setShowSignIn={handleSetShowSignIn} />
      <style jsx>{`
        .navigation {
          width: 100vw;
          height: 57px;
          min-height: 45px;
          max-height: 57px;
          padding: 8px 16px;
          position: fixed;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0px 1px 1px #dce6f1;
          top: 0;
          left: 0;
          color: #000;
          z-index: 999999;
          background-color: ${theme.palette.background.paper};
        }
        .brand {
          margin: auto 0;
          padding: 0 8px;
          font-size: 1.35rem;
          font-weight: 600;
        }
        .menu-options {
          margin: 8px 0px;
          height: calc(100% + 16px);
          display: flex; 
          align-items: center; 
          min-height: 100%;
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
        .sign-in {
          cursor: pointer;
          margin: auto 0px; 
          color: #0a66c2!important; 
          border: 1.5px solid #0a66c2;
          padding: 5px 12px; 
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          min-width: 80px;
          text-align: center;
        }
        .sign-in-option {
          display: flex;
          align-items: center;
          opacity: 1;
        }
        .sign-in-text {
          color: #0a66c2;
        }
        .profile-option {
          margin-top: -3px;
          opacity: 1!important;
        }
        .profile-img-container {
          padding-top: 8px;
        }
        .nav-item-active,
        .nav-item:hover {
          cursor: pointer;
          font-weight: 500;
          font-size: 0.8rem;
          margin-left: 24px;
          opacity: 1;
          height: calc(100% + 2px);
        }
        .nav-item {
          cursor: pointer;
          font-weight: 500;
          font-size: 0.8rem;
          margin-left: 24px;
          opacity: 0.6;
          height: 100%;
        }
        .nav-label {
          opacity: 0.6;
        }
        .nav-label:hover {
          opacity: 1;
        }
        .nav-link {
          padding: 10px 8px 0px 8px;
          text-align: center;
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.75px;
          height: 100%;
        }
        .nav-item-active .nav-link {
          border-bottom: 2px solid;
        }
        .nav-item .nav-link {
          border-bottom: 2px solid transparent;
        }
        .profile-label {
           display: flex; 
           flex-wrap: nowrap; 
           align-items: center;
        }
        @media only screen and (max-width: 700px) {
          .nav-item,
          .nav-item-active {
            display: none;
          }
          .nav-item.sign-in-option,
          .nav-item.profile-option {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}

export default NavBar