package UserAuthentication.demo.Repository;

import UserAuthentication.demo.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {


    User findByEmailAndPassword(String email, String password);
}
