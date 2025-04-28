package Kanban.Services.Kanbanservice.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class KanbanBoard {
    @Id
    private int KanbanBoardId;
    private String KanbanBoardName;
    private List<Users> users;
    private List<Task> Task;

    public KanbanBoard() {
    }

    public KanbanBoard(int kanbanBoardId, String kanbanBoardName, List<Users> users, List<Task> Task) {
        KanbanBoardId = kanbanBoardId;
        KanbanBoardName = kanbanBoardName;
        this.users = users;
        this.Task = Task;
    }

    public int getKanbanBoardId() {
        return KanbanBoardId;
    }

    public void setKanbanBoardId(int kanbanBoardId) {
        KanbanBoardId = kanbanBoardId;
    }

    public String getKanbanBoardName() {
        return KanbanBoardName;
    }

    public void setKanbanBoardName(String kanbanBoardName) {
        KanbanBoardName = kanbanBoardName;
    }

    public List<Users> getUsers() {
        return users;
    }

    public void setUsers(List<Users> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "KanbanBoard{" +
                "KanbanBoardId=" + KanbanBoardId +
                ", KanbanBoardName='" + KanbanBoardName + '\'' +
                ", users=" + users +
                '}';
    }
}
