package UserAuthentication.demo.Service;

import UserAuthentication.demo.Domain.User;
import UserAuthentication.demo.Exceptions.UserNotFoundException;
import UserAuthentication.demo.Repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    public UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User Registration(User user) {
        if (user == null || user.getEmail() == null || user.getPassword() == null) {
            throw new IllegalArgumentException("User details cannot be null");
        }
        return userRepository.save(user);
    }

    @Override
    public User loginUser(String email, String password) throws UserNotFoundException{

        User user = userRepository.findByEmailAndPassword(email, password);
        if (user == null) {
            throw new UserNotFoundException("User Not Found");
        } else {
            return user;
        }
    }

    @Override
    public void forgotPassword(String email) {
        Optional<User> optionalUser = userRepository.findById(email);
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("User not found with email: " + email);
        }
        User user = optionalUser.get();
        // Generate a reset token (using JWT here with a short expiration)
        String resetToken = Jwts.builder()
                .setSubject(email)
                .claim("name", user.getName())
                .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000)) // 15 minutes expiry
                .signWith(SignatureAlgorithm.HS256, "resetKey")
                .compact();
        // Build the reset link with your actual frontend URL (e.g., localhost:3000)
        String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;

        try {
            // Use MimeMessage for HTML email
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(email);
            helper.setSubject("Password Reset Request");
            String htmlContent = "<p>Dear " + user.getName() + ",</p>"
                    + "<p>To reset your password, please click the following link:</p>"
                    + "<p><a href=\"" + resetLink + "\" target=\"_blank\">Reset Password</a></p>"
                    + "<p>This link will expire in 15 minutes.</p>"
                    + "<p>If you did not request a password reset, please ignore this email.</p>";
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Error sending email: " + e.getMessage());
        }
    }




    @Override
    public void resetPassword(String token, String newPassword) {
        // Parse the token to retrieve email
        String email;
        try {
            email = Jwts.parser()
                    .setSigningKey("resetKey")
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid or expired token");
        }
        Optional<User> optionalUser = userRepository.findById(email);
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("User not found");
        }
        User user = optionalUser.get();
        // Update the password (in a real app, you would hash it)
        user.setPassword(newPassword);
        userRepository.save(user);
    }
}

