import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { motion } from "framer-motion";

const TaskList = ({ task, handleChangeItem, handleDeleteItem }) => {
  // State for managing the modal open/close
  const [Open, setOpen] = useState(false);
  // States for managing the edited text and due date
  const [editedText, setEditedText] = useState(task.text);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  // State for handling error status
  const [error, setError] = useState(false);

  // Function to handle the modal open
  const handleOpen = () => {
    setOpen(true);
  };
  // Function to handle the modal close
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle text change in the modal
  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  // Function to handle due date change in the modal
  const handleDueDateChange = (e) => {
    setEditedDueDate(e.target.value);
  };

  // Function to handle the Done button click in the modal
  const handleDoneClick = () => {
    if (editedText && editedDueDate) {
      setOpen(false);
      handleChangeItem(task.id, task.done, editedText, editedDueDate);
      setError(false);
    } else {
      setError(true);
    }
  };

  // Function to handle the checkbox change in the task card
  const handleCheckboxChange = () => {
    handleChangeItem(task.id, !task.done, task.text, task.dueDate);
  };

  // Function to format the due date in the desired format (day/month/year)
  const formatDueDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      {/* Modal for editing the task */}
      <Modal
        open={Open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="modalView">
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "10px",
              fontSize: "1.5rem",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Change User Details
          </Typography>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: "10px",
            }}
          >
            {/* Text field for editing the task text */}
            <TextField
              fullWidth
              type="text"
              value={editedText}
              onChange={handleTextChange}
            />
            {/* Text field for editing the due date */}
            <TextField
              fullWidth
              type="date"
              value={editedDueDate}
              onChange={handleDueDateChange}
              sx={{ backgroundColor: "whitesmoke", borderRadius: "5px" }}
            />
            {/* Error message for empty text or due date */}
            {error && (
              <Typography variant="caption" color="error">
                Please enter a value in both fields.
              </Typography>
            )}
            {/* Done button for saving changes */}
            <Button
              sx={{
                color: "white",
                backgroundColor: "green",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
              onClick={handleDoneClick}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Task card */}
      <Box id="box1">
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Task card with motion animation */}
          <Card
            component={motion.div}
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: { duration: 0.5, delay: 1 },
              rotate: 360,
            }}
            id="card"
            style={{
              height: "300px",
              width: "300px",
              padding: "10px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                height: "100%",
              }}
            >
              {/* Checkbox for marking task as done */}
              <Checkbox
                checked={task.done}
                onChange={handleCheckboxChange}
                sx={{
                  width: "3rem",
                  height: "3rem",
                  "& .MuiSvgIcon-root": {
                    fontSize: "3rem",
                  },
                  color: "navy",
                }}
              />
              {/* Task text */}
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "serif",
                  fontWeight: "600",
                  textShadow: "1px 5px 7px white",
                  borderRadius: "10px",
                }}
              >
                {task.text}
              </Typography>
              {/* Task due date */}
              <Typography variant="body1">
                Due Date: {formatDueDate(task.dueDate)}
              </Typography>
              {/* Task status */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontFamily: "serif",
                  color: task.done
                    ? "#56fc58"
                    : "#fffff" &&
                      task.dueDate < new Date().toISOString().slice(0, 10)
                    ? task.done
                      ? "#56fc58"
                      : "#d4150b"
                    : "#fff",
                }}
              >
                Status:{" "}
                {task.done
                  ? "Completed"
                  : "Open" &&
                    task.dueDate < new Date().toISOString().slice(0, 10)
                  ? task.done
                    ? "Completed"
                    : "Overdue"
                  : "Open"}
              </Typography>
              {/* Edit button to open the modal */}
              <Button
                fullWidth
                onClick={handleOpen}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Edit
              </Button>
              {"  "}
              {/* Delete button to delete the task */}
              <Button
                fullWidth
                onClick={() => handleDeleteItem(task.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default TaskList;
