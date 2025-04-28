package Kanban.Services.Kanbanservice.Controller;

import Kanban.Services.Kanbanservice.Domain.Task;
import Kanban.Services.Kanbanservice.Domain.Users;
import Kanban.Services.Kanbanservice.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping()
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/adduser")
    public ResponseEntity<?> addUser(@RequestBody Users users) {
        try {
            Users addedUser = userService.addUser(users);
            return new ResponseEntity("User added", HttpStatus.OK);
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/{roleId}/task")
    public ResponseEntity<String> assignTaskToUser(@PathVariable String roleId, @RequestBody Task task) {
        String message = userService.assignTaskById(roleId, task);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/remove/{roleId}")
    public ResponseEntity<String> removeUser(@PathVariable String roleId) {
        try {
            userService.removeUser(roleId);
            return new ResponseEntity<>("User removed successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error removing user", HttpStatus.BAD_REQUEST);
        }
    }
}
