package com.z_connect.common.repository;

import com.z_connect.common.model.JobCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IJobCategoryRepository extends JpaRepository<JobCategory, Long> {
}
