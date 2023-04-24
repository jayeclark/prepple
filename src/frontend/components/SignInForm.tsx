import { useState, useContext, useEffect, useMemo, useRef, MutableRefObject } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import axios from 'axios'
import { useTheme } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Google from "../assets/google.svg"
import Github from "../assets/github.png"
import EyeFill from "../assets/eye-fill.svg"
import EyeFillSlash from "../assets/eye-slash-fill.svg"
import Close from "../assets/x-lg.svg"
import { API_URL } from "../constants/app"
import { authorizationUrl } from "../scripts/config"
import { UserContext } from "../scripts/context"

interface SignInFormProps {
  showSignIn: boolean;
  setShowSignIn: Function;
  signUpMode?: boolean;
}

function SignInForm({ showSignIn, setShowSignIn, signUpMode }: SignInFormProps) {
  const { handleSetUser, user } = useContext(UserContext);
  const router = useRouter();
  const theme = useTheme();

  if (typeof signUpMode == "undefined") {
    signUpMode = false;
  }

  const [ signup, setSignup ] = useState(signUpMode);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showConfirm, setShowConfirm ] = useState(false);
  const [showGoogle, setShowGoogle] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const createUser = async ({ email, password }: { email: string; password: string}) => {
    if (typeof window === "undefined") {
      return;
    }
    const url = `${API_URL}/api/auth/local/register`
    const body = {
      username: email, 
      email: email,
      password: password
    }
    try {
        await axios.post(url, body).then(response => {
          handleSetUser({
            email: response.data.user.email,
            jwt: response.data.jwt,
            username: response.data.user.username,
            id: response.data.user.id
          })
          setShowSignIn(false);
          setSignup(false);
        })
      } catch (e) {
        setSubmitError("An unexpected error occurred. Please try again later.")
      
      }
    }
  
  const authUser = async ({ email, password }: { email: string; password: string}) => {
    if (typeof window === "undefined") {
      return;
    }
    const url = `${API_URL}/api/auth/local`
    const body = {
      identifier: email, 
      password: password
    }
    await axios.post(url, body).then(response => {
        if (response.status == 200) {
          handleSetUser({
            email: response.data.user.email,
            jwt: response.data.jwt,
            username: response.data.user.username,
            id: response.data.user.id
          })
          setShowSignIn(false);
          setSignup(false);
        } 
        if (response.status === 400) {
            setSubmitError("Incorrect username or password.")
        } 
      }).catch((_: Error) => {
          setSubmitError("An unexpected error occurred. Please try again later.")
    })
  }

  const redirectToGoogle = () => {
    if (window) {
      window.location = `${API_URL}/api/connect/google` as unknown as Location
    }
  }

  const redirectToGitHub = () => {
    if (window) {
      window.location = `${API_URL}/api/connect/github` as unknown as Location
    }
  }

  const retrieveUserData = async () => {
    const jwt = localStorage.getItem("mdi-session-access-token")
    if (jwt) {
      try {
        const response = await axios.get(`${API_URL}/api/users/me`, { headers: { Authorization: `Bearer ${jwt}`}})
        const data = await response.data
        handleSetUser({
          email: data.email,
          jwt: jwt,
          username: data.username,
          id: data.id
        })
        setShowGoogle(false)
        setShowSignIn(false)
      } catch (e) {
        console.warn(e);
      }
    }
  }

  useEffect(() => { if (!user.id) { retrieveUserData() } }, [user])

  return (
    <>
      <Dialog open={showSignIn} sx={{ maxWidth: "calc(100vw - 64px" }}>
        <Box sx={{ p: 2, maxWidth: "calc(100vw - 64px)" }} >
          <div className="close-icon" onClick={() => { setShowSignIn(false); }}>
            <Image src={Close} alt="close sign in dialog" />
          </div>
          <Button variant="google" size="large" sx={{ mb: 2, width: "100%" }} onClick={() => { setSubmitError(""), redirectToGoogle() }}>
            <Image height="24" width="24" src={Google} alt="Google Logo"/>&nbsp;&nbsp;
            <span>Sign in with Google</span>
          </Button>
          <Button variant="github" size="large" sx={{ mb: 2, width: "100%" }} onClick={() => { setSubmitError(""), redirectToGitHub() }}>
            <Image height="24" width="24" src={Github} alt="GitHub Logo" />&nbsp;&nbsp;
            <span>Sign in with GitHub</span>
          </Button>
          <hr />
          <form onSubmit={(e) => {
            e.preventDefault();
            if (signup) {
              const form = e.target as HTMLFormElement;
              createUser({ email: form.email.value, password: form.password.value })
            } else {
              const form = e.target as HTMLFormElement;
              authUser({ email: form.email.value, password: form.password.value })
            }

          }}>
            <TextField
              id="email"
              autoComplete="email"
              type="text"
              label="Email"
              name="email"
              fullWidth
              sx={{ mb: 2 }}
              onChange={() => setSubmitError('')}
            />
            <div className="relative">
              <TextField
                id="password"
                autoComplete="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                fullWidth
                sx={{ mb: 2 }}
                onChange={() => setSubmitError('')} />
              <div className="show-pass" onClick={() => setShowPassword(!showPassword)}>
                <Image src={showPassword ? EyeFillSlash : EyeFill} alt={showPassword ? "Hide Password" : "Show Password"}/>
              </div>
            </div>
            {signup && (
              <div className="relative">
                <TextField
                  id="password2"
                  autoComplete=""
                  type={showConfirm ? "text" : "password"}
                  label="Confirm Password"
                  name="password2"
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={() => setSubmitError('')}
                />
                <div className="show-pass" onClick={() => setShowConfirm(!showConfirm)}>
                  <Image src={showConfirm ? EyeFillSlash : EyeFill} alt={showPassword ? "Hide Password Confirmation" : "Show Password Confirmation"}/>
                </div>
              </div>
            )}
            <div className="error-msg">{submitError ? submitError : "" }&nbsp;</div>
            <Button variant="contained" size="large" sx={{ width: '100%', mb: 2 }} type="submit">
              {signup ? "Sign Up with Email" : "Sign In with Email"}
            </Button>
            {!signup && (
              <div>Need an account? <span onClick={() => setSignup(true)} className="link-style">Register here</span></div>
            )}
            {signup && (
              <div>Already have an account? <span onClick={() => setSignup(false)} className="link-style">Sign in here</span></div>
            )}
            </form>
        </Box>
      </Dialog>
      <style jsx>{`
      .dialog-window: {
        max-width: calc(100vw - 64px)!important;
      }
      form {
        margin-top: 24px;
      }
      .close-icon {
        padding-bottom: 16px;
        cursor: pointer;
        text-align: right;
      }
      .relative {
        position: relative;
      }
      .show-pass {
        position: absolute; 
        top: 20px;
        right: 16px;
        cursor: pointer; 
        opacity: 0.5;
      }
      .error-msg {
        color: red;
        font-size: 0.75rem;
        margin-top: ${theme.spacing(-1)};
        margin-bottom: ${theme.spacing(1)};
      }
      .link-style {
        color: ${theme.palette.primary.main};
        cursor: pointer;
      }
      `}</style>
    </>
  )
}

export default SignInForm