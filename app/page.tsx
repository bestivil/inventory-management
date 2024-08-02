"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import BasicTable from "./components/table";
import { firestore } from "../firebase";
import { useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { addItem } from "./backend/firestorefunctions";

export default function Home() {
  const [Inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState(" ");

  useEffect(() => {
    updateInventory();
  }, []);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList: any = [];

    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    console.log(inventoryList);
    setInventory(inventoryList);
  };

  const handleAddItem = async (item: any) => {
    addItem(item);
    setItemName("");
    setOpen(false);
    updateInventory();
  };
  const handleRemoveItem = async (result: any) => {
    updateInventory();
  };

  return (
    <>
      <Box
        height="25vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <BasicTable list={Inventory} onRemoveItem={handleRemoveItem} />
      </Box>

      <Box gap={4}>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Add New Item
        </Button>

        <Stack
          width="100%"
          direction="row"
          border="2px solid #FFF"
          gap={4}
          sx={{ display: open ? "block" : "none" }}
        >
          <TextField
            variant="outlined"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          ></TextField>
          <Button
            variant="outlined"
            onClick={() => {
              handleAddItem(itemName);
            }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </>
  );
}
