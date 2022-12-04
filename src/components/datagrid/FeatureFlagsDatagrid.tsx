import {TableRow} from "@mui/material";
import Datagrid, {Cell, CellText} from "./Datagrid";
import {Link} from "react-router-dom";
import FeatureFlag from "../../models/FeatureFlag";

type FeatureFlagsDatagridProps = {
  flags: FeatureFlag[]
}

export default function FeatureFlagsDatagrid({flags}: FeatureFlagsDatagridProps) {

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

  return (
    <Datagrid columns={columns}>
      <>
            {
              // @ts-ignore
              flags.map((flag, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <Cell key={column.value} align="left">
                  {
                    // @ts-ignore
                    !flag?._id ? (
                      // @ts-ignore
                      CellText(flag[column.value])
                    ) : (
                      // @ts-ignore
                      <Link to={`/${flag._id.$oid}`}>
                        {
                          // @ts-ignore
                          CellText(flag[column.value])
                        }
                      </Link>
                    )
                  }
                </Cell>
              ))}
            </TableRow>
          ))}
          </>
    </Datagrid>
  )
}