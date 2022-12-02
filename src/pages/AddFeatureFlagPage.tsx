import {Breadcrumbs, Divider, Link, Typography} from "@mui/material";
import Container from "../components/container/Container";
import FeatureFlag from "../models/FeatureFlag";
import {Card} from "../components/Card";
import {FeatureFlagForm} from "../components/forms/FeatureFlagForm";

export default function AddFeatureFlagPage() {
  function handleSave(featureFlag: FeatureFlag) {
    console.log('save flag', featureFlag)
  }

  return (
    <>
      <Container style={{marginTop: "1.5em", marginBottom: "1.5em"}}>
        <Breadcrumbs aria-label="breadcrumb" sx={{mt: 2.5, mb: 2, ml: 1}}>
          <Link underline="hover" color="inherit" href="/">
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