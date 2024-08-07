import { useEffect } from "react";
import { firestore } from "../../firebase";
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

export const addImageItem = async (image: any) => {
  const docRef = doc(collection(firestore, "inventory"), image); //finds the object reference for item in collection
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { count } = docSnap.data();
    await setDoc(docRef, { count: count + 1 }); // if our item is in inventory, we add one to item count
  } else {
    await setDoc(docRef, { count: 1 });
  }
};
