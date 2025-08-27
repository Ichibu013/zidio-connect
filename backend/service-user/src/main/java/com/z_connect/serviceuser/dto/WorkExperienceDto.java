package com.z_connect.serviceuser.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkExperienceDto {

    private String title;

    private String companyName;

    private String location;

    private String startDate;

    private String endDate;

    private String description;

    private boolean isCurrent;

}
