import {useEffect, useState} from "react";
import Datagrid, {Cell} from "../components/datagrid/Datagrid";
import Container from "../components/container/Container";
import {Breadcrumbs, Fab, TableRow, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {Add} from "@mui/icons-material";
import Environment from "../models/Environment";
import {useQuery} from "react-query";
import {queryClient} from "../main";

export default function EnvironmentsPage() {
  const [envs, setEnvs] = useState<Environment[]>([]);
  const navigate = useNavigate();

  const columns = [
    {
      label: "Name",
      value: "name"
    },
  ]

  const { isLoading, error, data } = useQuery('environmentsData', () =>
      fetch('http://localhost:8080/environments').then(res => res.json())
  )

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries("flagsData")
    }
  }, [])

  function addEnv() {
    navigate("/environments/add")
  }

  if (isLoading) return <Container>
    <Typography>Loading...</Typography>
  </Container>

  if (error) return <Container>
    {/*@ts-ignore*/}
    <Typography>Error: {error.message}</Typography>
  </Container>

  return (
    <div>
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
        bottom: 16,
        right: 16,
      }} color="primary" onClick={addEnv}>
        <Add />
      </Fab>
    </div>
  )
}