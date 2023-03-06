package com.example.java.bookevidence.configuration;

import com.example.java.bookevidence.util.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;

/**
 * Web Security Configuration.
 * 
 * Note: Access of H2 console: 
 *  https://stackoverflow.com/questions/74680244/h2-database-console-not-opening-with-spring-security
 *  https://github.com/spring-projects/spring-security/issues/12546
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
        http
                .authorizeHttpRequests( auth -> {
                        // TODO: @@@@ remove this after login is solved @@@@
                        auth.requestMatchers("/**").permitAll();
                        auth.requestMatchers(HttpMethod.POST, "/**").permitAll();
                        
                        // permit access to information about application
                        auth.requestMatchers(CommonUtil.APP_URL + "**").permitAll();
                        // grant access to H2 console
                        auth.requestMatchers(toH2Console()).permitAll();
                    }
                )
                .headers( headers ->
                    headers.frameOptions().disable()
                )
                .csrf( csrf -> {
                        // grant access to H2 console
                        // csrf.ignoringRequestMatchers(toH2Console()); // needed in case if csrf is enabled
                        csrf.disable();
                    }
                )
        ;
        return http.build();
    }

}
