import styled from "styled-components";
import {Typography} from "@mui/material";

const FooterBar = styled.footer`
  grid-column: 1/3;
  grid-row: 3/4;
  display: flex;
  align-items: stretch;
  justify-content: center;
`

export default function Footer() {
  return (
    <FooterBar>
      <Typography sx={{padding: '1em 2em', fontSize: '.8em', fontStyle: 'italic'}}>
        Created by Thiago Pacheco - thiagopacheco.dev
      </Typography>
    </FooterBar>
  )
}