import Image from "next/image";
import video from "../../assets/video.png";
import { useTheme } from "@mui/material";

export function Features() {
  const theme = useTheme();

  return (
    <>
      <div className="features">
        <div className="features-image">
          <div>
            <Image src={video} alt="video call" width={540} height={360} />
          </div>
        </div>
        <div className="features-text">
          <h2>Features</h2>
          <div className="features-list">
            <ul>
              <li>Search &amp; filter hundreds of questions</li>
              <li>Plan STAR, CARL &amp; SOAR responses to behavioral interview questions</li>
              <li>Practice, rate and save video responses</li>
              <li>Define goals and track progress over time</li>
              <li>Share responses with friends and mentors</li>
              <li>
                <span className="desktop-only">Use human & AI feedback to</span>
                <span className="mobile-only">Get feedback &amp;</span> improve your
                performance
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
      .features {
        background-color: ${theme.palette.info.main};
        width: 100vw;
        text-align: center;
        padding: 40px 40px 40px 0px;
        color: ${theme.palette.info.contrastText};
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
      .features-image {
        display: flex;
        width: fit-content;
        justify-content: right;
      }
      .features-text {
          width: fit-content;
          max-width: calc(100vw - 540px);
        }
      .features-list {
        max-width: calc(100vw - 540px);
      }
      .features-list ul {
        padding-left: 16px;
      }
      .features-list li {
        padding-bottom: 8px;
        font-size: 14px;
      }

      @media only screen and (max-width: 700px) {
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
      `}</style>
    </>
  )
}