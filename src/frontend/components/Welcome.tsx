import { Button, useTheme } from "@mui/material"
import Link from "next/link"

export default function LandingPage({ username, id }: { username: string;  id: string}) {
  const theme = useTheme();

  return (
    <>
      <div>
        <h1 className="stats-title">Welcome, {username}!</h1>
        <h4 className="mobile">My Stats</h4>
        <div className="stats">
          <div className="stat">
            <div className="stat-number">12</div>
            <h3>answers planned</h3>
            <div className="action-button">
              <Link href="/plan" passHref>
              <Button 
                size="large" 
                sx={{ width: "100%", mt: 2, borderRadius: "50px" }} 
                variant="contained"
                color="info"
              >
                Plan an Answer
                </Button>
              </Link>
            </div>
          </div>
          <div className="spacer">
            <h3>&nbsp;</h3>
          </div>
          <div className="stat">
            <div className="stat-number">5</div>
            <h3>saved videos</h3>
            <div className="action-button">
              <Link href="/practice" passHref>
                <Button size="large" sx={{ width: "100%", mt: 2, borderRadius: "50px" }} variant="contained" color="info" >Record a Video</Button>
              </Link>
            </div>
          </div>
          <div className="spacer">
            <h3>&nbsp;</h3>
          </div>
          <div className="stat">
            <div className="stat-number">6</div>
            <h3>share links created</h3>
            <div className="action-button">
              <Link href="/share" passHref>
                <Button size="large" sx={{ width: "100%", mt: 2, borderRadius: "50px" }} variant="contained" color="info" >Share a Link</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="steps-cta">
          </div>
      </div>
      <style jsx>{`
      .stat-number {
        padding: 0px 15px;
        border-radius: 80px;
        font-size: 3.5rem;
        font-weight: 500;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${theme.palette.primary.main};
      }
      .stats-title {
        text-align: center;
        margin-top: 70px;
      }
      .cta h1 {
        margin-bottom: ${theme.spacing(1)}
        text-align: left;
      }
      p {
        margin-top: 0;
        padding-bottom: ${theme.spacing(2)};
      }
      .stats {
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
      .stat {
        width: 20vw;
        height: 20vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .stat h3 {
        margin-top: 0;
        color: ${theme.palette.primary.main}
      }
      .spacer {
        width: 5vw;
        text-align: center;
      }
      .mobile {
        display: false;
      }
      @media only screen and (max-width: 700px) {
        .stats {
          margin-bottom: 0;
        }
        .stat-number {
          font-size: 2.5rem;
        }
        .stats-title {
          margin-top: 32px;
          margin-bottom: 48px;
          font-size: 1.2rem;
        }
        .stat {
          width: 100%;
          height: unset;
        }
        .stat h3 {
          text-align: center;
        }
        .action-button,
        .spacer,
        .steps-cta {
          display: none;
        }
        h4 {
          text-transform: uppercase;
          letter-spacing: 3px;
          text-align: center;
          font-weight: 400;
          color: ${theme.palette.primary.main}
        }
        .mobile {
          display: block;
        }
      }
      `}</style>
    </>
  )
}