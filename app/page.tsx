"use client";

import { Box, Stack, TextField, Typography } from "@mui/material";
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

export default function Home() {
  const [Inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState(" ");

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList: any = []; // TODO: amend any

    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    console.log(inventoryList);
    setInventory(inventoryList);
  };

  const removeItem = async (item: string) => {
    const docRef = doc(collection(firestore, "inventory"), item); //finds the object reference for item in collection
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
  };

  const addItem = async (item: string) => {
    const docRef = doc(collection(firestore, "inventory"), item); //finds the object reference for item in collection
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 }); // if our item is in inventory, we add one to item count
    } else {
      await setDoc(docRef, { count: 1 });
    }
  };

  return (
    <>
      <Box
        height="50vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        {BasicTable(["apples", "oranges"])}
      </Box>
      <Typography> Add item</Typography>
      <Stack width="100%" direction="row">
        <TextField></TextField>
      </Stack>
    </>
  );
}
