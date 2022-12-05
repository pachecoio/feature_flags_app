import Container from "../components/container/Container";
import {
  Backdrop, Box,
  Breadcrumbs, Button, CircularProgress,
  Divider, FormControl, Tab, Tabs, TextareaAutosize,
  Typography
} from "@mui/material";
import FeatureFlag from "../models/FeatureFlag";
import {Card} from "../components/Card";
import {FeatureFlagForm} from "../components/forms/FeatureFlagForm";
import {useMutation, useQuery} from "react-query";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {queryClient} from "../main";
import {deleteFlag, getFlag, updateFlag} from "../services/feature_flags_api";
import {AlertContextType} from "../@types/alert";
import {AlertContext} from "../AlertProvider";
import FeatureFlagSimulator from "../components/FeatureFlagSimulator";

export default function FeatureFlagPage() {
  let { id } = useParams();
  // @ts-ignore
  const { isLoading, error, data, status } = useQuery('fetch_flag', () => getFlag(id))
  const navigate = useNavigate();
  const {setAlert} = useContext<AlertContextType>(AlertContext);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries("fetch_flag")
    }
  }, [])

  const mutation = useMutation(updateFlag, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetch_flag')
      queryClient.invalidateQueries('flagsData')
      navigate("/");
    },
  })

  function handleSave(featureFlag: FeatureFlag) {
    console.log('update flag', featureFlag)
    // Include expected oid for Be
    // @ts-ignore
    featureFlag._id = {
      $oid: id
    }
    mutation.mutate(featureFlag)
  }

  async function handleDelete() {
    if(!id) return
    try {
      await deleteFlag(id);
    } finally {
      navigate("/")
      setAlert({
        title: "Success",
        message: "Feature flag deleted successfully",
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

  if (status === 'error') return (
    <Container>
      {/*@ts-ignore*/}
      <Typography>Error: {error.message}</Typography>
    </Container>
  )

  if (data.error) navigate("/")

  return (
    <Container style={{marginTop: "1.5em", marginBottom: "1.5em"}}>
      <Breadcrumbs aria-label="breadcrumb" sx={{mb: 2, ml: 1}}>
        <Link color="inherit" to="/">
          Feature Flags
        </Link>
        <Typography color="text.primary">{!!data.name ? data.name : "Add flag"}</Typography>
      </Breadcrumbs>
      <Card>
        <FormControl sx={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', mb: 1}}>
          <Typography>
            {!!data.name ? "Edit feature flag " + data.name : "Add feature flag"}
          </Typography>
          <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
        </FormControl>
        <Divider sx={{
            mb: 4
          }} />
        <FeatureFlagForm featureFlag={data} onSave={handleSave} />
      </Card>
    </Container>
  )
}
