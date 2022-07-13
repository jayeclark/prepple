import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, useTheme } from "@mui/material";
import hero from "../assets/interview.jpg";
import arrow from "../assets/arrow-right-short.svg";
import video from "../assets/video.png";
import SignInForm from "./SignInForm";

const plan = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
    />
  </svg>
);

const record = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"
    />
  </svg>
);

const share = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
  </svg>
);

export default function LandingPage() {
  const theme = useTheme();
  const router = useRouter();

  const [showSignIn, setShowSignIn] = useState(false);
  const handleShowSignin = (bool: boolean) => {
    setShowSignIn(bool);
  };

  return (
    <>
      <div className="hero">
        <div className="hero-img">
          <Image
            width="1100"
            height="600"
            layout="responsive"
            src={hero}
            alt="video interview"
          />
        </div>
        <div className="landing"></div>
        <div className="cta">
          <h1>Ace the virtual interview</h1>
          <p className="cta-details">
            Plan, practice and get feedback on your answers to video interview
            questions.
          </p>
          <div>
            <Button
              size="large"
              variant="contained"
              color="info"
              sx={{ mx: 1, mb: 1, borderRadius: "50px" }}
              onClick={() => setShowSignIn(true)}
            >
              Get Started
            </Button>
            <Button
              size="large"
              onClick={() => router.push("/practice")}
              variant="outlined"
              color="info"
              sx={{ mx: 1, mb: 1, borderRadius: "50px" }}
            >
              Try it Out
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="steps-title">
          How <span className="desktop">MyDevInterview</span>
          <span className="mobile">it</span> Works
        </h1>
        <div className="steps">
          <div className="step">
            <div className="icon">{plan}</div>
            <h3>Plan answers</h3>
          </div>
          <div className="arrow">
            <Image src={arrow} width={40} height={40} alt="right arrow" />
            <h3>
              &nbsp;
              <span className="mobile">
                <br />
                &nbsp;
              </span>
            </h3>
          </div>
          <div className="step">
            <div className="icon">{record}</div>
            <h3>Record videos</h3>
          </div>
          <div className="arrow">
            <Image src={arrow} width={40} height={40} alt="right arrow" />
            <h3>
              &nbsp;
              <span className="mobile">
                <br />
                &nbsp;
              </span>
            </h3>
          </div>
          <div className="step">
            <div className="icon">{share}</div>
            <h3>Share for feedback</h3>
          </div>
        </div>
        <div className="steps-cta">
          <Button
            onClick={() => setShowSignIn(true)}
            size="large"
            sx={{
              width: "30vw",
              minWidth: "280px",
              borderRadius: "50px",
            }}
            variant="contained"
            color="primary"
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="features">
        <div>
          <Image src={video} alt="video call" width={540} height={360} />
        </div>
        <div className="features-text">
          <h2>Features</h2>
          <div className="features-list">
            <ul>
              <li>Search &amp; filter hundreds of questions</li>
              <li>Plan STAR, CARL &amp; SOAR responses</li>
              <li>Practice, rate and save video responses</li>
              <li>Share responses with friends and mentors</li>
              <li>
                <span className="desktop">Use social feedback to</span>
                <span className="mobile">Get feedback &amp;</span> improve your
                performance
              </li>
            </ul>
          </div>
        </div>
      </div>
      <SignInForm
        signUpMode={true}
        showSignIn={showSignIn}
        setShowSignIn={handleShowSignin}
      />
      <style jsx>{`
      .icon {
        box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
        padding: 25px 25px 22px 25px;
        border-radius: 80px;
        background-color: #fff;
        width: 100px;
        height: 100px;
        color: ${theme.palette.primary.main};
      }
      .steps-title {
        text-align: center;
      }
      .cta h1 {
        margin-bottom: ${theme.spacing(1)}
        text-align: left;
      }
      p {
        margin-top: 0;
        padding-bottom: ${theme.spacing(2)};
      }
      .hero {
        margin: -20px -3rem 20px -3rem;
        position: relative;
        overflow: hidden;
        height: 60vw;
      }
      .hero-img {
        height: 60vw;
        width: 100vw;
      }
      .landing {
        position: absolute;
        width: 75vw;
        height: 75vw;
        border-radius: 50vw;
        top: -25vw;
        left: -15vw;
        background-color: ${theme.palette.primary.main}
      }
      .mobile {
        display: none
      }
      .cta {
        position: absolute;
        top: 0;
        padding: 40px;
        height: 45vw;
        width: 55vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
      }
      .steps {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        margin-bottom: 32px;
      }
      .steps-cta {
        text-align: center;
        margin-bottom: 48px;
      }
      .step {
        width: 20vw;
        height: 20vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .arrow {
        width: 5vw;
        text-align: center;
      }
      .features {
        background-color: ${theme.palette.primary.main};
        width: 100vw;
        text-align: center;
        padding: 40px 40px 40px 0px;
        color: #fff;
        display: flex;
        justify-content: stretch;
        align-items: center;
      }
      .features div {
        flex-grow: 1;
        flex-shrink: 1;
        max-width: 100vw;
        text-align: left;
      }
      .features-list {
        width: max-content;
      }
      .features-list ul {
        padding-left: 16px;
      }
      .features-list li {
        padding-bottom: 8px;
      }

      @media only screen and (max-width: 700px) {
        .hero {
          margin: -20px -3rem 20px -3rem;
          position: relative;
          overflow: hidden;
          height: 54vw;
          min-height: calc(max(264px, 54vw));
          width: 100vw;
        }
        .hero-img {
          position: relative;
          overflow-x: hidden;
          height: 54vw;
          width: 100vw;
          left: unset;
          right: 0px;
          margin: 0;
          min-height: 264px;
          min-width: 484px;
          filter: color()
        }
        .landing {
          border-radius: 0;
          left: unset;
          top: unset;
          top: 0px;
          width: 100vw;
          opacity: 0.85;
          height: 54vw;
          min-height: 264px;
          overflow-x: hidden;
        }
        .cta {
          width: 100vw;
          padding: 25px;
          left: unset;
          right: 0;
          height: 60vw;
          min-height: 264px;
          text-align: center;
        }
        .cta-details {
          display: inline-block;
          padding: 0px 20px;
        }
        .cta button {
          display: none;
        }
        .mobile {
          display: unset;
        }
        .desktop {
          display: none;
        }
        .steps {
          min-height: 200px;
          height: max-content;
          margin-bottom: 0;
        }
        .step {
          width: 20vw;
          height: fit-content;
        }
        .arrow {
          width: 12vw;
          height: 100%;
        }
        .steps h3 {
          font-weight: 500;
          font-size: 1.15rem;
          text-align: center;
        }

        .icon {
          box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
          padding: 20px 20px 18px 20px;
          border-radius: 80px;
          background-color: #fff;
          width: 20vw;
          height: 20vw;
          color: ${theme.palette.primary.main};
        }
        .features {
          flex-wrap: wrap;
          padding: 20px;
          width: 100vw;
          text-align: center;
        }
        .features-text {
          width: calc(100vw - 40px);
          max-width: calc(100vw - 40px);
        }
        .features-text h2 {
          text-align: center;
        }
        .features div {
          flex-grow: 0;
          flex-shrink: 1;
        }
        .features-list {
          width: 100%;
          text-align: center;
        }
        .features-list ul {
          padding-left: 0;
        }
        .features-list li {
          display: inline-block;
          width: 100%;
          max-width: 100%;
          text-align: center;
          padding-bottom: 16px;
          font-weight: 300;
          font-size: 0.9rem;
        }
      }
      @media only screen and (max-width: 350px) {
        h1 {
          font-size: 1.6rem;
        }
      }
      `}</style>
    </>
  );
}
