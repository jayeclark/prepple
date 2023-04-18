import { useState, useContext } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useTheme } from "@mui/material"
import SignInForm from "./SignInForm"
import { User, UserContext } from "../scripts/context"
import logo from "../assets/preppletransparent.png"
import { SESSION_TOKEN_KEY } from "../constants/localStorage"
import { HomeNavElement } from "./navigation/HomeNavElement"
import { PlanNavElement } from "./navigation/PlanNavElement"
import { PracticeNavElement } from "./navigation/PracticeNavElement"
import { ReviewNavElement } from "./navigation/ReviewNavElement"
import { ShareNavElement } from "./navigation/ShareNavElement"
import { SignInElement } from "./navigation/SignInElement"
import { ProfileDropDownElement } from "./navigation/ProfileDropdownElement"
import { SignUpElement } from "./navigation/SignUpElement"

function NavBar({ currentActivePage }: {currentActivePage: string}) {
  const theme = useTheme();
  const router = useRouter();
  const { handleSetUser, user } = useContext(UserContext);
  const [showSignIn, setShowSignIn] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);
  const [activePage, setActivePage] = useState(currentActivePage)

  const handleSetShowSignIn = (visible: boolean, signUp: boolean = false) => {
    setShowSignIn(visible);
    setSignUpMode(signUp);
  }

  const logout = () => {
    localStorage.removeItem(SESSION_TOKEN_KEY)
    handleSetUser({} as User)
    router.push("/");
  }
  console.log(user);

  return (
    <>
      <nav className="navigation">
        <div className="brand">
          <Image height="55" alt="logo" src={logo} />
        </div>
        <div className="menu-options">
          <HomeNavElement path="/" user={user} setActivePage={setActivePage} />
          <PlanNavElement path="/plan" user={user} setActivePage={setActivePage} />
          <PracticeNavElement path="/practice" user={user} setActivePage={setActivePage} />
          <ReviewNavElement path="/review" user={user} setActivePage={setActivePage} />
          <ShareNavElement path="/share" user={user} setActivePage={setActivePage} />
          <SignInElement user={user} setShowSignIn={handleSetShowSignIn} />
          <SignUpElement user={user} setShowSignIn={handleSetShowSignIn} />
          <ProfileDropDownElement user={user} logout={logout} />
        </div>
      </nav>
      <SignInForm showSignIn={showSignIn} setShowSignIn={handleSetShowSignIn} />
      <style jsx>{`
        .navigation {
          width: 100vw;
          height: 80px;
          min-height: 45px;
          max-height: 80px;
          padding: 8px 16px;
          position: fixed;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0px -2px 8px ${theme.palette.info.main};
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