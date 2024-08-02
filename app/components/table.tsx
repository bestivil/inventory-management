import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DeleteIcon from "@mui/icons-material/Delete";
import { removeItem } from "../backend/firestorefunctions";

export default function BasicTable({
  list,
  onRemoveItem,
}: {
  list: any;
  onRemoveItem: (result: any) => void;
}) {
  const handleRemove = async (name: string) => {
    const result = await removeItem(name);
    onRemoveItem(result);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Inventory
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Quantity
            </TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(({ name, count }: { name: any; count: any }) => (
            <TableRow
              key={name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </TableCell>
              <TableCell align="right">{count}</TableCell>
              <TableCell
                align="right"
                onClick={() => handleRemove(name)}
                sx={{ cursor: "pointer" }}
              >
                <DeleteIcon
                  sx={{
                    transition: "color 0.2s ease-in-out",
                    "&:hover": {
                      color: "red",
                    },
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
