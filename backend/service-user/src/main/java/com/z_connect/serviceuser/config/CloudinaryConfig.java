package com.z_connect.serviceuser.config;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

/**
 * Configuration class for integrating with the Cloudinary API, which manages
 * cloud-based image and video storage and processing.
 *
 * This class reads Cloudinary credentials (cloud name, API key, and API secret)
 * from the application's properties and provides a bean to create a
 * {@link Cloudinary} instance.
 */
@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    /**
     * Creates and configures a {@link Cloudinary} instance with the necessary
     * credentials including cloud name, API key, and API secret.
     *
     * @return a configured {@link Cloudinary} instance for interacting with the Cloudinary API.
     */
    @Bean
    public Cloudinary cloudinary() {
        Map<String, Object> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);
        return new Cloudinary(config);
    }
}
