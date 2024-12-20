package jm.aerocompare.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jm.aerocompare.configuration.PropertiesConfig;
import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.security.service.UserDetailsServiceImpl;
import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@Log4j2
public class AuthTokenFilter extends OncePerRequestFilter {
    private final PropertiesConfig propertiesConfig;
    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;
    private final String[] allowedPaths;

    public AuthTokenFilter(PropertiesConfig propertiesConfig, JwtUtils jwtUtils, UserDetailsServiceImpl userDetailsService, @Qualifier("allowedPaths") String[] allowedPaths) {
        this.propertiesConfig = propertiesConfig;
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
        this.allowedPaths = allowedPaths;
    }

    private String getJwtFromAccessCookieOrBearerToken(HttpServletRequest request) throws CurrentUserNotAuthenticatedException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer "))
            return authHeader.substring(7);

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (propertiesConfig.getACCESS_TOKEN_COOKIE_NAME().equals(cookie.getName()))
                    return cookie.getValue();
            }
        }

        throw new CurrentUserNotAuthenticatedException();
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        if (List.of(allowedPaths).contains(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String jwtAccessFromCookie = getJwtFromAccessCookieOrBearerToken(request);

            if (jwtAccessFromCookie != null && jwtUtils.validateJwtToken(jwtAccessFromCookie)) {
                String email = jwtUtils.getUsernameFromJwtToken(jwtAccessFromCookie);

                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            log.info("Cannot set user authentication! Error:\n{}", Arrays.toString(e.getStackTrace()));
        }
        filterChain.doFilter(request, response);
    }
}