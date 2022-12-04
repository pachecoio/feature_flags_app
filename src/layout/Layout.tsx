import styled from "styled-components";
import React, {useContext} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import {Alert, AlertTitle} from "@mui/material";
import {AlertContext} from "../AlertProvider";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  grid-row: 2/3;
  grid-column: 2/3;
  overflow-y: scroll;
`

const LayoutWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr;
`

type Props = {
  children: JSX.Element,
}

export default function Layout({children}: Props) {
  const {alert} = useContext(AlertContext);

  return (
    <LayoutWrapper>
      <Header />
      <Sidebar/>
      <Main>
        {children}
      </Main>
      {
        alert ?
        <Alert
          severity={alert.severity}
          sx={{
            position: "absolute",
            top: 50,
            right: 20,
          }}
        >
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert> : null
      }
      <Footer />
    </LayoutWrapper>
  )
}