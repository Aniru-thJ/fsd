package Kanban.Services.Kanbanservice.Service;

import Kanban.Services.Kanbanservice.Domain.Task;
import Kanban.Services.Kanbanservice.Domain.Users;
import Kanban.Services.Kanbanservice.Repository.ITaskRepository;
import Kanban.Services.Kanbanservice.Repository.IUserRepository;
import Kanban.Services.Kanbanservice.proxy.UserProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private IUserRepository iUserRepository;
    private UserProxy userProxy;

    @Autowired
    private ITaskRepository iTaskRepository; // Used to update tasks

    @Autowired
    public UserServiceImpl(IUserRepository iUserRepository, UserProxy userProxy) {
        this.iUserRepository = iUserRepository;
        this.userProxy = userProxy;
    }

    @Override
    public String assignTaskById(String roleId, Task task) {
        // Capture previous assignment (if any)
        final String previousAssignee = task.getAssignedTo();
        // Capture taskId in a final variable
        final String tId = task.getTaskId();

        // Remove this task from any user who might already have it
        List<Users> allUsers = iUserRepository.findAll();
        for (Users u : allUsers) {
            if (u.getTasks() != null) {
                boolean removed = u.getTasks().removeIf(t -> t.getTaskId().equals(tId));
                if (removed) {
                    iUserRepository.save(u);
                }
            }
        }

        // Now, get the target user
        Optional<Users> usersOptional = iUserRepository.findById(roleId);
        if (usersOptional.isPresent()) {
            Users user = usersOptional.get();
            if (user.getTasks() == null) {
                user.setTasks(new ArrayList<>());
            }
            // Check if this user already has the task assigned
            boolean alreadyAssigned = user.getTasks().stream()
                    .anyMatch(t -> t.getTaskId().equals(tId));
            if (alreadyAssigned) {
                return "Task already assigned to the user.";
            }
            // Set the assignedTo field in the task to the user's name
            task.setAssignedTo(user.getName());
            // Save the task so that the updated assignedTo field is persisted
            task = iTaskRepository.save(task);
            // Add the task to the user's task list and update the user document
            user.getTasks().add(task);
            iUserRepository.save(user);
            if (previousAssignee != null && !previousAssignee.equals(user.getName())) {
                return "Task reassigned";
            }
            return "Task assigned";
        } else {
            throw new IllegalArgumentException("User not found with role ID: " + roleId);
        }
    }

    @Override
    public List<Users> getAllUsers() {
        return iUserRepository.findAll();
    }

    @Override
    public Users addUser(Users users) {
        // Check if the email already exists
        Optional<Users> existingUser = iUserRepository.findByEmail(users.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Email already exists. Please sign in.");
        }
        userProxy.register(users);
        return iUserRepository.save(users);
    }

    @Override
    public void removeUser(String roleId) {
        // First, find the user to be removed
        Optional<Users> userOpt = iUserRepository.findById(roleId);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            String userName = user.getName();

            // Iterate over all tasks and clear the assignedTo field if it matches the user's name
            List<Task> allTasks = iTaskRepository.findAll();
            for (Task t : allTasks) {
                if (userName.equals(t.getAssignedTo())) {
                    t.setAssignedTo(null);
                    iTaskRepository.save(t);
                }
            }

            // Now remove the user from the database
            iUserRepository.deleteById(roleId);
        } else {
            throw new IllegalArgumentException("User not found with role ID: " + roleId);
        }
    }

}
