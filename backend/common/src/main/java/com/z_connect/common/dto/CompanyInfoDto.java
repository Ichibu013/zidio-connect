package com.z_connect.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyInfoDto {

    private String name;

    private String description;

    private String website;

    private String logoUrl;

    private String industry;

    private String companySize;

    private String location;

}
