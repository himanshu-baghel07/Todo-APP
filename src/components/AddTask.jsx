import { Box, Button, Input, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";

const AddTask = ({ handleAddItem }) => {
  // State variables to manage the input fields and error status
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(false);

  // Function to handle the click event when the "Add" button is clicked
  const handleChange = () => {
    if (inputValue && dueDate) {
      // Call the parent component's handleAddItem function with the input values
      handleAddItem(inputValue, false, dueDate);
      // Reset the input fields and error status
      setDueDate("");
      setInputValue("");
      setError(false);
    } else {
      // Set error status if any of the input fields are empty
      setError(true);
    }
  };

  return (
    <Box id="addTask" initial={{ x: -1000 }} animate={{ x: 0 }}>
      {/* Input field for task name */}
      <TextField
        id="addTaskInput"
        className="add-task-input"
        value={inputValue}
        placeholder="Task Name"
        required
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* Input field for task due date */}

      <Typography id="dueDateText">Due Date</Typography>
      <Input
        id="addTaskDuedate"
        type="date"
        value={dueDate}
        placeholder="date"
        required
        onChange={(e) => setDueDate(e.target.value)}
        style={{ backgroundColor: "whitesmoke", borderRadius: "5px" }}
      />

      {/* Error message displayed when either of the input fields is empty */}
      {error && (
        <Typography variant="caption" color="error">
          Please enter a value in both fields.
        </Typography>
      )}

      {/* "Add" button with animation on hover */}
      <Button
        component={motion.button}
        whileHover={{
          scale: 1.2,
          rotate: [0, -10, 10, -10, 0],
          boxShadow: "0px 0px 20px red",
        }}
        transition={{ duration: 0.3 }}
        id="addButton"
        onClick={handleChange}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddTask;
