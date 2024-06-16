import { ref, remove } from "firebase/database";
import db from "../config/firebase";

const FIREBASE_DELETE = async (item) => {
  const dataRef = ref(db, `Menu/${item.category}/${item.id}`);

  remove(dataRef)
    .then(() => {
      console.info("DATA REMOVED");
    })
    .catch((error) => {
      console.error("ERROR DELETION FAILED: ", error);
    });
};

export default FIREBASE_DELETE;
