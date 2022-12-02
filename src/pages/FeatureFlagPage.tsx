import Container from "../components/container/Container";
import {
  Breadcrumbs,
  Divider,
  Link,
  Typography
} from "@mui/material";
import FeatureFlag from "../models/FeatureFlag";
import {Card} from "../components/Card";
import {FeatureFlagForm} from "../components/forms/FeatureFlagForm";
import {useMutation, useQuery} from "react-query";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {queryClient} from "../main";
import {getFlag, updateFlag} from "../services/feature_flags_api";


export default function FeatureFlagPage() {
  let { id } = useParams();
  // @ts-ignore
  const { isLoading, error, data } = useQuery('fetch_flag', () => getFlag(id))
  const navigate = useNavigate();

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

  if (isLoading) return (
    <Container>
      <Typography>Loading...</Typography>
    </Container>
  )

  if (error) return (
    <Container>
      {/*@ts-ignore*/}
      <Typography>Error: {error.message}</Typography>
    </Container>
  )

  console.log('current flag', data)

  return (
    <Container style={{marginTop: "1.5em", marginBottom: "1.5em"}}>
      <Breadcrumbs aria-label="breadcrumb" sx={{mb: 2, ml: 1}}>
        <Link underline="hover" color="inherit" href="/">
          Feature Flags
        </Link>
        <Typography color="text.primary">{!!data.name ? data.name : "Add flag"}</Typography>
      </Breadcrumbs>
      <Card>
        <Typography variant="h6" sx={{
          mb: 1
        }}>
          {!!data.name ? "Edit feature flag " + data.name : "Add feature flag"}
        </Typography>
        <Divider sx={{
          mb: 4
        }} />
        <FeatureFlagForm featureFlag={data} onSave={handleSave} />
      </Card>
    </Container>
  )
}
