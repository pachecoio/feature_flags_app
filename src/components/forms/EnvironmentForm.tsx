import {useEffect, useState} from "react";
import FeatureFlag, {Rule} from "../../models/FeatureFlag";
import {useNavigate} from "react-router-dom";
import Container from "../container/Container";
import {
  Autocomplete,
  Box,
  Button, Chip,
  createFilterOptions,
  Divider,
  FormControl, IconButton, InputLabel, MenuItem, Select,
  TextField,
  Typography
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {Delete} from "@mui/icons-material";
import Environment from "../../models/Environment";

type EnvironmentFormProps = {
  environment?: Environment
  onSave: (env: Environment) => void
}

export function EnvironmentForm({environment, onSave}: EnvironmentFormProps) {
  const [env, setEnv] = useState<Environment | null>(environment ?? null);
  const [name, setName] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (env) {
      setIsEdit(true);
      setName(env.name);
    } else {
      setEnv(new Environment(
        "",
        []
      ));
    }
  }, [])

  function handleNameChange(e: any) {
    setName(e.target.value);
  }
  function handleSave() {
    const newEnv = new Environment(
      name,
      []
    );
    onSave(newEnv);
  }

  function handleCancel() {
    navigate(-1)
  }

  if (!env) return (
    <Container>
      Loading
    </Container>
  )

  return (
    <>
        <Box sx={{display: 'flex'}}>
          <FormControl sx={{ mb: 1, mr: 1, flex: 1 }}>
            <TextField
              label={"Name"}
              value={name}
              onChange={handleNameChange}
              disabled={isEdit}
            />
          </FormControl>
          <FormControl sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
            <Button sx={{margin: '1em'}} variant="outlined" onClick={handleCancel}>Cancel</Button>
            <Button sx={{margin: '1em'}} variant="contained" onClick={handleSave}>Save</Button>
          </FormControl>
        </Box>
      </>
  )
}