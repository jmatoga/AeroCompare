package jm.aerocompare.service;

import jakarta.transaction.Transactional;
import jm.aerocompare.configuration.PropertiesConfig;
import jm.aerocompare.exception.AuthenticationException;
import jm.aerocompare.security.jwt.JwtUtils;
import jm.aerocompare.security.payload.request.AuthenticationRequest;
import jm.aerocompare.security.payload.response.AuthenticationResponse;
import jm.aerocompare.security.service.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl {
    private final PropertiesConfig propertiesConfig;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthenticationResponse authenticateUser(AuthenticationRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken((UserDetailsImpl) authentication.getPrincipal());

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            AtomicReference<String> role = new AtomicReference<>();
            userDetails.getAuthorities().stream()
                    .findFirst()
                    .ifPresent((authority) -> role.set(authority.getAuthority()));

            return new AuthenticationResponse(jwt,
                    userDetails.getId(),
                    userDetails.getEmail(),
                    role.get());

        } catch (BadCredentialsException e) {
            throw new AuthenticationException("Invalid credentials: " + e.getMessage());
        } catch (Exception e) {
            throw new AuthenticationException("Authentication failed: " + e.getMessage());
        }
    }

    public HttpHeaders createHeaders(AuthenticationResponse jwtResponse) {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add(HttpHeaders.SET_COOKIE, String.valueOf(createAccessTokenCookie(jwtResponse.getToken(),
                propertiesConfig.getJWT_EXPIRATION_MS() / 1000)));
        return responseHeaders;
    }

    private HttpCookie createAccessTokenCookie(String token, Long duration) {
        return ResponseCookie.from(propertiesConfig.getACCESS_TOKEN_COOKIE_NAME(), token)
                       .maxAge(duration)
                       .httpOnly(false) // false to allow access from frontend (e.g. while reloading page)
                       .sameSite("Strict")
                       .path("/")
                       .build();
    }

    @Transactional
    public ResponseEntity<AuthenticationResponse> getJwtResponseResponseEntity(AuthenticationRequest loginRequest) {
        AuthenticationResponse jwtResponse = authenticateUser(loginRequest);
        HttpHeaders responseHeaders = createHeaders(jwtResponse);
        return ResponseEntity.ok().headers(responseHeaders).body(jwtResponse);
    }
}
