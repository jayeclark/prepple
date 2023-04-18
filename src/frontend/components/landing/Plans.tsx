import { Button, useTheme } from "@mui/material";
import { subscriptionPlans } from "../../constants/subscriptions";
import { useState } from "react";
import CheckIcon from "../svgs/CheckIcon";
import SvgIcon from "../svgs/SvgIcon";

interface PlansProps {
  setShowSignIn: (b: boolean, s?: boolean) => void;
}

export function Plans({ setShowSignIn }: PlansProps) {

  const theme = useTheme();
  const [currentlyFocusedPlan, setCurrentlyFocusedPlan] = useState(1);

  return (
    <>
      <div className="plans-container">
        <h2 className="plans-title">
          Available Subscription Plans
        </h2>
        <div className="plans">
          <FreePlan isCurrentlyFocusedPlan={currentlyFocusedPlan === 0} setShowSignIn={setShowSignIn} />
          <BasicPlan isCurrentlyFocusedPlan={currentlyFocusedPlan === 1} setShowSignIn={setShowSignIn} />
          <PremiumPlan isCurrentlyFocusedPlan={currentlyFocusedPlan === 2} setShowSignIn={setShowSignIn} />
        </div>
      </div>
      <style jsx>{`
      .plans-container {
        background-color: ${theme.palette.primary.main};
        color: ${theme.palette.info.main};
        width: 100vw;
        padding: 2rem 0 2rem 0;
      }
      .plans-title {
        text-align: center;
      }
      p {
        margin-top: 0;
        padding-bottom: ${theme.spacing(2)};
      }
      .mobile {
        display: none
      }
      .plans {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        margin-bottom: 32px;
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
        .plans {
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

interface IndividualPlanProps {
  isCurrentlyFocusedPlan: boolean;
  setShowSignIn: (b: boolean, s?: boolean) => void;
}

function FreePlan({ isCurrentlyFocusedPlan, setShowSignIn }: IndividualPlanProps) {
  const { NAME, MONTHLY_PRICE_IN_CENTS, DESCRIPTION, FEATURES_LIST } = subscriptionPlans.Free;
  return (
    <SubscriptionPlan
      isCurrentlyFocusedPlan={isCurrentlyFocusedPlan}
      name={NAME}
      monthlyPriceInCents={MONTHLY_PRICE_IN_CENTS}
      description={DESCRIPTION}
      featuresList={FEATURES_LIST}
      setShowSignIn={setShowSignIn}
      alternateButtonText="Register For Free"
    />
  )
}

function BasicPlan({ isCurrentlyFocusedPlan, setShowSignIn }: IndividualPlanProps) {
  const { NAME, MONTHLY_PRICE_IN_CENTS, DESCRIPTION, FEATURES_LIST } = subscriptionPlans.Basic;
  return (
    <SubscriptionPlan
      isCurrentlyFocusedPlan={isCurrentlyFocusedPlan}
      name={NAME}
      monthlyPriceInCents={MONTHLY_PRICE_IN_CENTS}
      description={DESCRIPTION}
      featuresList={FEATURES_LIST}
      setShowSignIn={setShowSignIn}
    />
  )
}

function PremiumPlan({ isCurrentlyFocusedPlan, setShowSignIn }: IndividualPlanProps) {
  const { NAME, MONTHLY_PRICE_IN_CENTS, DESCRIPTION, FEATURES_LIST } = subscriptionPlans.Premium;
  return (
    <SubscriptionPlan
      isCurrentlyFocusedPlan={isCurrentlyFocusedPlan}
      name={NAME}
      monthlyPriceInCents={MONTHLY_PRICE_IN_CENTS}
      description={DESCRIPTION}
      featuresList={FEATURES_LIST}
      setShowSignIn={setShowSignIn}
    />
  )
}

interface SubscriptionPlanProps {
  isCurrentlyFocusedPlan: boolean;
  monthlyPriceInCents: number;
  name: string;
  description: string[];
  featuresList: string[];
  alternateButtonText?: string;
  setShowSignIn: (b: boolean, s?: boolean) => void;
}

function SubscriptionPlan({
  monthlyPriceInCents,
  name,
  description,
  featuresList,
  isCurrentlyFocusedPlan,
  setShowSignIn,
  alternateButtonText
}: SubscriptionPlanProps) {
  
  const cents = monthlyPriceInCents % 100;
  const dollars = (monthlyPriceInCents - cents) / 100;

  const theme = useTheme();

  return (
    <>
      <div className={isCurrentlyFocusedPlan ? "plan active" : "plan"}>
        <div className="price"><sup>$</sup>{dollars}{cents > 0 ? `.{cents}` : ""}<span style={{fontSize: "16px"}}>/month</span></div>
        <h3>{name}</h3>
        {description.map((text: string, idx: number) => (<p key={`desc-${idx}`} className="feature-description">{text}</p>))}
        <div className="features">
          <div>
          {featuresList.map((feature: string, index: number) => <div key={`feature-${index.toString()}`} className="feature"><div className="feature-checkmark"><SvgIcon height={20} width={20} fillColor={theme.palette.success.main} Icon={CheckIcon} /></div><div>{feature}</div></div>)}
          </div>
        </div>
        <div className="plan-cta">
          <Button
            onClick={() => setShowSignIn(true)}
            size="large"
            sx={{
              width: "30vw",
              maxWidth: "100%",
              borderRadius: "50px",
            }}
            variant="contained"
            color="secondary"
          >
            {alternateButtonText || "Subscribe"}
          </Button>
        </div>
      </div>
      <style jsx>{`
        .plan {
          margin: 25px;
          padding: 20px;
          width: calc(80vw/3);
          max-width: 400px;
          background-color: ${theme.palette.info.main};
          color: ${theme.palette.info.contrastText};
          border-radius: 12px;
          border: 1px solid ${theme.palette.info.main};
          text-align: center;
          box-shadow: 0 0 5px #666666;
        }

        .active {
          margin: 5px;
          padding: 40px;
          width: calc((80vw/3) + 40px);
          box-shadow: 0 0 15px #666666;
        }

        .price {
          font-size: 3rem;
          text-align: center;
          font-weight: 700;
        }

        .active > .price {
          font-size: 4rem;
        }

        sup {
          font-size: 1.5rem;
        }

        .plan-cta {
          text-align: center;
          margin-top: 12px;
          margin-bottom: 20px;
        }

        .active .plan-cta {
          margin-bottom: 0px;
        }

        .active sup {
          font-size: 2rem;
        }

        .features {
          display: flex;
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
        }
        .feature {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: left;
          text-align: left;
          padding-left: 30px;
          padding-bottom: 10px;
          font-size: 14px;
        }
        .feature-description {
          font-size: 18px;
        }
        .feature-checkmark {
          width: 35px;
          height: 25px;
          padding: 0px 10px 5px 5px;
          margin-left: -30px;
          margin-top: -2px;
        }
      `}</style>
    </>
  )
}