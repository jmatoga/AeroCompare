package jm.aerocompare.security.jwt;

import java.text.ParseException;
import java.util.Date;

import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.JWTParser;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


import jm.aerocompare.security.service.UserDetailsImpl;

import javax.crypto.SecretKey;

@Component
@Log
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    @Value("${aerocompare.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(UserDetailsImpl userPrincipal) {
        return Jwts.builder()
                       .setSubject((userPrincipal.getUsername()))
                       .setIssuedAt(new Date())
                       .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                       .signWith(key, SignatureAlgorithm.HS512)
                       .compact();
    }

    public String generateTokenFromUsername(String username) {
        return Jwts.builder().setSubject(username).setIssuedAt(new Date())
                       .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                       .signWith(key, SignatureAlgorithm.HS512)
                       .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        Claims claims = Jwts.parserBuilder()
                                .setSigningKey(key)
                                .build()
                                .parseClaimsJws(token)
                                .getBody();

        return claims.getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            JWTParser.parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
            return false;
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
            return false;
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
            return false;
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
            return false;
        } catch (ParseException e) {
            logger.error("Token failed to parse: {}", e.getMessage());
            return false;
        }
    }

    public String getEmailFromJwtResponse(String token) throws ParseException {
        JWT jwt = JWTParser.parse(token);
        JWTClaimsSet claimsSet = jwt.getJWTClaimsSet();
        return claimsSet.getStringClaim("email");
    }

}
