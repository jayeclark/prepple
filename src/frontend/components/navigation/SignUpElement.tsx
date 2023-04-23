import { useTheme } from "@mui/material";
import styles from "../../styles/Nav.module.css";
import { SIGN_UP, isUserLoggedIn } from "../../constants/app";

interface SignInElementProps {
  user: {
    username: string;
    id: string;
    jwt: string;
    email: string;
  }
  setShowSignIn: (show: boolean, signUp: boolean) => void;
}

export const SignUpElement = ({ user, setShowSignIn }: SignInElementProps) => {
  const theme = useTheme();

  return !isUserLoggedIn(user) ? null : (
    <>
      <div className={styles.signInOption} onClick={() => setShowSignIn(true, true)}>
      <div className="sign-up">
          <span className="sign-up-text">{SIGN_UP}</span>
      </div>
    </div>
    <style jsx>{`
        .sign-up {
          cursor: pointer;
          margin: auto 0px; 
          color: ${theme.palette.primary.main}!important; 
          background-color: ${theme.palette.info.main};
          border: 1.5px solid ${theme.palette.info.main};
          padding: 8px 16px; 
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.9rem;
          min-width: 80px;
          text-align: center;
        }
        .sign-in-text {
          color: ${theme.palette.info.main};
        }
      `}</style>
    </>
  )
}