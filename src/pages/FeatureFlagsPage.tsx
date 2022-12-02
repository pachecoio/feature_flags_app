import Container from "../components/container/Container";
import {useState} from "react";
import styled from "styled-components";
import Datagrid, {Cell} from "../components/datagrid/Datagrid";
import {Breadcrumbs, TableRow, Typography} from "@mui/material";
import FeatureFlag from "../models/FeatureFlag";
import {Link} from "react-router-dom";

const initialFlags: FeatureFlag[] = [
  new FeatureFlag(
    "123",
    "sample_flag",
    "Sample Flag",
  ),
  new FeatureFlag(
    "234",
    "sample_flag_2",
    "Sample Flag 2",
  ),
]

const FlagList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`

const FlagListItem = styled.li`
  display: flex;
`

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>([...initialFlags])

  const columns = [
    {
      label: "ID",
      value: "id"
    },
    {
      label: "Name",
      value: "name"
    },
    {
      label: "Label",
      value: "label"
    },
    {
      label: "Created at",
      value: "created_at"
    },
    {
      label: "Last updated at",
      value: "updated_at"
    },
  ]

  function CellText(value: any) {
    let v = value;
    if (value instanceof Date) {
      v = value.toLocaleString()
    }
    return (
      <Typography>{v}</Typography>
    )
  }

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{mt: 2.5, mb: 2, ml: 1}}>
        <Typography color="text.primary">Feature Flags</Typography>
      </Breadcrumbs>
      <div className="content">
        <Datagrid columns={columns}>
          <>
            {flags.map((flag, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <Cell key={column.value} align="left">
                  <Link to={`/${flag.id}`}>
                    {
                      // @ts-ignore
                      CellText(flag[column.value])
                    }
                  </Link>
                </Cell>
              ))}
            </TableRow>
          ))}
          </>
        </Datagrid>
      </div>
    </Container>
  )
}