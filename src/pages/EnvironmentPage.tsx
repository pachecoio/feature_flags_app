import {Backdrop, Breadcrumbs, Button, CircularProgress, Divider, FormControl, Typography} from "@mui/material";
import Container from "../components/container/Container";
import {Card} from "../components/Card";
import {Link, useNavigate, useParams} from "react-router-dom";
import {EnvironmentForm} from "../components/forms/EnvironmentForm";
import {useQuery} from "react-query";
import FeatureFlagsDatagrid from "../components/datagrid/FeatureFlagsDatagrid";
import {useContext} from "react";
import {AlertContextType} from "../@types/alert";
import {AlertContext} from "../AlertProvider";
import {deleteEnvironment, getEnvironment} from "../services/environments_api";

export default function EnvironmentPage() {
  let { id } = useParams();
  const { isLoading, error, data } = useQuery('environmentData', () => getEnvironment(id))
  const navigate = useNavigate();
  const {setAlert} = useContext<AlertContextType>(AlertContext);

  function handleSave() {

  }

  async function handleDelete() {
    if(!id) return
    try {
      await deleteEnvironment(id);
    } finally {
      navigate("/environments")
      setAlert({
        title: "Success",
        message: "Environment deleted successfully",
        severity: "success",
      })
    }
  }

  if (isLoading) return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      >
      <CircularProgress color="inherit" />
    </Backdrop>
  )

  if (error) return <Container>
    {/*@ts-ignore*/}
    <Typography>Error: {error.message}</Typography>
  </Container>

  return (
    <>
      <Container style={{marginTop: "1.5em", marginBottom: "1.5em"}}>
        <Breadcrumbs aria-label="breadcrumb" sx={{mt: 2.5, mb: 2, ml: 1}}>
          <Link  color="inherit" to="/environments">
            Environments
          </Link>
          <Typography color="text.primary">{data.name}</Typography>
        </Breadcrumbs>
        <Card>
          <FormControl sx={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', mb: 2}}>
            <Typography variant="h6">
              Environment {data.name}
            </Typography>
            <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
          </FormControl>
          <Divider sx={{
            mb: 4
          }} />
          <EnvironmentForm environment={data} onSave={handleSave} />
        </Card>
      </Container>
      <Container style={{marginTop: "1.5em", marginBottom: "1.5em"}}>
        <Card>
          <FormControl sx={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography>Environment flags</Typography>
            <Button variant="outlined" color="success" onClick={() => {
              navigate(`/environments/${id}/flags/add`)
            }}>Add flag</Button>
          </FormControl>
          <Divider sx={{mb: 0, mt: 2}}/>
          <FeatureFlagsDatagrid flags={data.flags || []} />
        </Card>
      </Container>
    </>
  )
}