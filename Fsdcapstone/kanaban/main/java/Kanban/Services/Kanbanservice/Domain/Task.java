package Kanban.Services.Kanbanservice.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document
public class Task {
    @Id
    private String taskId;
    private String description;
    private Date dueDate;
    private String status; // To-do, On-going, Review, Finalized
    private String assignedTo;


    public Task() {
    }

    public Task(String description, Date dueDate, String status, String taskId, String assignedTo) {
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        this.taskId = taskId;
        this.assignedTo = assignedTo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    @Override
    public String toString() {
        return "Task{" +
                "description='" + description + '\'' +
                ", taskId='" + taskId + '\'' +
                ", dueDate=" + dueDate +
                ", status='" + status + '\'' +
                '}';
    }
}
