package UserAuthentication.demo.Service;

import UserAuthentication.demo.Domain.User;

public interface IUserService {
    User Registration(User user);
    User loginUser(String email, String password);
    void forgotPassword(String email);
    void resetPassword(String token, String newPassword);
}

