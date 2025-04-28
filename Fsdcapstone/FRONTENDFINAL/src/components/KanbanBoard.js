import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "styled-components";
import KanbanCard from "./KanbanCard";
import { kanbanApi } from "./api";

const BoardContainer = styled(Box)`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  // min-height: calc(100vh - 64px);
  background-color: #121212;
`;

const Column = styled(Box)`
  width: 30%;
  background: #000;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba(57, 255, 20, 0.6);
`;

const ColumnTitle = styled(Typography)`
  && {
    color: #39ff14;
    text-align: center;
    font-weight: bold;
    margin-bottom: 15px;
  }
`;

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const columns = ["To Do", "In Progress", "Done"];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await kanbanApi.get("/task");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const moveTask = async (taskId, status) => {
    try {
      await axios.put(
        `http://localhost:8089/api/task/${taskId}/status/${status}`
      );
      const response = await axios.get("http://localhost:8089/api/task");
      setTasks(response.data);
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  return (
    <BoardContainer>
      {columns.map((col) => (
        <Column key={col}>
          <ColumnTitle variant="h6">{col}</ColumnTitle>
          {tasks
            .filter((task) => task.status === col)
            .map((task) => (
              <KanbanCard
                key={task.taskId}
                task={task}
                setTasks={setTasks}
                tasks={tasks}
              />
            ))}
        </Column>
      ))}
    </BoardContainer>
  );
};

export default KanbanBoard;
