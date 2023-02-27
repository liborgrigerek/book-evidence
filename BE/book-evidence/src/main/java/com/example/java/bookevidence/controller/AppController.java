package com.example.java.bookevidence.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.java.bookevidence.util.CommonUtil;

/**
 * Application Controller.
 * Common information about application.
 *
 * @author Libor Grigerek
 */
 @RestController
 @RequestMapping(path = CommonUtil.APP_URL)
 public class AppController {
     // logger 
     private static final Logger log = LoggerFactory.getLogger(AppController.class);

     // properties
     @Value("${app.version}")
     private String version;

     /**
      * Returns version of application.
      * @return version of application.
      */
     @GetMapping(value = "version")
     public ResponseEntity<String> getAppVersion() {
        log.debug("getAppVersion() started.");
        try {
            log.debug("version={}", version);
            return ResponseEntity.ok(version);
        } catch (Exception ex) {
            log.error("getVersion() error: {}", ex.getMessage());
            throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
        }
     }
      
}
