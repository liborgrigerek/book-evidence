package com.example.java.bookevidence.configuration;

import com.example.java.bookevidence.util.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Web Security Configuration.
 *
 * @author Libor Grigerek
 *
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    // logger
    private static final Logger log = LoggerFactory.getLogger(WebSecurityConfig.class);

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() //other request than GET don't work without CSRF disabled
                .authorizeHttpRequests()
                // permit access to information about application
                .requestMatchers(CommonUtil.APP_URL + "**").permitAll()
                // other requests
                .anyRequest().authenticated();
        ;
        return http.build();
    }

}
