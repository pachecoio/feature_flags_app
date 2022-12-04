import {
  Box,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

export const Cell = styled(TableCell)`
  color: #f9f9f9;
  font-size: 1em;
`

export const CellHeader = styled(TableCell)`
  color: #9a9a9a;
  font-weight: bold;
  font-size: .8em;
`

type Column = {
  label: string
  value: string
}

type Props = {
  columns: Column[]
  children: JSX.Element
}

export default function Datagrid({columns, children}: Props) {
  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2, backgroundColor: '#141414'}}>
        <TableContainer>
          <Table
            sx={{minWidth: '500px'}}
            aria-labelledby="environment-list"
            size="medium"
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <CellHeader key={column.label} align="left">
                    {column.label}
                  </CellHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {children}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
        </Box>
  )
}


export function CellText(value: any) {
    let v = value;
    if (value instanceof Date) {
      v = value.toLocaleString()
    }
    return (
      <Typography>{v}</Typography>
    )
}