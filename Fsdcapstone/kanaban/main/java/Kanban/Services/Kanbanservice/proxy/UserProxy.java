package Kanban.Services.Kanbanservice.proxy;


import Kanban.Services.Kanbanservice.Domain.Users;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "demo", url = "http://localhost:8084")
public interface UserProxy {

    @PostMapping("/users/register")
    public ResponseEntity<?> register(@RequestBody Users users);
}