import { useTheme } from "@mui/material";
import styles from "../../styles/Nav.module.css";
import { SIGN_IN, isUserLoggedIn } from "../../constants/app";

interface SignInElementProps {
  user: {
    username: string;
    id: string;
    jwt: string;
    email: string;
  }
  setShowSignIn: (b: boolean) => void;
}

export const SignInElement = ({ user, setShowSignIn }: SignInElementProps) => {
  const theme = useTheme();

  return !isUserLoggedIn(user) ? null : (
    <>
      <div className={styles.signInOption} onClick={() => setShowSignIn(true)}>
        <div className="sign-in">
          <span className="sign-in-text">{SIGN_IN}</span>
        </div>
      </div>
    <style jsx>{`
        .sign-in {
          cursor: pointer;
          margin: auto 12px auto 0px; 
          color: ${theme.palette.info.main}!important; 
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