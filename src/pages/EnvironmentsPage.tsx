import {useState} from "react";
import Datagrid from "../components/datagrid/Datagrid";

const initialEnvs = [
  {
    id: "123",
    name: "development",
  },
  {
    id: "3221",
    name: "staging",
  }
]
export default function EnvironmentsPage() {
  const [envs] = useState([...initialEnvs]);

  const columns = [
    {
      label: "Name",
      value: "name"
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

  return (
    <>
      <div>
        <h1>Environments</h1>
      </div>
      <div>
        content
      </div>
    </>
  )
}