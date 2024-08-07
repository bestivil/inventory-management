"use client";

import {
  Box,
  Button,
  Dialog,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BasicTable from "./components/table";
import { firestore } from "../firebase";
import { useState, useRef } from "react";
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
import { errorMessages } from "./components/camera";
import { Camera, CameraType } from "react-camera-pro";
import { OpenAI } from "openai";

import * as dotenv from "dotenv";
import { aiRecongition } from "./backend/openai";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Home() {
  const [Inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState(" ");
  const [modalOpen, setModalOpen] = useState(false);
  const [openaiRes, setopenaiRes] = useState<string>();

  const camera = useRef<CameraType>(null);
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    updateInventory();
  }, []);

  const takePhoto = (closeModal = false) => {
    if (camera.current) {
      let photo = null;
      photo = camera.current.takePhoto();
      setImage(photo);

      if (closeModal) {
        setModalOpen(false);
      }
    }
  };

  useEffect(() => {
    if (image) {
      const res = aiRecongition(image);
      // setopenaiRes(res);
    }
  }, [image]);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList: any = [];

    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });

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
      <div>
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          PaperProps={{
            sx: {
              width: "50vw",
              height: "50vh",
              top: "25vh",
              left: "25vw",
              position: "fixed",
              padding: "0",
              backgroundColor: "white",
            },
          }}
        >
          <Stack
            sx={{
              height: "100%",
              justifyContent: "space-between",
              padding: "3px",
              boxSizing: "border-box",
              backgroundColor: "white",
            }}
          >
            <Camera ref={camera} errorMessages={errorMessages} />

            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button variant="contained" onClick={() => takePhoto(true)}>
                Take Photo
              </Button>
              <Button variant="contained" onClick={() => setModalOpen(false)}>
                Close
              </Button>
            </Stack>
          </Stack>
        </Dialog>
      </div>

      <Typography sx={{ textAlign: "center", paddingTop: "32px" }} variant="h3">
        Inventory Management
      </Typography>
      <Box sx={{ marginY: "50px" }}>
        <BasicTable list={Inventory} onRemoveItem={handleRemoveItem} />
      </Box>

      <Box
        gap={4}
        sx={{
          marginBottom: "60px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setOpen(!open);
          }}
          sx={{ justifyItems: "center", alignContent: "center" }}
        >
          Add New Item
        </Button>

        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>

        <Stack
          width="100%"
          direction="row"
          border="2px solid #FFF"
          gap={4}
          sx={{ display: open ? "block" : "none" }}
        >
          <TextField
            variant="outlined"
            sx={{ borderColor: "#FFFFFF" }}
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
        <div></div>
      </Box>
    </>
  );
}
