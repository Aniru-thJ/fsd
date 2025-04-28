// src/components/ManagerDashBoard.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import styled from "styled-components";
import RegisterEmployeeForm from "./RegisterEmployeeForm";
import { kanbanApi } from "./api";
import { useNavigate } from "react-router-dom";

// Container for the whole dashboard
const DashboardContainer = styled(Box)`
  display: flex;
  height: 100vh;
  background-color: #121212;
`;

// Sidebar styling with neon background
const Sidebar = styled(Paper)`
  width: 30%;
  padding: 20px;
  background-color: #000 !important;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Neon button styling
const NeonButton = styled(Button)`
  && {
    background-color: #39ff14;
    color: #000;
    font-weight: bold;
    &:hover {
      background-color: #2fd310;
    }
  }
`;

// Content area for forms and task list with auto scroll
const ContentArea = styled(Box)`
  width: 70%;
  padding: 20px;
  background-color: #181818;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: calc(100vh - 40px);
  overflow: auto;
`;

// Custom styled TextField for dark theme with neon outline
const NeonTextField = styled(TextField)`
  && {
    background-color: #000;
    input {
      color: white;
    }
    label {
      color: #39ff14;
    }
    .MuiOutlinedInput-root {
      fieldset {
        border-color: #39ff14;
      }
      &:hover fieldset {
        border-color: #2fd310;
      }
      &.Mui-focused fieldset {
        border-color: #39ff14;
      }
    }
  }
`;

const ManagerDashBoard = () => {
  // Common state for actions: "register", "addTask", "removeTask", "findTask", "assignTask", "getAllUsers", "removeUser", or null (default view)
  const [action, setAction] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  // New states for assign task action
  const [assignUsers, setAssignUsers] = useState([]); // List of users for dropdown (used in both assign and remove user)
  const [assignTaskObj, setAssignTaskObj] = useState(null); // Selected task to assign
  const [selectedEmployee, setSelectedEmployee] = useState(""); // Selected employee roleId

  // New state for remove user action
  const [removeUserRoleId, setRemoveUserRoleId] = useState("");

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await kanbanApi.get("/task");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to fetch users for assignment and removal
  const fetchUsers = async () => {
    try {
      const response = await kanbanApi.get("/users");
      setAssignUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handler to set the current action and reset relevant state
  const handleAction = (act) => {
    setResult(null);
    setFormData({});
    setSelectedEmployee("");
    setAssignTaskObj(null);
    setRemoveUserRoleId("");
    // For assignTask or removeUser, fetch users
    if (act === "assignTask" || act === "removeUser") {
      fetchUsers();
    }
    setAction(act);
  };

  // --- Form Submission Handlers ---

  // Submit Add Task Form with due date validation (display message instead of alert)
  const submitAddTask = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.dueDate) {
      setResult("Please provide both description and due date.");
      return;
    }
    const selectedDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setResult("Due date cannot be less than Current Date.");
      return;
    }
    const newTask = {
      description: formData.description,
      dueDate: selectedDate,
      status: formData.status || "To Do",
    };
    try {
      await kanbanApi.post("/task/addTask", newTask);
      const response = await kanbanApi.get("/task");
      setTasks(response.data);
      setFormData({ description: "", dueDate: "", status: "To Do" });
      setResult("Task Added Successfully");
      setAction(null);
    } catch (error) {
      console.error("Error adding task:", error);
      setResult("Error adding task");
    }
  };

  // Submit Remove Task Form
  const submitRemoveTask = async (e) => {
    e.preventDefault();
    if (!formData.taskId) return;
    try {
      await kanbanApi.delete(`/task/${formData.taskId}`);
      await fetchTasks();
      setResult("Task Removed Successfully");
      setAction(null);
    } catch (error) {
      console.error("Error removing task:", error);
      setResult("Error removing task");
    }
  };

  // Submit Find Task Form and display result in a table format
  const submitFindTask = (e) => {
    e.preventDefault();
    if (!formData.taskId) return;
    const foundTask = tasks.find(
      (task) => task.taskId === formData.taskId || task._id === formData.taskId
    );
    if (foundTask) {
      const table = (
        <Box
          component="table"
          sx={{ width: "100%", borderCollapse: "collapse" }}
        >
          <Box component="thead">
            <Box
              component="tr"
              sx={{ backgroundColor: "#000", color: "#39ff14" }}
            >
              <Box
                component="th"
                sx={{ border: "1px solid #39ff14", padding: "8px" }}
              >
                Description
              </Box>
              <Box
                component="th"
                sx={{ border: "1px solid #39ff14", padding: "8px" }}
              >
                Due Date
              </Box>
              <Box
                component="th"
                sx={{ border: "1px solid #39ff14", padding: "8px" }}
              >
                Status
              </Box>
              <Box
                component="th"
                sx={{ border: "1px solid #39ff14", padding: "8px" }}
              >
                Assigned To
              </Box>
            </Box>
          </Box>
          <Box component="tbody">
            <Box component="tr" sx={{ border: "1px solid #39ff14" }}>
              <Box
                component="td"
                sx={{ border: "1px solid #39ff14", padding: "8px" }}
              >
                {foundTask.description}
              </Box>
              <Box
                component="td"
                sx={{ border: "1px solid #39ff14", padding: "8px" }}
              >
                {new Date(foundTask.dueDate).toLocaleDateString()}
              </Box>
              <Box
                component="td"
                sx={{ border: "1px solid #39ff14", padding: "8px" }}
              >
                {foundTask.status}
              </Box>
              <Box
                component="td"
                sx={{ border: "1px solid #39ff14", padding: "8px" }}
              >
                {foundTask.assignedTo ? foundTask.assignedTo : "Not Assigned"}
              </Box>
            </Box>
          </Box>
        </Box>
      );
      setResult(table);
    } else {
      setResult("Task not found");
    }
  };

  // Submit Assign Task Form using dropdown lists for employee and task
  const submitAssignTask = async (e) => {
    e.preventDefault();
    if (!selectedEmployee || !assignTaskObj) {
      alert("Please select an employee and a task to assign.");
      return;
    }
    try {
      // Create a new task object with the assignedTo field set to the selected employee's email
      const taskToAssign = { ...assignTaskObj, assignedTo: selectedEmployee };
      const response = await kanbanApi.post(
        `/users/${selectedEmployee}/task`,
        taskToAssign
      );
      console.log("Assign response:", response.data);
      // The backend returns one of: "Task assigned", "Task reassigned", or "Task already assigned to the user."
      setResult(response.data);
      setAction(null);
      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error(
        "Error assigning task:",
        error.response ? error.response.data : error
      );
      setResult("Error assigning task");
    }
  };

  // Submit Remove User Form using a dropdown list for users
  const submitRemoveUser = async (e) => {
    e.preventDefault();
    if (!removeUserRoleId) {
      alert("Please select a user to remove.");
      return;
    }
    try {
      await kanbanApi.delete(`/users/remove/${removeUserRoleId}`);
      setResult("User removed successfully");
      setAction(null);
    } catch (error) {
      console.error("Error removing user:", error);
      setResult("Error removing user");
    }
  };

  // Submit Get All Users Form: display users in a table format
  const submitGetAllUsers = async (e) => {
    e.preventDefault();
    try {
      const response = await kanbanApi.get("/users");
      const users = response.data;
      const table = (
        <Box
          component="table"
          sx={{ width: "100%", borderCollapse: "collapse" }}
        >
          <Box component="thead">
            <Box
              component="tr"
              sx={{ backgroundColor: "#000", color: "#39ff14" }}
            >
              <Box
                component="th"
                sx={{ border: "1px solid #39ff14", padding: "8px" }}
              >
                Role ID
              </Box>
              <Box
                component="th"
                sx={{ border: "1px solid #39ff14", padding: "8px" }}
              >
                Email
              </Box>
              <Box
                component="th"
                sx={{ border: "1px solid #39ff14", padding: "8px" }}
              >
                Name
              </Box>
            </Box>
          </Box>
          <Box component="tbody">
            {assignUsers.map((user) => (
              <Box
                key={user.roleId}
                component="tr"
                sx={{ border: "1px solid #39ff14" }}
              >
                <Box
                  component="td"
                  sx={{ border: "1px solid #39ff14", padding: "8px" }}
                >
                  {user.roleId}
                </Box>
                <Box
                  component="td"
                  sx={{ border: "1px solid #39ff14", padding: "8px" }}
                >
                  {user.email}
                </Box>
                <Box
                  component="td"
                  sx={{ border: "1px solid #39ff14", padding: "8px" }}
                >
                  {user.name}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      );
      setResult(table);
    } catch (error) {
      console.error("Error fetching users:", error);
      setResult("Error fetching users");
    }
  };

  // Navigate to Kanban Board
  const handleGoToBoard = () => {
    navigate("/kanban");
  };

  return (
    <DashboardContainer>
      <Sidebar elevation={3}>
        <Typography variant="h5" sx={{ color: "#39ff14", textAlign: "center" }}>
          Manager Actions
        </Typography>
        <NeonButton fullWidth onClick={() => handleAction("register")}>
          Register a New Employee
        </NeonButton>
        <NeonButton fullWidth onClick={() => handleAction("addTask")}>
          Add Task
        </NeonButton>
        <NeonButton fullWidth onClick={() => handleAction("removeTask")}>
          Remove Task
        </NeonButton>
        <NeonButton fullWidth onClick={() => handleAction("findTask")}>
          Find Task
        </NeonButton>
        <NeonButton fullWidth onClick={() => handleAction("assignTask")}>
          Assign Task
        </NeonButton>
        <NeonButton fullWidth onClick={() => handleAction("getAllUsers")}>
          Get All Users
        </NeonButton>
        <NeonButton fullWidth onClick={() => handleAction("removeUser")}>
          Remove User
        </NeonButton>
        <NeonButton fullWidth onClick={handleGoToBoard}>
          Go to Board
        </NeonButton>
      </Sidebar>
      <ContentArea>
        {action === "register" && (
          <RegisterEmployeeForm
            onClose={() => {
              setAction(null);
              setResult(null);
            }}
          />
        )}
        {action === "addTask" && (
          <Box
            component="form"
            onSubmit={submitAddTask}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h6">Add Task</Typography>
            <NeonTextField
              label="Description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              fullWidth
            />
            <NeonTextField
              label="Due Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dueDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel sx={{ color: "#39ff14" }}>Status</InputLabel>
              <Select
                value={formData.status || "To Do"}
                label="Status"
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#39ff14",
                  },
                  color: "white",
                }}
              >
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl>
            <NeonButton type="submit">Submit</NeonButton>
            <NeonButton
              onClick={() => {
                setAction(null);
                setResult(null);
              }}
            >
              Cancel
            </NeonButton>
            {/* Display the validation message below the Cancel button */}
            {result && (
              <Typography sx={{ mt: 2, color: "red" }}>{result}</Typography>
            )}
          </Box>
        )}

        {action === "removeTask" && (
          <Box
            component="form"
            onSubmit={submitRemoveTask}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h6">Remove Task</Typography>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "#39ff14" }}>Select Task</InputLabel>
              <Select
                value={formData.taskId || ""}
                onChange={(e) =>
                  setFormData({ ...formData, taskId: e.target.value })
                }
                label="Select Task"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#39ff14",
                  },
                  color: "white",
                }}
              >
                {tasks.map((task) => (
                  <MenuItem
                    key={task.taskId || task._id}
                    value={task.taskId || task._id}
                  >
                    {task.description} (ID: {task.taskId || task._id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <NeonButton type="submit">Remove</NeonButton>
            <NeonButton
              onClick={() => {
                setAction(null);
                setResult(null);
              }}
            >
              Cancel
            </NeonButton>
          </Box>
        )}
        {action === "findTask" && (
          <Box
            component="form"
            onSubmit={submitFindTask}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h6">Find Task</Typography>
            <NeonTextField
              label="Task ID"
              value={formData.taskId || ""}
              onChange={(e) =>
                setFormData({ ...formData, taskId: e.target.value })
              }
              fullWidth
            />
            <NeonButton type="submit">Find</NeonButton>
            <NeonButton
              onClick={() => {
                setAction(null);
                setResult(null);
              }}
            >
              Cancel
            </NeonButton>
            {result && <Typography sx={{ mt: 2 }}>{result}</Typography>}
          </Box>
        )}
        {action === "assignTask" && (
          <Box
            component="form"
            onSubmit={submitAssignTask}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h6">Assign Task</Typography>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "#39ff14" }}>
                Select Employee (Role ID)
              </InputLabel>
              <Select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                label="Select Employee (Role ID)"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#39ff14",
                  },
                  color: "white",
                }}
              >
                {assignUsers.map((user) => (
                  <MenuItem key={user.roleId} value={user.roleId}>
                    {user.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "#39ff14" }}>Select Task</InputLabel>
              <Select
                value={
                  assignTaskObj ? assignTaskObj.taskId || assignTaskObj._id : ""
                }
                onChange={(e) => {
                  const selectedTaskId = e.target.value;
                  const selectedTask =
                    tasks.find((t) => t.taskId === selectedTaskId) ||
                    tasks.find((t) => t._id === selectedTaskId);
                  setAssignTaskObj(selectedTask);
                }}
                label="Select Task"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#39ff14",
                  },
                  color: "white",
                }}
              >
                {tasks.map((task) => (
                  <MenuItem
                    key={task.taskId || task._id}
                    value={task.taskId || task._id}
                  >
                    {task.description} (ID: {task.taskId || task._id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <NeonButton type="submit">Assign</NeonButton>
            <NeonButton
              onClick={() => {
                setAction(null);
                setResult(null);
              }}
            >
              Cancel
            </NeonButton>
            {result && <Typography sx={{ mt: 2 }}>{result}</Typography>}
          </Box>
        )}
        {action === "removeUser" && (
          <Box
            component="form"
            onSubmit={submitRemoveUser}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h6">Remove User</Typography>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "#39ff14" }}>Select User</InputLabel>
              <Select
                value={removeUserRoleId}
                onChange={(e) => setRemoveUserRoleId(e.target.value)}
                label="Select User"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#39ff14",
                  },
                  color: "white",
                }}
              >
                {assignUsers.map((user) => (
                  <MenuItem key={user.roleId} value={user.roleId}>
                    {user.name} ({user.email})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <NeonButton type="submit">Remove User</NeonButton>
            <NeonButton
              onClick={() => {
                setAction(null);
                setResult(null);
              }}
            >
              Cancel
            </NeonButton>
          </Box>
        )}
        {action === "getAllUsers" && (
          <Box
            component="form"
            onSubmit={submitGetAllUsers}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h6">Get All Users</Typography>
            <NeonButton type="submit">Fetch Users</NeonButton>
            <NeonButton
              onClick={() => {
                setAction(null);
                setResult(null);
              }}
            >
              Cancel
            </NeonButton>
            {result && (
              <Box sx={{ whiteSpace: "pre-wrap", mt: 2 }}>{result}</Box>
            )}
          </Box>
        )}
        {action === null && (
          <>
            <Typography variant="h5">Task List</Typography>
            {tasks.length ? (
              tasks.map((task) => (
                <Typography key={task.taskId || task._id}>
                  {task.description} |{" "}
                  {new Date(task.dueDate).toLocaleDateString()} | {task.status}
                </Typography>
              ))
            ) : (
              <Typography>No tasks found.</Typography>
            )}
          </>
        )}
        {result && action === null && (
          <Typography sx={{ mt: 2 }}>{result}</Typography>
        )}
      </ContentArea>
    </DashboardContainer>
  );
};

export default ManagerDashBoard;
