package Kanban.Services.Kanbanservice.Repository;


import Kanban.Services.Kanbanservice.Domain.Task;//
//import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ITaskRepository extends MongoRepository <Task,String>{

   // @Modifying
    @Query("Update Task t SET t.status = :status WHERE t.taskId = :taskId")
    void changeTaskByStatus(@Param("taskId") String taskId, @Param("status") String status);

    @Query("SELECT t FROM Task t ORDER BY t.dueDate ASC")
    List<Task> sortTasksByDueDate(Date dueDate);


}
