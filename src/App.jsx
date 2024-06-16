import { FormControl, TextField, Button, Autocomplete } from "@mui/material";
import { ref, set, push, get } from "firebase/database";
import { useEffect, useState, useReducer } from "react";
import db from "./config/firebase";
import DisplayMenu from "./components/DisplayMenu";
import ModalForm from "./components/ModalForm";

function App() {
  const initialInputField = {
    id: "",
    name: "",
    category: "",
    price: 0,
    cost: 0,
    stocks: 0,
    additionalOption: [{ field: "", options: [], isChecked: false }],
  };
  // FORM HOOKS
  const [inputField, setInputField] = useState(initialInputField);
  const [openModal, setOpenModal] = useState(false);

  // MENU CARD HOOKS
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [menu, setMenu] = useState({});
  const [editMenu, setEditMenu] = useState(false);

  useEffect(() => {
    const getMenuCategory = async () => {
      try {
        const snapshot = await get(ref(db, `Menu/`));
        if (snapshot.exists()) {
          setCategoryOptions(Object.keys(snapshot.exportVal()));
          setMenu(snapshot.exportVal());
        } else {
          console.error("NO DATA FOUND");
        }
      } catch (error) {
        console.error("Error fetching menu categories: ", error);
      }
    };
    getMenuCategory();
  });

  return (
    <div className="demo-app">
      <ModalForm
        categoryOptions={categoryOptions}
        openModal={openModal}
        setOpenModal={setOpenModal}
        editMenu={editMenu}
        setEditMenu={setEditMenu}
        inputField={inputField}
        setInputField={setInputField}
      />

      <Button
        variant="outlined"
        onClick={() => {
          setOpenModal(true);
          setInputField(initialInputField);
        }}
        sx={{ marginLeft: "16px" }}
      >
        Add Menu
      </Button>
      <DisplayMenu
        menu={menu}
        categoryOptions={categoryOptions}
        setOpenModal={setOpenModal}
        setEditMenu={setEditMenu}
        setInputField={setInputField}
      />
    </div>
  );
}

export default App;
