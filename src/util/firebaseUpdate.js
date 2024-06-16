import { ref, set } from "firebase/database";
import db from "../config/firebase";

const FIREBASE_UPDATE = async (item) => {
  const API_URL = `Menu/${item.category}/${item.id}`;

  await set(ref(db, API_URL), item)
    .then(() => {
      console.info("MENU ITEM UPDATED");
    })
    .catch((error) => {
      console.error("MENU NOT UPDATE ERROR OCCURED: ", error);
    });
};

export default FIREBASE_UPDATE;
