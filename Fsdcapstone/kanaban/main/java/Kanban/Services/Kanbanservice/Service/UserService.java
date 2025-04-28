package Kanban.Services.Kanbanservice.Service;

import Kanban.Services.Kanbanservice.Domain.Task;
import Kanban.Services.Kanbanservice.Domain.Users;
import java.util.List;

public interface UserService {
    String assignTaskById(String roleId, Task task);
    List<Users> getAllUsers();
    Users addUser(Users users);
    void removeUser(String roleId);
}
