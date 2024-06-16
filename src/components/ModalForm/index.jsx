import {
  Modal,
  Box,
  FormControl,
  TextField,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import "./index.css";
import FIREBASE_CREATE from "../../util/firebaseCreate";
import FIREBASE_UPDATE from "../../util/firebaseUpdate";
import FIREBASE_DELETE from "../../util/firebaseDelete";

const ModalForm = ({
  categoryOptions,
  openModal,
  setOpenModal,
  editMenu,
  setEditMenu,
  inputField,
  setInputField,
}) => {
  const handleKeyDown = (event) => {
    // Prevent negative sign, decimal point, and other non-numeric characters
    if (
      event.key === "e" ||
      event.key === "-" ||
      event.key === "." ||
      event.key === "+" ||
      event.key === " "
    ) {
      event.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "cost" || name === "stocks") {
      //Allow numeric values only for these fields
      if (/^\d*$/.test(value)) {
        setInputField({ ...inputField, [name]: Number(value) });
      }
    } else {
      setInputField({ ...inputField, [name]: value });
    }
  };

  const handleCheckBoxChange = (e, index) => {
    const { checked } = e.target;
    const tempAddOption = inputField.additionalOption;

    // SETS CHECK BOX TO CHECK/UNCHECK STATUS
    tempAddOption[index].isChecked = checked;

    // CHECKS WHETHER TO ADD ADDITIONAL OPTION WHEN BOX IS CHECKED
    if (checked) {
      tempAddOption.push({
        field: "",
        options: [],
        isChecked: false,
      });
    } else {
      tempAddOption.splice(index, 1);
    }

    setInputField({ ...inputField, additionalOption: [...tempAddOption] });
  };

  const handleCheckBoxFields = (e, index) => {
    const { name, value } = e.target;
    const tempAddOption = inputField.additionalOption;

    if (name === "options") {
      let tempValue = value.split(",");
      tempAddOption[index][name] = tempValue;
    } else {
      tempAddOption[index][name] = value;
    }

    setInputField({ ...inputField, additionalOption: tempAddOption });
  };

  const handleModalButton = () => {
    editMenu ? FIREBASE_UPDATE(inputField) : FIREBASE_CREATE(inputField);
    setOpenModal(false);
    setEditMenu(false);
  };

  const handleDelete = () => {
    FIREBASE_DELETE(inputField);
    setOpenModal(false);
    setEditMenu(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
      }}
    >
      <Box className="form-container" component={"form"}>
        <Box className="form-header">
          <Typography variant="h6">Add Menu</Typography>
          <IconButton
            className="form-header-close"
            aria-label="close"
            onClick={() => {
              setOpenModal(false);
              setEditMenu(false);
            }}
            sx={{
              borderRadius: "unset",
              "&:hover": { backgroundColor: "unset", color: "primary.main" },
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            label="Name"
            name="name"
            value={inputField.name}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <Autocomplete
            options={categoryOptions}
            renderInput={(params) => <TextField {...params} label="Category" />}
            freeSolo
            value={inputField.category}
            inputValue={inputField.category}
            onInputChange={(e, newValue) => {
              setInputField({ ...inputField, category: newValue ?? "" });
            }}
            onChange={(e, newValue) => {
              setInputField({ ...inputField, category: newValue ?? "" });
            }}
          />
        </FormControl>
        <FormControl className="price-field">
          <TextField
            name="price"
            variant="outlined"
            label="Price"
            onKeyDown={handleKeyDown}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            value={inputField.price}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl className="cost-field">
          <TextField
            name="cost"
            variant="outlined"
            label="Cost"
            onKeyDown={handleKeyDown}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            value={inputField.cost}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl className="stocks-field">
          <TextField
            name="stocks"
            variant="outlined"
            label="Stocks"
            type="number"
            value={inputField.stocks}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={handleInputChange}
          />
        </FormControl>
        {inputField.additionalOption?.map((checkbox, index) => (
          <Box key={`option-${index}`} className="additional-option-container">
            <FormControlLabel
              key={`forminput-${index}`}
              className="additional-checkbox"
              control={
                <Checkbox
                  checked={checkbox.isChecked}
                  color="primary"
                  onChange={(e) => {
                    handleCheckBoxChange(e, index);
                  }}
                />
              }
              label="Add option"
            />
            {checkbox.isChecked ? (
              <>
                <FormControl className="additional-field-name">
                  <TextField
                    placeholder="Put Field Name (e.g. Size)"
                    name="field"
                    value={checkbox.field}
                    onChange={(e) => {
                      handleCheckBoxFields(e, index);
                    }}
                  />
                </FormControl>
                <FormControl className="additional-field-value">
                  <TextField
                    placeholder="Format(Small,Medium,Large)"
                    name="options"
                    value={checkbox.options}
                    onChange={(e) => {
                      handleCheckBoxFields(e, index);
                    }}
                  />
                </FormControl>
              </>
            ) : null}
          </Box>
        ))}
        <Button
          className="modal-button"
          variant="contained"
          color={editMenu ? "success" : "primary"}
          onClick={handleModalButton}
        >
          {editMenu ? "Save" : "Submit"}
        </Button>
        {editMenu ? (
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        ) : null}
      </Box>
    </Modal>
  );
};

export default ModalForm;
