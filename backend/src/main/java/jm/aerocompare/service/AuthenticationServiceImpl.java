package jm.aerocompare.service;

import jakarta.transaction.Transactional;
import jm.aerocompare.configuration.PropertiesConfig;
import jm.aerocompare.model.User;
import jm.aerocompare.repository.UserRepository;
import jm.aerocompare.security.jwt.JwtUtils;
import jm.aerocompare.security.payload.request.AuthenticationRequest;
import jm.aerocompare.security.payload.response.AuthenticationResponse;
import jm.aerocompare.security.service.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
@Log4j2
public class AuthenticationServiceImpl {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    //    private final RefreshTokenService refreshTokenService;
    private final PropertiesConfig propertiesConfig;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

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

//        List<String> roles = userDetails.getAuthorities().stream()
//                                     .map(item -> item.getAuthority())
//                                     .toList();
        } catch (BadCredentialsException e) {
            System.out.println("Invalid credentials: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
        }
        return null;
    }

    public HttpHeaders createHeaders(AuthenticationResponse jwtResponse) {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add(HttpHeaders.SET_COOKIE, String.valueOf(createAccessTokenCookie(jwtResponse.getToken(), propertiesConfig.getJwtExpirationMs() / 1000)));

//        if (refreshTokenService.findByUser(jwtResponse.getEmail()) != null)
//            refreshTokenService.deleteByUserId(jwtResponse.getId());
//
//        RefreshToken refreshToken = refreshTokenService.createRefreshToken(jwtResponse.getId());
//        responseHeaders.add(HttpHeaders.SET_COOKIE, String.valueOf(createRefreshTokenCookie(refreshToken.getToken(), propertiesConfig.getRefreshTokenExpirationSec())));
        return responseHeaders;
    }

    private HttpCookie createAccessTokenCookie(String token, Long duration) {
        return ResponseCookie.from(propertiesConfig.getAccessTokenCookieName(), token)
                       .maxAge(duration)
                       .httpOnly(false) // false to allow access from frontend (e.g. while reloading page)
                       .sameSite("Strict")
                       .path("/")
                       .build();
    }

    private HttpCookie createRefreshTokenCookie(String token, Long duration) {
        return ResponseCookie.from(propertiesConfig.getRefreshTokenCookieName(), token)
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

//    public String getUserEmailFromAccessToken(String accessToken) {
//        String[] chunks = accessToken.split("\\.");
//        Base64.Decoder decoder = Base64.getUrlDecoder();
//        String payload = new String(decoder.decode(chunks[1]));
//        JsonObject converted = new Gson().fromJson(payload, JsonObject.class);
//        return converted.get("sub").getAsString();
//    }

    public ResponseEntity<AuthenticationResponse> getJwtResponseFromUser(User user) {
        UserDetailsImpl userPrincipal = UserDetailsImpl.build(user);
        String accessToken = jwtUtils.generateJwtToken(userPrincipal);
        AuthenticationResponse jwtResponse = new AuthenticationResponse(
                accessToken,
                user.getId(),
                user.getEmail(),
                user.getRole().name());
        HttpHeaders httpHeaders = createHeaders(jwtResponse);
        return ResponseEntity.ok().headers(httpHeaders).body(jwtResponse);
    }

//    public ResponseEntity<MessageResponse> checkIfTokesExpired(String token) {
//        PasswordReset passwordReset = getPasswordResetByToken(token);
//
//        if (passwordReset != null && passwordReset.getExpirationDate().isAfter(LocalDateTime.now()))
//            return ResponseEntity.ok(new MessageResponse("Token is still valid"));
//        else
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Token expired"));
//    }
}
