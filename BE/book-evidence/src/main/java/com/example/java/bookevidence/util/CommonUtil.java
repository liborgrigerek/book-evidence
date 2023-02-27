package com.example.java.bookevidence.util;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * Common Utilities.
 * 
 * @author Libor Grigerek
 */

public class CommonUtil {
    // list of endpoints URL
    public static final String APP_URL = "/app/";
    public static final String AUTHOR_URL = "/author/";

    /**
     * Returns stack trace from given exception as a string
     * <a href="https://stackoverflow.com/questions/1149703/how-can-i-convert-a-stack-trace-to-a-string">...</a>
     * @param ex exception
     * @return stack trace from given exception as a string
     */
    public static String getStackTraceFromException(Exception ex) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        ex.printStackTrace(pw);
        return sw.toString();
    }
   
}
