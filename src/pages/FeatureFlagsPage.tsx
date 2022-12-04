import Container from "../components/container/Container";
import {useEffect} from "react";
import {Backdrop, Breadcrumbs, CircularProgress, Fab, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Add} from "@mui/icons-material";
import {useQuery} from "react-query";
import {queryClient} from "../main";
import FeatureFlagsDatagrid from "../components/datagrid/FeatureFlagsDatagrid";
import {getFlags} from "../services/feature_flags_api";

export default function FeatureFlagsPage() {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery('flagsData', getFlags)

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries("flagsData")
    }
  }, [])

  function addFlag() {
    navigate("/add")
  }


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
      <Breadcrumbs aria-label="breadcrumb" sx={{mt: 2.5, mb: 2, ml: 1}}>
        <Typography color="text.primary">Feature Flags</Typography>
      </Breadcrumbs>
      <div className="content">
        <FeatureFlagsDatagrid flags={data.items} />
      </div>
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