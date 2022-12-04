import {Breadcrumbs, Divider, Typography} from "@mui/material";
import Container from "../components/container/Container";
import FeatureFlag from "../models/FeatureFlag";
import {Card} from "../components/Card";
import {FeatureFlagForm} from "../components/forms/FeatureFlagForm";
import {useMutation} from "react-query";
import {queryClient} from "../main";
import {Link, useNavigate} from "react-router-dom";
import {createFlag} from "../services/feature_flags_api";
import {useContext} from "react";
import {AlertContextType} from "../@types/alert";
import {AlertContext} from "../AlertProvider";

export default function AddFeatureFlagPage() {
  const navigate = useNavigate();
  // @ts-ignore
  const {setAlert} = useContext<AlertContextType>(AlertContext);

  const mutation = useMutation(createFlag, {
    onSuccess: () => {
      queryClient.invalidateQueries('flagsData')
      setAlert({
        title: "Success",
        message: "Feature flag created successfully",
        severity: "success",
      })
      navigate("/");
    },
  })

  function handleSave(featureFlag: FeatureFlag) {
    mutation.mutate(featureFlag)
  }

  return (
    <>
      <Container style={{marginTop: "1.5em", marginBottom: "1.5em"}}>
        <Breadcrumbs aria-label="breadcrumb" sx={{mt: 2.5, mb: 2, ml: 1}}>
          <Link color="inherit" to="/">
            Feature Flags
          </Link>
          <Typography color="text.primary">{"Add flag"}</Typography>
        </Breadcrumbs>
        <Card>
          <Typography variant="h6" sx={{
            mb: 1
          }}>
            Add feature flag
          </Typography>
          <Divider sx={{
            mb: 4
          }} />
          <FeatureFlagForm onSave={handleSave} />
        </Card>
      </Container>
    </>
  )
}