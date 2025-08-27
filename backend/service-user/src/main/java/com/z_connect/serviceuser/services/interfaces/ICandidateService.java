package com.z_connect.serviceuser.services.interfaces;

import com.z_connect.common.utils.response.GenericResponse;
import com.z_connect.serviceuser.dto.*;

import java.util.List;
import java.util.Map;

public interface ICandidateService {

    GenericResponse<BasicInfoDto> getBasicCandidateDetails();

    GenericResponse<List<UserDetailsDto>> getCandidates();

    GenericResponse<?> getCandidateDetails();

    GenericResponse<?> getProfilePicture();

    GenericResponse<?> getResumes();

    GenericResponse<?> getEducations();

    GenericResponse<?> getExperiences();

    GenericResponse<?> getSkills();

    GenericResponse<List<UserDetailsDto>> getRecruiters();

    GenericResponse<Map<String,String>> createAndUpdateCandidate(CandidateProfileDto candidateProfileDto);

    GenericResponse<Map<String,String>> uploadProfilePicture();

    GenericResponse<?> uploadResume();

    GenericResponse<Map<String,String>> uploadEducation(EducationDto educationDto);

    GenericResponse<Map<String,String>> uploadExperience(WorkExperienceDto workExperienceDto);

    GenericResponse<Map<String,String>> uploadSkills(UserSkillsDto userSkillsDto);

    GenericResponse<?> updateProfileWithSocialLinks();

    GenericResponse<Map<String,String>> updateProfileWithEducation(ProfileUpdateDto profileUpdateDto);

    GenericResponse<Map<String,String>> updateProfileWithExperience(ProfileUpdateDto profileUpdateDto);

    GenericResponse<?> updateProfileWithResume(ProfileUpdateDto profileUpdateDto);

    GenericResponse<?> updateDisplayStatus(DisplayStatusDto displayStatusDto);

    GenericResponse<?> deleteProfilePicture();

    GenericResponse<?> deleteResume();

    GenericResponse<?> deleteEducation();

    GenericResponse<?> deleteExperience();

    GenericResponse<?> deleteSkills();

    GenericResponse<?> setEducationAsPrimary();

    GenericResponse<?> setExperienceAsPrimary();

    GenericResponse<?> setSkillsAsPrimary();



}
