import Container from "../components/container/Container";
import {useEffect, useState} from "react";
import styled from "styled-components";
import Datagrid, {Cell} from "../components/datagrid/Datagrid";
import {Breadcrumbs, Fab, TableRow, Typography} from "@mui/material";
import FeatureFlag from "../models/FeatureFlag";
import {Link, useNavigate} from "react-router-dom";
import {Add} from "@mui/icons-material";
import {useQuery} from "react-query";
import {queryClient} from "../main";

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
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery('flagsData', () =>
      fetch('http://localhost:8080/feature_flags').then(res => res.json())
  )

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries("flagsData")
    }
  }, [])

  const columns = [
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

  function addFlag() {
    navigate("/add")
  }

  function CellText(value: any) {
    let v = value;
    if (value instanceof Date) {
      v = value.toLocaleString()
    }
    return (
      <Typography>{v}</Typography>
    )
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

  return (
    <>
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{mt: 2.5, mb: 2, ml: 1}}>
        <Typography color="text.primary">Feature Flags</Typography>
      </Breadcrumbs>
      <div className="content">
        <Datagrid columns={columns}>
          <>
            {
              // @ts-ignore
              data.items.map((flag, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <Cell key={column.value} align="left">
                  <Link to={`/${flag._id.$oid}`}>
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
      <Fab sx={{
        position: "fixed",
        bottom: 50,
        right: 50,
      }} color="primary" aria-label="add" onClick={addFlag}>
        <Add />
      </Fab>
    </>
  )
}