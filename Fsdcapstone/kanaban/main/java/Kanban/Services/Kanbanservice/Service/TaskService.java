package Kanban.Services.Kanbanservice.Service;

import Kanban.Services.Kanbanservice.Domain.Task;


import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TaskService
{
    public List<Task> getTasks();
    public Optional<Task> findTaskByUserId(String roleId);
     public Task addTask(Task task);
    public boolean  removeTask(String taskId);
    public Task changeTaskStatus(String taskId,String status);
    public List<Task> sortTask(Date dueDate);
}
