package com.z_connect.serviceuser.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String profilePictureUrl;

    private String country;

    private String bio;

    private String currentLocation;

    private String jobSearchStatus;

    private String companyName;

    private ResumeDto resume;

    private EducationDto education;

    private WorkExperienceDto workExperience;

    private List<UserSkillsDto> userSkills;

}
