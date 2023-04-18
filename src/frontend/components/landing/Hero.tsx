import { Button, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface HeroProps {
  setShowSignIn: (b: boolean) => void;
}

export function Hero({ setShowSignIn }: HeroProps) {
  const router = useRouter();
  const theme = useTheme();

  const handleSetShowSignIn = useCallback(() => setShowSignIn(true), [setShowSignIn]);
  const handleNavigateToPracticePage = useCallback(() => router.push("/practice"), [router]);

  return (
    <>
      <div className="hero">
        <div className="cta">
          <h1>Ace your behavioral interviews.</h1>
          <p className="cta-details">
            Plan, practice and get feedback on your answers to video interview
            questions.
          </p>
          <div>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              sx={{ fontSize: "16px", mx: 1, mb: 1, borderRadius: "50px" }}
              onClick={handleSetShowSignIn}
            >
              Get Started
            </Button>
            <Button
              size="large"
              onClick={handleNavigateToPracticePage}
              variant="outlined"
              color="secondary"
              sx={{ fontSize: "16px", mx: 1, mb: 1, borderRadius: "50px", borderWidth: "2px", "&:hover": { borderWidth: "2px" } }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <style jsx>{`
      .cta h1 {
        margin-bottom: ${theme.spacing(1)}
        text-align: center;
      }
      p {
        margin-top: 0;
        padding-bottom: ${theme.spacing(2)};
      }
      .hero {
        margin: -20px -3rem 20px -3rem;
        position: relative;
        overflow: hidden;
        height: calc(100vh - 57px);
      }
      .cta {
        width: 100vw;
        height: calc(100vh - 57px);
        text-align: center;
        top: 0;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: ${theme.palette.info.contrastText};
      }

      @media only screen and (max-width: 700px) {
        .hero {
          margin: -20px -3rem 20px -3rem;
          position: relative;
          overflow: hidden;
          height: 100vh;
          width: 100vw;
          min-height: calc(max(264px, 100vh));
        }
        .cta {
          width: 100vw;
          padding: 25px;
          left: unset;
          right: 0;
          height: calc(100vh - 114px);
          text-align: center;
          justify-content: center;
        }
        .cta-details {
          display: inline-block;
          padding: 0px 20px;
        }
        .cta button {
          display: none;
        }
      }
      @media only screen and (max-width: 350px) {
        h1 {
          font-size: 1.6rem;
        }
      }
      `}</style>
    </>
  )
}