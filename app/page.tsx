import { Box } from "@mui/material";
import DataTable from "./components/table";
import BasicTable from "./components/table";

export default function Home() {
  const list = ["apple", "oranges"];
  return (
    <Box
      width="100vh"
      height="100vw"
      justifyContent="center"
      alignItems="center"
    >
      {BasicTable(list)}
    </Box>
  );
}
