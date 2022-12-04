import {Breadcrumbs, Divider, Link, Typography} from "@mui/material";
import Container from "../components/container/Container";
import {Card} from "../components/Card";
import {useMutation} from "react-query";
import {queryClient} from "../main";
import {useNavigate} from "react-router-dom";
import {createEnvironment} from "../services/environments_api";
import Environment from "../models/Environment";
import {EnvironmentForm} from "../components/forms/EnvironmentForm";

export default function AddEnvironmentPage() {
  const navigate = useNavigate();

  const mutation = useMutation(createEnvironment, {
    onSuccess: () => {
      queryClient.invalidateQueries('environmentsData')
      navigate("/");
    },
  })

  function handleSave(env: Environment) {
    mutation.mutate(env)
  }

  return (
    <>
      <Container style={{marginTop: "1.5em", marginBottom: "1.5em"}}>
        <Breadcrumbs aria-label="breadcrumb" sx={{mt: 2.5, mb: 2, ml: 1}}>
          <Link underline="hover" color="inherit" href="/">
            Environments
          </Link>
          <Typography color="text.primary">{"Add environment"}</Typography>
        </Breadcrumbs>
        <Card>
          <Typography variant="h6" sx={{
            mb: 1
          }}>
            Add Environment
          </Typography>
          <Divider sx={{
            mb: 4
          }} />
          <EnvironmentForm onSave={handleSave} />
        </Card>

      </Container>
    </>
  )
}