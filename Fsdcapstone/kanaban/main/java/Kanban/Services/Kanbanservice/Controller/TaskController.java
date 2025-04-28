package Kanban.Services.Kanbanservice.Controller;

import Kanban.Services.Kanbanservice.Domain.Task;
import Kanban.Services.Kanbanservice.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getAllTask() {

      return new ResponseEntity(taskService.getTasks(), HttpStatus.OK);
    }

    @PostMapping ("/addTask")
    public ResponseEntity<Task> addTask(@RequestBody Task task){
        taskService.addTask(task);
        return new ResponseEntity ("Task Added",HttpStatus.OK);
    }

    @DeleteMapping("/{taskId}")
public ResponseEntity<String> removeTask(@PathVariable String taskId){
        boolean removedTask = taskService.removeTask(taskId);
        if(removedTask){
            return new ResponseEntity<>("Task removed succesfully",HttpStatus.OK);
        }
        return new ResponseEntity("Task not found",HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{taskId}/status/{status}")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable String taskId,@PathVariable String status){
        Task updatedTask = taskService.changeTaskStatus(taskId,status);
        if(updatedTask != null){
            return ResponseEntity.ok(updatedTask);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/sorted")
    public ResponseEntity<List<Task>> getSortedTasks(Date duedate) {
        return ResponseEntity.ok(taskService.sortTask(duedate));
    }



}
