package com.z_connect.common.model;

import com.z_connect.common.enums.CompanySize;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

/**
 * Represents a company in the application.
 * Corresponds to the 'companies' table in the database.
 */
@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    /**
     * The unique identifier for the company.
     * This field is the primary key and is auto-incremented by the database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The name of the company.
     * This field is not null and must be unique.
     */
    @Column(name = "name", nullable = false, unique = true)
    @NotNull
    private String name;

    /**
     * A description of the company.
     */
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    /**
     * The company's website URL.
     */
    @Column(name = "website")
    private String website;

    /**
     * The URL of the company's logo.
     */
    @Column(name = "logo_url")
    private String logoUrl;

    /**
     * The industry the company operates in.
     */
    @Column(name = "industry")
    private String industry;

    /**
     * The size of the company, represented by an enum.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "company_size")
    private CompanySize companySize;

    /**
     * The company's location.
     */
    @Column(name = "location")
    private String location;

    /**
     * The timestamp when the company record was created.
     * This is automatically set by the database.
     */
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp createdAt;

    /**
     * The timestamp when the company record was last updated.
     * This is automatically updated by the database.
     */
    @Column(name = "updated_at", nullable = false)
    @UpdateTimestamp
    private Timestamp updatedAt;
}



