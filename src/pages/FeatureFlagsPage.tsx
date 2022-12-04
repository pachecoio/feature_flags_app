import Container from "../components/container/Container";
import {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import Datagrid, {Cell} from "../components/datagrid/Datagrid";
import {Alert, AlertTitle, Backdrop, Breadcrumbs, CircularProgress, Fab, TableRow, Typography} from "@mui/material";
import FeatureFlag from "../models/FeatureFlag";
import {Link, useNavigate} from "react-router-dom";
import {Add} from "@mui/icons-material";
import {useQuery} from "react-query";
import {queryClient} from "../main";
import {AlertContext} from "../AlertProvider";

export default function FeatureFlagsPage() {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery('flagsData', () =>
      fetch('http://localhost:8080/feature_flags').then(res => res.json())
  )
  // @ts-ignore
  const {alert} = useContext(AlertContext);

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
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      >
      <CircularProgress color="inherit" />
    </Backdrop>
  )

  if (error) return (
    <Container>
      {/*@ts-ignore*/}
      <Typography>Error: {error.message}</Typography>
    </Container>
  )

  console.log('alert', alert)

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
      {
        alert ?
        <Alert
          severity={alert.severity}
          sx={{
            position: "absolute",
            top: 50,
            right: 20,
          }}
        >
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert> : null
      }
    </>
  )
}