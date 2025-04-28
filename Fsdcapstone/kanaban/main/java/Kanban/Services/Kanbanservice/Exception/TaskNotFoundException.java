package Kanban.Services.Kanbanservice.Exception;

public class TaskNotFoundException extends RuntimeException
{
    public TaskNotFoundException(String message)
    {
        super(message);
    }
}
