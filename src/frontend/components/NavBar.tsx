import { useState, useContext } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useTheme } from "@mui/material"
import SignInForm from "./SignInForm"
import { UserContext } from "../scripts/context"
import logo from "../assets/preppletransparent.png"
import { SESSION_TOKEN_KEY } from "../constants/localStorage"
import { HomeNavElement } from "./navigation/HomeNavElement"
import { PlanNavElement } from "./navigation/PlanNavElement"
import { PracticeNavElement } from "./navigation/PracticeNavElement"
import { ReviewNavElement } from "./navigation/ReviewNavElement"
import { ShareNavElement } from "./navigation/ShareNavElement"
import { SignInElement } from "./navigation/SignInElement"
import { ProfileDropDownElement } from "./navigation/ProfileDropdownElement"

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
    localStorage.removeItem(SESSION_TOKEN_KEY)
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
          <Image height="41" alt="logo" src={logo} />
        </div>
        <div className="menu-options">
          <HomeNavElement path="/" setActivePage={setActivePage} />
          <PlanNavElement path="/plan" user={user} setActivePage={setActivePage} />
          <PracticeNavElement path="/practice" setActivePage={setActivePage} />
          <ReviewNavElement path="/review" user={user} setActivePage={setActivePage} />
          <ShareNavElement path="/share" user={user}  setActivePage={setActivePage} />
          <SignInElement user={user} setShowSignIn={setShowSignIn} />
          <ProfileDropDownElement user={user} logout={logout} />
        </div>
      </nav>
      <SignInForm showSignIn={showSignIn} setShowSignIn={handleSetShowSignIn} />
      <style jsx>{`
        .navigation {
          width: 100vw;
          height: 70px;
          min-height: 45px;
          max-height: 70px;
          padding: 8px 16px;
          position: fixed;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0px 1px 1px ${theme.palette.background.paper};
          top: 0;
          left: 0;
          color: ${theme.palette.background.default};
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
        .practice-img {
          margin: -3px 0px;
        }
      `}</style>
    </>
  );
}

export default NavBar