package com.z_connect.serviceuser.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileSocialDto {

    private String linkedinUrl;

    private String githubUrl;

    private String portfolioUrl;

}
