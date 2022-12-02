import Container from "../components/container/Container";
import {
  Autocomplete,
  Box,
  Breadcrumbs, Button,
  Card as MuiCard, Chip, createFilterOptions,
  Divider,
  FormControl, IconButton, InputLabel,
  Link, MenuItem, Select,
  styled,
  TextField,
  Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import FeatureFlag, {Rule} from "../models/FeatureFlag";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {Delete} from "@mui/icons-material";
import {useNavigate, useNavigation} from "react-router-dom";

const Card = styled(MuiCard)`
  background-color: var(--color-dark);
  color: #f9f9f9;
  padding: 1rem;
`

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

type FeatureFlagFormProps = {
  featureFlag?: FeatureFlag
  onSave: (flag: FeatureFlag) => void
}

export function FeatureFlagForm({featureFlag, onSave}: FeatureFlagFormProps) {
  const [flag, setFlag] = useState<FeatureFlag | null>(featureFlag ?? null);
  const [label, setLabel] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(false);
  const [rules, setRules] = useState<Rule[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (flag) {
      setIsEdit(true);
      setLabel(flag.label);
      setEnabled(flag.enabled);
      setRules(flag.rules);
    } else {
      setFlag(new FeatureFlag(
        "",
        "",
        "",
        false,
        []
      ));
    }
  }, [])

  function handleLabelChange(e: any) {
    setLabel(e.target.value);
  }

  function handleEnable(e: any) {
    setEnabled(e.target.checked);
  }

  function changeRules(newRules: Rule[]) {
    setRules(newRules);
  }

  function addRule() {
    setRules([...rules, new Rule("", {
      Is: ""
    })]);
  }

  function handleSave() {
    const newFlag = new FeatureFlag(
      flag?.id ?? "",
      flag?.name ?? "",
      label,
      enabled,
      [...rules],
    );
    onSave(newFlag);
  }

  function handleCancel() {
    navigate(-1);
  }

  if (!flag) return (
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
              value={flag.name}
              disabled={isEdit}
            />
          </FormControl>
          <FormControl sx={{ mb: 1, ml: 1, flex: 1 }}>
            <TextField
              label={"Label"}
              value={label}
              onChange={handleLabelChange}
            />
          </FormControl>
        </Box>
        <Box sx={{display: 'flex'}}>
          <FormControl>
            <FormControlLabel control={
              <Switch checked={enabled} onChange={handleEnable}/>
            } label="Enabled" />
          </FormControl>
        </Box>
        <Divider sx={{mt: 2, mb: 2}}/>
        <Typography variant="h6">
          Rules
        </Typography>
        <RulesForm rules={rules} onChange={changeRules}/>
        <Box sx={{
          display: 'flex',
          mt: 2,
          border: '1px solid var(--color-highlight-light)',
          padding: '2em',
          borderRadius: '.5em',
          justifyContent: 'center'
        }}>
          <Button onClick={addRule}>Add rule</Button>
        </Box>
        <FormControl sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
          <Button sx={{margin: '1em'}} variant="outlined" onClick={handleCancel}>Cancel</Button>
          <Button sx={{margin: '1em'}} variant="contained" onClick={handleSave}>Save</Button>
        </FormControl>
      </>
  )
}

type RulesFormProps = {
  rules: Rule[]
  onChange: CallableFunction
}

type RuleProps = {
  rule: Rule
  onChange: CallableFunction
  onDelete: CallableFunction
}

export function RulesForm({rules, onChange}: RulesFormProps) {
  function onRuleChange(index: number, newRule: Rule) {
    const newRules = [...rules];
    newRules[index] = newRule;
    onChange(newRules);
  }

  function handleDelete(index: number) {
    const newRules = [...rules];
    newRules.splice(index, 1);
    onChange(newRules);
  }

  return (
    <>
      {
        rules.map((rule, index) => (
          <RuleForm key={index} rule={rule} onChange={(r: Rule) => {
            onRuleChange(index, r)
          }} onDelete={() => handleDelete(index)} />
        ))
      }
    </>
  )
}

export function RuleForm({rule, onChange, onDelete}: RuleProps) {
  const [currentRule, setCurrentRule] = useState<Rule>(rule);
  const isMany = "IsOneOf" in currentRule.operator || "IsNotOneOf" in currentRule.operator;
  const [parameterOptions] = useState([currentRule.parameter])
  const [valueOptions] = useState<string[]>(
    isMany ? [...Object.values(currentRule.operator)[0]] : []
  );

  useEffect(() => {
    onChange(currentRule);
  }, [currentRule])


  function handleOperatorChange(e: any) {
    currentRule.operator = {
      [e.target.value]: e.target.value in ["IsOneOf", "IsNotOneOf"] ? [] : ""
    }
    console.log(currentRule)
    setCurrentRule({...currentRule});
  }

  function handleValueChange(e: any) {
    currentRule.operator = {
      [Object.keys(currentRule.operator)[0]]: e.target.value
    }
    setCurrentRule({...currentRule});
  }

  function handleValuesChange(e: any, values: string[]) {
    currentRule.operator = {
      [Object.keys(currentRule.operator)[0]]: values
    }
    setCurrentRule({...currentRule});
  }

  function handleDelete() {
    onDelete()
  }

  const filter = createFilterOptions<string>();

  return (
   <Box sx={{display: 'flex', flexDirection: 'column'}}>
     <Box sx={{
       display: 'flex',
       alignItems: 'center',
       mt: 2,
       border: '1px solid var(--color-highlight-light)',
       padding: '2em',
       borderRadius: '.5em',
     }}>
       <FormControl sx={{mr: 2, minWidth: '15em'}}>
          <Autocomplete
            id="parameter"
            options={parameterOptions}
            value={rule.parameter}
            getOptionLabel={(option) => option}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some((option) => inputValue === option);
              if (inputValue !== '' && !isExisting) {
                filtered.push(`Add "${inputValue}"`);
              }
              return filtered;
            }}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Parameter"
                placeholder="Select or add a parameter"
              />)
           }
            // @ts-ignore
            onChange={(e: any, value: string) => {
              if (value) value = value.replace("Add \"", "").replace("\"", "");
              currentRule.parameter = value;
              setCurrentRule({...currentRule});
            }}
          />
       </FormControl>
       <FormControl sx={{minWidth: '8em'}}>
         <InputLabel id="operator-label">Operator</InputLabel>
         <Select
           labelId="operator-label"
           id="operator"
           value={Object.keys(currentRule.operator)[0]}
           label="Operator"
           onChange={handleOperatorChange}
         >
           <MenuItem value={"Is"}>is</MenuItem>
           <MenuItem value={"IsNot"}>is not</MenuItem>
           <MenuItem value={"IsOneOf"}>is one of</MenuItem>
           <MenuItem value={"IsNotOneOf"}>is not one of</MenuItem>
           <MenuItem value={"Contains"}>contains</MenuItem>
         </Select>
       </FormControl>
       <FormControl sx={{flex: 1, ml: 2}}>
       {
         isMany ? (
           <Autocomplete
            multiple
            id="operator-values"
            value={[...Object.values(rule.operator)[0]]}
            options={valueOptions}
            filterSelectedOptions
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Values"
                placeholder="Add values"
              />)
           }
            onChange={handleValuesChange}
          />
         ) : (
            <TextField
              label={"Value"}
              value={Object.values(rule.operator)[0]}
              onChange={handleValueChange}
            />
         )
       }
       </FormControl>
       <FormControl sx={{ml: 2}}>
         <IconButton onClick={handleDelete}>
           <Delete sx={{color: 'red'}}/>
         </IconButton>
       </FormControl>
     </Box>
   </Box>
  )
}