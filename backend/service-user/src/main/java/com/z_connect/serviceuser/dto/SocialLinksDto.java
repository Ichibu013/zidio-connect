package com.z_connect.serviceuser.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocialLinksDto {

    private String linkedinUrl;

    private String githubUrl;

    private String portfolioUrl;
}
