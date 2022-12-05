import {Backdrop, Button, CircularProgress, Divider, FormControl, TextField, Typography} from "@mui/material";
import {Card} from "./Card";
import FeatureFlag from "../models/FeatureFlag";
import {useContext, useState} from "react";
import {AlertContextType} from "../@types/alert";
import {AlertContext} from "../AlertProvider";
import {getFlagsFromContext} from "../services/feature_flags_api";
import Environment from "../models/Environment";
import {getEnvironmentFlagsFromContext} from "../services/environments_api";

type Props = {
  environment?: Environment
}

export default function FeatureFlagSimulator({environment}: Props) {
  const [payload, setPayload] = useState("");
  const [result, setResult] = useState([]);
  const {setAlert} = useContext<AlertContextType>(AlertContext);
  const [isLoading, setLoading] = useState(false);

  async function send() {
    try {
      setLoading(true);
      setResult([])
      const context = JSON.parse(payload);
      let res;
      if (environment) {
        res = await getEnvironmentFlagsFromContext(environment.name, context);
      } else {
        res = await getFlagsFromContext(context);
      }
      setResult(res);
    } catch (e) {
      setAlert({
        title: "Error",
        message: "Invalid JSON payload",
        severity: "error",
      })
    } finally {
      setLoading(false);
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

  return (
    <>
      <Card>
        <Typography>
          Test your {environment ? "environment" : ""} feature flags by sending a request to the API with custom context data
        </Typography>
        <Typography>
          Fill the form below and click on the "Send request" button
        </Typography>
        <Divider sx={{mt: 2, mb: 2}}/>
        <FormControl fullWidth>
         <TextField
            label="Payload JSON"
            multiline
            maxRows={20}
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            variant="filled"
            placeholder={`{"tenant": "sample_tenant"}`}
          />
        </FormControl>
        <FormControl sx={{mt: 2, display: 'flex', alignItems: 'flex-end'}}>
          <Button variant="contained" onClick={send}>
            Send
          </Button>
        </FormControl>
      </Card>
      <Card sx={{mt: 2}}>
        <Typography variant="h6">Result</Typography>
        <Divider sx={{mt: 2, mb: 2}}/>
        {
          Object.entries(result).map(([key, value]) => (
            <Typography key={key}>
              {key}: {value ? "true" : "false"}
            </Typography>
          ))
        }
      </Card>
    </>
  )
}