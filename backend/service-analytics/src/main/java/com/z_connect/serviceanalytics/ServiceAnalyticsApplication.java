package com.z_connect.serviceanalytics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.z_connect.common","com.z_connect.serviceanalytics"})
public class ServiceAnalyticsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceAnalyticsApplication.class, args);
    }

}
