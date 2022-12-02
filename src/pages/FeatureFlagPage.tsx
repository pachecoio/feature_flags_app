import Container from "../components/container/Container";
import {
  Breadcrumbs,
  Divider,
  Link,
  Typography
} from "@mui/material";
import {useState} from "react";
import FeatureFlag from "../models/FeatureFlag";
import {Card} from "../components/Card";
import {FeatureFlagForm} from "../components/forms/FeatureFlagForm";

export default function FeatureFlagPage() {
  const [flag, setFlag] = useState<FeatureFlag>(
    new FeatureFlag(
      "",
      "sample_flag",
      "Sample Flag",
      false
    )
  );

  function handleSave(featureFlag: FeatureFlag) {
    console.log('save flag', featureFlag)
  }

  return (
    <Container style={{marginTop: "1.5em", marginBottom: "1.5em"}}>
      <Breadcrumbs aria-label="breadcrumb" sx={{mb: 2, ml: 1}}>
        <Link underline="hover" color="inherit" href="/">
          Feature Flags
        </Link>
        <Typography color="text.primary">{!!flag.name ? flag.name : "Add flag"}</Typography>
      </Breadcrumbs>
      <Card>
        <Typography variant="h6" sx={{
          mb: 1
        }}>
          {!!flag.name ? "Edit feature flag " + flag.name : "Add feature flag"}
        </Typography>
        <Divider sx={{
          mb: 4
        }} />
        <FeatureFlagForm featureFlag={flag} onSave={handleSave} />
      </Card>
    </Container>
  )
}
