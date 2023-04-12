import { useTheme } from "@mui/material";
import styles from "../../styles/Nav.module.css";

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

  return user.jwt !== '' ? null : (
    <>
      <div className={`${styles.navItem} ${styles.signInOption}`} onClick={() => setShowSignIn(true)}>
      <div className="sign-in">
        <span className="sign-in-text">Sign in</span>
      </div>
    </div>
    <style jsx>{`
        .sign-in {
          cursor: pointer;
          margin: auto 0px; 
          color: ${theme.palette.info.main}!important; 
          border: 1.5px solid ${theme.palette.info.main};
          padding: 5px 12px; 
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
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