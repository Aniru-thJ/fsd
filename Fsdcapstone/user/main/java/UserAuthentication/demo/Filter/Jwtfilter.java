package UserAuthentication.demo.Filter;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class Jwtfilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        ServletOutputStream pw = httpServletResponse.getOutputStream();
        // expects the token to come from header
        String authHeader =httpServletRequest.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer")){
            System.out.println("insidedofilter IF block");
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            pw.println("Missing or invalid token");
            pw.close();
        } else { //extract token from the header
            System.out.println("insidedofilter Else block Beginning");
            String jwtToken = authHeader.substring(7); // Bearer => 6+1 since token begins with Bearer
            //token validation
            String emailid = Jwts.parser().setSigningKey("key123").parseClaimsJws(jwtToken).getBody().getSubject();
            httpServletRequest.setAttribute("emailid", emailid);
            // pass the claims in the request
            System.out.println("insidedofilter Else block---End "); // redirection
            filterChain.doFilter(servletRequest, servletResponse);
            //some more filters, controller

        }
    }}
