import { push, ref, set } from "firebase/database";
import db from "../config/firebase";

const FIREBASE_CREATE = async (item) => {
  const API_URL = `Menu/${item.category}`;

  const newMenuItem = push(ref(db, API_URL));

  const data = {
    ...item,
    id: newMenuItem.key,
  };
  console.log(data);
  await set(newMenuItem, data)
    .then(() => {
      console.info("DATA SAVED SUCCESSFULLY");
    })
    .catch((error) => {
      console.error("DATA NOT SAVED ERROR OCCURRED: ", error);
    });
};

export default FIREBASE_CREATE;
