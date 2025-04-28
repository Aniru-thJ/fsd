package Kanban.Services.Kanbanservice.Service;

import Kanban.Services.Kanbanservice.Domain.Task;
import Kanban.Services.Kanbanservice.Exception.TaskNotFoundException;
import Kanban.Services.Kanbanservice.Repository.ITaskRepository;
import Kanban.Services.Kanbanservice.Repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private ITaskRepository iTaskRepository;

    // Inject IUserRepository to update users' task lists on removal
    @Autowired
    private IUserRepository iUserRepository;

    public TaskServiceImpl(ITaskRepository iTaskRepository) {
        this.iTaskRepository = iTaskRepository;
    }

    @Override
    public List<Task> getTasks() {
        return iTaskRepository.findAll();
    }

    @Override
    public Optional<Task> findTaskByUserId(String roleId) {
        return iTaskRepository.findById(roleId);
    }

    @Override
    public Task addTask(Task task) {
        return iTaskRepository.save(task);
    }

    @Override
    public boolean removeTask(String taskId) throws TaskNotFoundException {
        if (!iTaskRepository.existsById(taskId)) {
            throw new TaskNotFoundException("Task with ID " + taskId + " not found.");
        }
        // Remove the task from the tasks collection
        iTaskRepository.deleteById(taskId);

        // Remove the task from all users' task lists
        iUserRepository.findAll().forEach(user -> {
            if (user.getTasks() != null) {
                boolean removed = user.getTasks().removeIf(t -> t.getTaskId().equals(taskId));
                if (removed) {
                    iUserRepository.save(user);
                }
            }
        });
        return true;
    }

    @Override
    public Task changeTaskStatus(String taskId, String status) {
        Task task = iTaskRepository.findById(taskId).orElse(null);
        if (task != null) {
            task.setStatus(status);
            return iTaskRepository.save(task);
        }
        return null;
    }

    @Override
    public List<Task> sortTask(Date dueDate) {
        return iTaskRepository.sortTasksByDueDate(dueDate);
    }
}
