import { firestore, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

import { v4 } from "uuid";

export const removeItem = async (item: string) => {
  const docRef = doc(collection(firestore, "inventory"), item); //finds the object reference for item in collection
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { count } = docSnap.data();
    if (count) {
      await deleteDoc(docRef);
    }
  }
};

export const addItem = async (item: string) => {
  const docRef = doc(collection(firestore, "inventory"), item); //finds the object reference for item in collection
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { count } = docSnap.data();
    await setDoc(docRef, { count: count + 1 }); // if our item is in inventory, we add one to item count
  } else {
    await setDoc(docRef, { count: 1 });
  }
};

export const updateItem = async (item: string, type: "up" | "down") => {
  const docRef = doc(collection(firestore, "inventory"), item); //finds the object reference for item in collection
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { count } = docSnap.data();
    if (count === 1) {
      await deleteDoc(docRef);
    }
    if (count > 1 && type === "down") {
      await setDoc(docRef, { count: count - 1 });
    }
    if (type === "up") {
      await setDoc(docRef, { count: count + 1 });
    }
  }
};

export const addImageItem = async (image: File) => {
  const uniqueid = v4();

  const storageRef = ref(storage, `${uniqueid}`);
  const snapshot = await uploadBytes(storageRef, image, {
    contentType: "image/jpeg",
  });
  const downloadURL = await getDownloadURL(snapshot.ref);
  const docRef = doc(collection(firestore, "inventory-images"));

  try {
    await setDoc(docRef, {
      imageUrl: downloadURL,
      imageID: uniqueid,
    });
  } catch {
    throw new Error("Failed");
  }
};
