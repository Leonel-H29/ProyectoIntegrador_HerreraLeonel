package com.portafolio.mgb.security.jwt;

import com.portafolio.mgb.security.Entidad.MainUser;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

/* 
Esta es la clase que genera el token, ademas posee metodos
de validacion que indican si estan bien construidos o no
*/
@Component
public class JwtProvider {
    private final static Logger logger = LoggerFactory.getLogger(JwtProvider.class);
    
    
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private int expiration;
    
    public String generateToken(Authentication auth){
        MainUser mainUser = (MainUser) auth.getPrincipal();
        return Jwts.builder().setSubject(mainUser.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+expiration*1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
    
    public String getUsernameFromToken(String token){
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }
    
    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        }
        catch(MalformedJwtException ex){
            logger.error("Token mal formado");
            //return false;
        }
        catch(UnsupportedJwtException ex){
            logger.error("Token no soportado");
            //return false;
        }
        catch(ExpiredJwtException ex){
            logger.error("Token expirado");
            //return false;
        }
        catch(IllegalArgumentException ex){
            logger.error("Token vacio");
            //return false;
        }
        catch(SignatureException ex){
            logger.error("Firma no valida");
            //return false;
        }
        return false;
    }
    
}
