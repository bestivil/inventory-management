import { useEffect } from "react";
import { firestore } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useState } from "react";

const [Inventory, setInventory] = useState([] as string[]);

export const updateInventory = async () => {
  const snapshot = query(collection(firestore, "inventory"));
  const docs = await getDocs(snapshot);
  const inventoryList: any = []; // TODO: amend any

  docs.forEach((doc) => {
    inventoryList.push({ name: doc.id, ...doc.data() });
  });

  setInventory(inventoryList);
};
