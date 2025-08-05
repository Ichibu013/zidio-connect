package com.z_connect.common.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a skill in the application.
 * Corresponds to the 'skills' table in the database.
 */
@Data
@Entity
@Table(name = "job_categories")
@NoArgsConstructor
@AllArgsConstructor
public class JobCategory {

    /**
     * The unique identifier for the skill.
     * This field is the primary key and is auto-incremented by the database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The name of the skill.
     * This field is a varchar(100), cannot be null, and must be unique.
     */
    @Column(name = "category_name",length = 100,nullable = false,unique = true)
    @NotNull
    private String category_name;

}
