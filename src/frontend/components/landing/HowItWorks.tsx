import { Button, useTheme } from "@mui/material";
import { APP_NAME } from "../../constants/app";
import ArrowIcon from "../svgs/ArrowIcon";
import SvgIcon from "../svgs/SvgIcon";
import { useCallback } from "react";

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

interface HowItWorksProps {
  setShowSignIn: (b: boolean) => void;
}

export function HowItWorks({ setShowSignIn }: HowItWorksProps) {

  const theme = useTheme();
  const handleSetShowSignin = useCallback(() => setShowSignIn(true), [setShowSignIn]);

  return (
    <>
      <div className="steps-container">
        <h2 className="steps-title">
          How <span className="desktop-only">{APP_NAME}</span>
          <span className="mobile-only">it</span> Works
        </h2>
        <div className="steps">
          <Step
            title="Plan answers"
            icon={plan}
            iconColor={theme.palette.secondary.main}
            details="Details go here."
          />
          <Arrow />
          <Step
            title="Record videos"
            icon={record}
            iconColor={theme.palette.secondary.main}
            details="Details go here."
          />
          <Arrow />
          <Step
            title="Share for feedback"
            icon={share}
            iconColor={theme.palette.secondary.main}
            details="Details go here."
          />
        </div>
        <div className="steps-cta">
          <Button
            onClick={handleSetShowSignin}
            size="large"
            sx={{
              width: "30vw",
              minWidth: "280px",
              borderRadius: "50px",
            }}
            variant="contained"
            color="secondary"
          >
            Get Started
          </Button>
        </div>
      </div>
      <style jsx>{`
      .steps-container {
        background-color: ${theme.palette.primary.main};
        color: ${theme.palette.info.main};
        width: 100vw;
        padding: 2rem 0 2rem 0;
      }
      .steps-title {
        text-align: center;
      }
      p {
        margin-top: 0;
        padding-bottom: ${theme.spacing(2)};
      }
      .mobile {
        display: none
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
      .arrow {
        width: 5vw;
        text-align: center;
      }

      @media only screen and (max-width: 700px) {
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
        .arrow {
          width: 12vw;
          height: 100%;
        }
        .steps h3 {
          font-weight: 500;
          font-size: 1.15rem;
          text-align: center;
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

interface StepProps {
  title: string;
  icon: any;
  details: string;
  iconColor: string;
}

function Step({ icon, iconColor, title, details }: StepProps) {
  const theme = useTheme();

  return (
    <>
      <div className="step">
        <div className="icon">{icon}</div>
        <h3>{title}</h3>
        <div className="step-details">{details}</div>
      </div>
      <style jsx>{`
      p {
        margin-top: 0;
        padding-bottom: ${theme.spacing(2)};
      }
      .step {
        width: 80vw;
        height: 20vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .step-details {
        font-size: 14px;
      }
      .icon {
        box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
        padding: 25px 25px 22px 25px;
        border-radius: 80px;
        background-color: #fff;
        width: 100px;
        height: 100px;
        color: ${iconColor};
      }
      @media only screen and (max-width: 700px) {
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
      }
      `}</style>
      </>
  )
}

function Arrow() {
  const theme = useTheme();
  
  return (
    <>
      <div className="arrow">
        <div>
          <SvgIcon
            fillColor={theme.palette.info.main}
            width={40}
            height={40}
            Icon={ArrowIcon}
          />
          <h3>
          &nbsp;
            <span className="mobile-only">
              <br />
              &nbsp;
            </span>
          </h3>
        </div>
      </div>
      <style jsx>{`
      .arrow {
        width: 5vw;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      @media only screen and (max-width: 700px) {
        .arrow {
          width: 12vw;
          height: 100%;
        }
      }
      `}
      </style>
    </>
  )
}