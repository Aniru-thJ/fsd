// src/components/KanbanCard.js
import React, { useContext } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import styled from "styled-components";
import { kanbanApi } from "./api";
import { UserContext } from "./UserContext";

const TaskCard = styled(Box)`
  background: #181818;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(57, 255, 20, 0.4);
  color: white;
`;

const StatusBadge = styled(Box)`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
  background-color: ${({ status }) =>
    status === "To Do"
      ? "#ff9800"
      : status === "In Progress"
      ? "#2196f3"
      : "#4caf50"};
  color: black;
`;

const KanbanCard = ({ task, setTasks, tasks }) => {
  const { user } = useContext(UserContext);

  // Convert both values to lower case and trim for case-insensitive comparison.
  const assignedTo = task.assignedTo
    ? task.assignedTo.trim().toLowerCase()
    : "";
  const signedInUser = user?.name ? user.name.trim().toLowerCase() : "";

  console.log("Assigned To:", assignedTo);
  console.log("Signed-in User:", signedInUser);
  console.log("User Role:", user?.role);

  // For employees, display the card only if the task is assigned to them.
  if (user && user.role === "employee" && assignedTo !== signedInUser) {
    return null;
  }

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const response = await kanbanApi.put(
        `/task/${task.taskId}/status/${newStatus}`
      );
      const updatedTask = response.data;
      const updatedTasks = tasks.map((t) =>
        t.taskId === updatedTask.taskId ? updatedTask : t
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Determine if the current user is allowed to edit the task.
  const canEdit =
    user &&
    (user.role === "manager" ||
      (user.role === "employee" && assignedTo === signedInUser));

  console.log("Can Edit:", canEdit);

  return (
    <TaskCard>
      <Typography
        variant="subtitle1"
        sx={{ color: "#39ff14", fontWeight: "bold" }}
      >
        {task.description}
      </Typography>
      <Typography variant="body2">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </Typography>
      <StatusBadge status={task.status}>{task.status}</StatusBadge>
      <Box
        sx={{ mt: 1, background: "#222", padding: "8px", borderRadius: "4px" }}
      >
        <Typography variant="body2">
          Assigned to: {task.assignedTo ? task.assignedTo : "Not Assigned"}
        </Typography>
      </Box>
      {user && canEdit ? (
        <FormControl fullWidth size="small" sx={{ mt: 1 }}>
          <InputLabel sx={{ color: "#39ff14" }} id="status-label">
            Change Status
          </InputLabel>
          <Select
            labelId="status-label"
            value={task.status}
            label="Change Status"
            onChange={handleStatusChange}
            sx={{
              ".MuiOutlinedInput-notchedOutline": { borderColor: "#39ff14" },
              color: "#39ff14",
              "& .MuiSvgIcon-root": { color: "#39ff14" },
            }}
          >
            <MenuItem value="To Do" sx={{ color: "#39ff14" }}>
              To Do
            </MenuItem>
            <MenuItem value="In Progress" sx={{ color: "#39ff14" }}>
              In Progress
            </MenuItem>
            <MenuItem value="Done" sx={{ color: "#39ff14" }}>
              Done
            </MenuItem>
          </Select>
        </FormControl>
      ) : (
        user &&
        user.role === "employee" && (
          <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
            You cannot change the status of this task.
          </Typography>
        )
      )}
    </TaskCard>
  );
};

export default KanbanCard;
