package Kanban.Services.Kanbanservice.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Users {
    @Id
    private String roleId;
    private String email;
    private String password;
    private String name;
    private List<Task> tasks;
    @Override
    public String toString()
    {
        return "Users{" +
                "roleId='" + roleId + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", tasks=" + tasks +
                '}';
    }
    


    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public Users() {
    }

    public Users(String roleId, String email, String password, String name, List<Task> tasks) {
        this.roleId = roleId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.tasks = tasks;
    }
}
