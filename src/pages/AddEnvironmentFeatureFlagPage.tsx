import {
  Backdrop,
  Breadcrumbs,
  CircularProgress,
  Divider,
  FormControl, MenuItem,
  Select,
  Typography
} from "@mui/material";
import Container from "../components/container/Container";
import FeatureFlag, {Rule} from "../models/FeatureFlag";
import {Card} from "../components/Card";
import {FeatureFlagForm} from "../components/forms/FeatureFlagForm";
import {useMutation, useQuery} from "react-query";
import {queryClient} from "../main";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useContext, useState} from "react";
import {AlertContextType} from "../@types/alert";
import {AlertContext} from "../AlertProvider";
import {getEnvironment, setEnvironmentFlag} from "../services/environments_api";
import {getFlags} from "../services/feature_flags_api";

export default function AddEnvironmentFeatureFlagPage() {
  const {id} = useParams();
  const navigate = useNavigate();
  // @ts-ignore
  const {setAlert} = useContext<AlertContextType>(AlertContext);
  const { isLoading, error, data } = useQuery('environmentData', () => getEnvironment(id))
  const flagsData = useQuery('flagsData', getFlags)
  const [flag, setFlag] = useState<FeatureFlag | null>(null);

  // @ts-ignore
  const mutation = useMutation(setEnvironmentFlag, {
    onSuccess: () => {
      queryClient.invalidateQueries('environmentData')
      setAlert({
        title: "Success",
        message: "Feature flag added successfully",
        severity: "success",
      })
      navigate(-1);
    },
  })

  function handleSave(featureFlag: FeatureFlag) {
    if (id) { // @ts-ignore
      mutation.mutate({
        envId: id,
        flag: {
          name: featureFlag.name,
          label: featureFlag.label,
          enabled: featureFlag.enabled,
          rules: featureFlag.rules,
        }
      })
    }
  }

  if (isLoading || flagsData.isLoading) return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      >
      <CircularProgress color="inherit" />
    </Backdrop>
  )

  if (error || flagsData.error) return <Container>
    {/*@ts-ignore*/}
    <Typography>Error: {error.message || flagsData.error.message}</Typography>
  </Container>

  return (
    <>
      <Container style={{marginTop: "1.5em", marginBottom: "1.5em"}}>
        <Breadcrumbs aria-label="breadcrumb" sx={{mt: 2.5, mb: 2, ml: 1}}>
          <Link color="inherit" to={`/environments`}>
            Environments
          </Link>
          <Link color="inherit" to={`/environments/${id}`}>
            {data.name}
          </Link>
          <Typography color="text.primary">{"Add flag"}</Typography>
        </Breadcrumbs>
        <Card sx={{mb: 2}}>
          <FormControl>
            <Typography>
              Select a feature flag
            </Typography>
            <Select
              id="flag"
              value={flag || ""}
              label="Age"
              onChange={(e) => {
                setFlag(e.target.value)
              }}
            >
              {flagsData.data.items.map((flag: FeatureFlag) => (
                <MenuItem key={flag._id.$oid} value={flag}>{flag.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Card>
        {
          flag ? (
            <Card>
              <Typography variant="h6" sx={{
                mb: 1
              }}>
                Add feature flag
              </Typography>
              <Divider sx={{
                mb: 4
              }} />
              <FeatureFlagForm featureFlag={flag} onSave={handleSave} />
            </Card>
          ) : null
        }
      </Container>
    </>
  )
}