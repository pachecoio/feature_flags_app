import styled from "styled-components";
import {Avatar, Box, Typography} from "@mui/material";

const HeaderBar = styled.header`
  background-color: var(--color-dark);
  padding: 1em 2em;
  grid-row: 1/2;
  grid-column: 1/3;
`
export default function Header() {
  return (
    <HeaderBar>
      <Box sx={{display: 'flex'}}>
        <Typography sx={{flex: 1}} variant="h4">FF</Typography>
        <Avatar>TP</Avatar>
      </Box>
    </HeaderBar>
  )
}