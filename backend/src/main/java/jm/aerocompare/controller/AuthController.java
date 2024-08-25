package jm.aerocompare.controller;

import jm.aerocompare.configuration.PropertiesConfig;
//import jm.aerocompare.mapper.UserMapper;
import jm.aerocompare.mapper.UserMapper;
import jm.aerocompare.model.User;
import jm.aerocompare.security.payload.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import jm.aerocompare.security.payload.request.*;
import jm.aerocompare.security.payload.response.AuthenticationResponse;
import jm.aerocompare.service.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Log4j2
public class AuthController {

    private final AuthenticationServiceImpl authenticationService;
//    private final RefreshTokenService refreshTokenService;
    private final UserService userService;
    private final PropertiesConfig propertiesConfig;
    private final UserMapper userMapper;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody AuthenticationRequest loginRequest) {
        return authenticationService.getJwtResponseResponseEntity(loginRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageResponse> logoutUser(@CookieValue(name = "refreshToken",required = false) String refreshToken) {
//        if(refreshToken!=null)
//            refreshTokenService.deleteByToken(refreshToken);
//        else {
//            try {
//                refreshTokenService.deleteByUserId(userService.getCurrentUser().getId());
//            } catch (CurrentUserNotAuthenticatedException e) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//            }
//        }

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add(HttpHeaders.SET_COOKIE, String.valueOf(createAccessTokenCookie("", 0L)));
       // responseHeaders.add(HttpHeaders.SET_COOKIE, String.valueOf(createRefreshTokenCookie("", 0L)));

        return ResponseEntity.ok().headers(responseHeaders).body(new MessageResponse("Log out successful!"));
    }

    public HttpCookie createAccessTokenCookie(String token, Long duration) {
        return ResponseCookie.from(propertiesConfig.getAccessTokenCookieName(), token)
                       .maxAge(duration)
                       .httpOnly(true)
                       .sameSite("Strict")
                       .path("/")
                       .build();
    }

    public HttpCookie createRefreshTokenCookie(String token, Long duration) {
        return ResponseCookie.from(propertiesConfig.getRefreshTokenCookieName(), token)
                       .maxAge(duration)
                       .httpOnly(true)
                       .sameSite("Strict")
                       .path("/")
                       .build();
    }

    @PostMapping("/register")
    ResponseEntity<MessageResponse> registerUser(@RequestBody RegisterRequest signUpRequest) {
        User user = userMapper.mapToUser(signUpRequest);
        userService.registerUser(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
