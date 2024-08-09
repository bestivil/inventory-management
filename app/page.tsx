"use client";

import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import BasicTable from "./components/table";
import { firestore } from "../firebase";
import { useState, useRef } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";
import { addImageItem, addItem } from "./backend/firestorefunctions";
import { errorMessages } from "./components/camera";
import { Camera, CameraType } from "react-camera-pro";
import { OpenAI } from "openai";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AddCircle, Search } from "@mui/icons-material";

export default function Home() {
  const [Inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState(" ");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
      addImageItem(image);
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
      <Box
        sx={{
          textAlign: "center",
          paddingTop: "32px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={() => {
            setOpen(!open);
          }}
          sx={{
            justifyItems: "center",
            alignContent: "center",
            marginRight: "32px",
          }}
        >
          Add Item
        </Button>

        <Button
          variant="contained"
          startIcon={<AddAPhotoIcon />}
          onClick={() => setModalOpen(true)}
        >
          Add Image
        </Button>

        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={() => setSearchOpen(!searchOpen)}
          sx={{ marginLeft: "32px" }}
        >
          Search
        </Button>
      </Box>

      <Stack sx={{ display: open ? "block" : "none" }}>
        <div className="flex flex-row gap-4  mt-8 justify-center">
          <TextField
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
        </div>
      </Stack>

      <Stack sx={{ display: searchOpen ? "block" : "none" }}>
        <div className="flex flex-row gap-4  mt-8 justify-center">
          <TextField
            sx={{ borderColor: "#FFFFFF" }}
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          ></TextField>
        </div>
      </Stack>

      <Box sx={{ marginY: "50px" }}>
        <BasicTable list={Inventory} onRemoveItem={handleRemoveItem} />
      </Box>
    </>
  );
}
