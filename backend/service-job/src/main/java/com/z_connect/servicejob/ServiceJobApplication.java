package com.z_connect.servicejob;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.z_connect.common","com.z_connect.servicejob"})
public class ServiceJobApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceJobApplication.class, args);
    }

}
