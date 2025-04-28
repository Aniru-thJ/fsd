package UserAuthentication.demo.Service;

import UserAuthentication.demo.Domain.User;

public interface TokenGenerator {

    public String generateToken(User user);
}
