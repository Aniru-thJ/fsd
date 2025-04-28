package Kanban.Services.Kanbanservice.Repository;

import Kanban.Services.Kanbanservice.Domain.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface IUserRepository extends MongoRepository<Users, String> {
    // Existing method
    Users findByEmailAndPassword(String email, String password);

    // New method to check if a user with a given email exists
    Optional<Users> findByEmail(String email);
}
