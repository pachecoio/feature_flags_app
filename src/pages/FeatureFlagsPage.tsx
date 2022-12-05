import Container from "../components/container/Container";
import {useEffect, useState} from "react";
import {
  Backdrop,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress, Divider,
  Fab,
  FormControl,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Add} from "@mui/icons-material";
import {useQuery} from "react-query";
import {queryClient} from "../main";
import FeatureFlagsDatagrid from "../components/datagrid/FeatureFlagsDatagrid";
import {getFlags} from "../services/feature_flags_api";
import FeatureFlagSimulator from "../components/FeatureFlagSimulator";
import TabPanel from "../components/TabPanel";

export default function FeatureFlagsPage() {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery('flagsData', getFlags)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries("flagsData")
    }
  }, [])

  function addFlag() {
    navigate("/add")
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  if (isLoading) return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      >
      <CircularProgress color="inherit" />
    </Backdrop>
  )

  if (error) return (
    <Container>
      {/*@ts-ignore*/}
      <Typography>Error: {error.message}</Typography>
    </Container>
  )

  return (
    <>
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Feature flags" id={`flag_tabs_0}`} />
          <Tab label="Simulation" id={`flag_tabs_1}`} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <FeatureFlagsDatagrid flags={data.items} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <FeatureFlagSimulator />
      </TabPanel>
    </Container>
      <Fab sx={{
        position: "fixed",
        bottom: 50,
        right: 50,
      }} color="primary" aria-label="add" onClick={addFlag}>
        <Add />
      </Fab>
    </>
  )
}