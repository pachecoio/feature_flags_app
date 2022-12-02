import styled from "styled-components";
import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Drafts, Flag, Inbox, Pages} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";

const Aside = styled.aside`
  grid-row: 2/3;
  grid-column: 1/2;
  background-color: var(--color-dark);
  width: 14em;
`

export default function Sidebar() {
  const goTo = useNavigate();

  const navigate = (location: string) => {
    return () => {
      goTo(location)
    }
  }
  return (
    <Aside>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'var(--color-dark)' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={navigate('/')}>
              <ListItemIcon>
                <Flag />
              </ListItemIcon>
              <ListItemText primary="Feature Flags" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={navigate('/environments')}>
              <ListItemIcon>
                <Pages />
              </ListItemIcon>
              <ListItemText primary="EnvironmentsPage" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
    </Aside>
  )
}