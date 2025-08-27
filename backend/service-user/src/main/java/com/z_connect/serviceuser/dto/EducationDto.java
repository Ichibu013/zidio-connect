package com.z_connect.serviceuser.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EducationDto {

    private String degree;

    private String institution;

    private String major;

    private String startDate;

    private String endDate;

    private String grade;

    private String location;

    private boolean isCurrentEducation;
}
