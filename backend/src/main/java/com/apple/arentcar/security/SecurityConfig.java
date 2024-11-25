package com.apple.arentcar.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private final CorsFilter corsFilter;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(CorsFilter corsFilter) {
        this.corsFilter = corsFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())  // CSRF 비활성화
                .addFilterBefore(corsFilter, CorsFilter.class)
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/arentcar/user/**").permitAll()
<<<<<<< HEAD
                        .requestMatchers("/arentcar/manager/**").permitAll()
                        .requestMatchers("/arentcar/manager/admins/login", "/arentcar/manager/admins/refresh", "/arentcar/manager/menus").permitAll()
//                        .requestMatchers("/arentcar/manager/**").authenticated()
=======
//                        .requestMatchers("/arentcar/manager/**").permitAll()
                        .requestMatchers("/arentcar/manager/admins/login", "/arentcar/manager/admins/refresh", "/arentcar/manager/menus").permitAll()
                        .requestMatchers("/ws/visitor/**").permitAll()
                        .requestMatchers("/arentcar/manager/**").authenticated()
>>>>>>> 951208bf89423d692882ff5d76df2ef9039ac76e
                        .anyRequest().authenticated()  // 나머지 요청은 인증 필요
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // 세션을 사용하지 않음
                );

        return http.build();
    }
}
