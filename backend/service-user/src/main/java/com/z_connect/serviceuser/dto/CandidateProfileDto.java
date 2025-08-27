package com.z_connect.serviceuser.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CandidateProfileDto {

    private Long companyId;

    private String phoneNumber;

    private String country;

    private String bio;

    private String currentLocation;

    private boolean willingToRelocate = false;

    private BigDecimal expectedSalaryMin;

    private BigDecimal expectedSalaryMax;

    private String currency;

    private String jobSearchStatus = "ACTIVELY_LOOKING";

    private String resume;

    private String education;

    private String workExperience;
}
