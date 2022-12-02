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
export default function Environments() {
  const [envs] = useState([...initialEnvs]);

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