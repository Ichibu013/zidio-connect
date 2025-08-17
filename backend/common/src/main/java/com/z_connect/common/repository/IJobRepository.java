package com.z_connect.common.repository;

import com.z_connect.common.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IJobRepository extends JpaRepository<Job, Long> {
}
