/* eslint-disable @next/next/no-page-custom-font */
import { useState } from "react";
import { useRouter } from "next/router"
import Head from "next/head";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import { User, UserContext } from "../scripts/context";

const Layout = (props: any) => {
  const theme = useTheme();
  const router = useRouter();
  const activePage = router.pathname;

  const [user, setuser] = useState({} as User);

  const handleSetUser = (user: any) => {
    localStorage.setItem("mdi-session-access-token", user.jwt);
    setuser(user);
  }

  const title =
    "My Dev Interview - Video interview practice app";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="true"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </Head>
      <UserContext.Provider value={{ handleSetUser, user }}>
        <Box sx={{ background: theme.palette.background.default }}>
        <header>
          <NavBar currentActivePage={activePage} />
        </header>
        <div className="padded-top">{props.children}</div>
          <Footer />
          <BottomNav  currentActivePage={activePage} />
        </Box>
      </UserContext.Provider>
      <style jsx>
            {`
              body {
                background-color: ${theme.palette.common.black}
                color: ${theme.palette.common.white}
              }
              h5 {
                color: #000;
                padding-top: 11px;
              }
              .padded-top {
                padding-top: 57px;
              }
            `}
        </style>
    </>
  );
};

export default Layout;