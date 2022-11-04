package com.portafolio.mgb.security.jwt;

import com.portafolio.mgb.security.Services.UserDetailsImpl;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

/*
Usa la clase JwtProvider para validar de nuevo el token y se ejecutara 
cada vez que queramos hacer una modificacion
 */
public class JwtTokenFilter extends OncePerRequestFilter {

    private final static Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Autowired
    JwtProvider jwtProv;
    @Autowired
    UserDetailsImpl userDI;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = getToken(request);
            if (token != null && jwtProv.validateToken(token)) {
                String username = jwtProv.getUsernameFromToken(token);
                
                UserDetails userDetails = userDI.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(auth);

            }
        } catch (Exception ex) {
            logger.error("Fallo el metodo doFilterInternal - " + ex.getMessage());

        }
        filterChain.doFilter(request, response);
    }
    
   

    private String getToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer")){
            return header.replace("Bearer", "");
        }
        return null;
    }
}
