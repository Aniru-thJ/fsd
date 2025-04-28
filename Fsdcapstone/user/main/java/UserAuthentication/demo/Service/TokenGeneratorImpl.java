package UserAuthentication.demo.Service;

import UserAuthentication.demo.Domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class TokenGeneratorImpl implements TokenGenerator {
    @Override
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("name", user.getName()) // Include the name claim
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "key123")
                .compact();
    }
}
