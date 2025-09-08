package com.z_connect.serviceuser;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"com.z_connect.common","com.z_connect.serviceuser"})
@ComponentScan(basePackages = {"com.z_connect.common","com.z_connect.serviceuser"})
@EnableJpaRepositories(basePackages = {"com.z_connect.common","com.z_connect.serviceuser"})
public class ServiceUserApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceUserApplication.class, args);
    }

}
