import {
  Accordion, AccordionDetails, AccordionSummary,
  Backdrop, Box,
  Breadcrumbs,
  Button,
  CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Divider,
  FormControl, Tab, Tabs,
  Typography
} from "@mui/material";
import Container from "../components/container/Container";
import {Card} from "../components/Card";
import {Link, useNavigate, useParams} from "react-router-dom";
import {EnvironmentForm} from "../components/forms/EnvironmentForm";
import {useMutation, useQuery} from "react-query";
import FeatureFlagsDatagrid from "../components/datagrid/FeatureFlagsDatagrid";
import {useContext, useState} from "react";
import {AlertContextType} from "../@types/alert";
import {AlertContext} from "../AlertProvider";
import {
  deleteEnvironment,
  deleteEnvironmentFlag,
  getEnvironment,
  setEnvironmentFlag
} from "../services/environments_api";
import {Create, DeleteForever, ExpandMore} from "@mui/icons-material";
import {FeatureFlagForm} from "../components/forms/FeatureFlagForm";
import {queryClient} from "../main";
import FeatureFlag from "../models/FeatureFlag";
import FeatureFlagSimulator from "../components/FeatureFlagSimulator";
import TabPanel from "../components/TabPanel";

export default function EnvironmentPage() {
  let { id } = useParams();
  const { isLoading, error, data, refetch } = useQuery('environmentData', () => getEnvironment(id))
  const navigate = useNavigate();
  const {setAlert} = useContext<AlertContextType>(AlertContext);
  const [currentFlag, setCurrentFlag] = useState(null);
  const [open, setOpen] = useState(false);
  const [flagToDelete, setFlagToDelete] = useState(null);
  const [tab, setTab] = useState(0)

  function handleSave() {

  }

  // @ts-ignore
  const mutation = useMutation(setEnvironmentFlag, {
    onSuccess: () => {
      queryClient.invalidateQueries('environmentData')
      setAlert({
        title: "Success",
        message: "Feature flag updated successfully",
        severity: "success",
      })
      setCurrentFlag(null)
    },
  })

  function setFlag(featureFlag: FeatureFlag) {
    if (id) { // @ts-ignore
      mutation.mutate({
        envId: id,
        // @ts-ignore
        flag: featureFlag
      })
    }
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

  function handleOpenDialog() {
    setOpen(true)
  }

  function handleCloseDialog() {
    setOpen(false)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  async function handleDeleteFlag() {
    if(!id) return
    try {
      await deleteEnvironmentFlag({
        envId: id,
        // @ts-ignore
        flagName: flagToDelete
      });
    } finally {
      setAlert({
        title: "Success",
        message: "Environment flag deleted successfully",
        severity: "success",
      })
      refetch()
      setFlagToDelete(null)
    }
  }

  function handleOpenFlagDialog(flagName: string) {
    // @ts-ignore
    setFlagToDelete(flagName)
  }
  function handleCloseFlagDialog() {
    setFlagToDelete(null)
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Details" id={`flag_tabs_0}`} />
            <Tab label="Simulation" id={`flag_tabs_1}`} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <Container>
            <Card>
              <FormControl sx={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', mb: 2}}>
                <Typography variant="h6">
                  Environment {data.name}
                </Typography>
                <Button variant="outlined" color="error" onClick={handleOpenDialog}>Delete</Button>
              </FormControl>
              <Divider sx={{
                mb: 4
              }} />
              <EnvironmentForm environment={data} onSave={handleSave} />
            </Card>
            <Card sx={{mt: 2}}>
              <FormControl sx={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography>Environment flags</Typography>
                <Button variant="outlined" color="success" onClick={() => {
                  navigate(`/environments/${id}/flags/add`)
                }}>Add flag</Button>
              </FormControl>
              <Divider sx={{mb: 0, mt: 2}}/>
              {
                // @ts-ignore
                data.flags ? data.flags.map((flag, index) => (
                  <Accordion key={flag.name} expanded={currentFlag === index} onChange={() => {}}>
                     <AccordionSummary
                       expandIcon={<Create />}
                       onClick={() => {
                         setCurrentFlag(currentFlag !== index ? index : null)
                       }}
                     >
                       <Typography sx={{ width: '33%', flexShrink: 0 }}>
                         {flag.name}
                       </Typography>
                       <Typography sx={{ color: 'text.secondary', flex: 1 }}>
                         {flag.label}
                       </Typography>
                       <Button color="error" sx={{mr: 4}} onClick={() => handleOpenFlagDialog(flag.name)}>
                         <DeleteForever />
                       </Button>
                     </AccordionSummary>
                     <AccordionDetails>
                       <FeatureFlagForm featureFlag={flag} onSave={setFlag} />
                     </AccordionDetails>
                   </Accordion>
                )) : (
                  <Typography>No flags</Typography>
                )
              }
            </Card>
          </Container>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <FeatureFlagSimulator environment={data} />
        </TabPanel>
      </Container>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete environment?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete forever
          </Button>
        </DialogActions>
      </Dialog>

      {/*Delete environment flag dialog*/}
      <Dialog
        open={!!flagToDelete}
        onClose={handleCloseFlagDialog}
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete environment flag?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFlagDialog}>Cancel</Button>
          <Button onClick={handleDeleteFlag} autoFocus>
            Delete forever
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}