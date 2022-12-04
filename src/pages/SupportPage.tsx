import Container from "../components/container/Container";
import {Card, Typography} from "@mui/material";

export default function SupportPage() {
  return (
    <Container>
      <Card sx={{mt: 3, mb: 2, padding: '1.5em'}}>
        <Typography>How to use it</Typography>
      </Card>
    </Container>
  )
}