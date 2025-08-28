package com.z_connect.serviceuser.services.interfaces;

import com.z_connect.common.utils.response.GenericResponse;
import com.z_connect.serviceuser.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * Service interface for managing candidate profiles and related operations.
 */
@Service
public interface ICandidateProfileService {

    GenericResponse<BasicInfoDto> getBasicCandidateDetails();

    GenericResponse<List<UserDetailsDto>> getCandidates();

    GenericResponse<CandidateProfileDto> getCandidateDetails();

    GenericResponse<String> getProfilePicture();

    GenericResponse<List<ResumeDto>> getResumes();

    GenericResponse<List<EducationDto>> getEducations();

    GenericResponse<List<WorkExperienceDto>> getExperiences();

    GenericResponse<List<UserSkillsDto>> getSkills();

    GenericResponse<List<UserDetailsDto>> getRecruiters();

    GenericResponse<Map<String,String>> createAndUpdateCandidate(CandidateProfileDto candidateProfileDto);

    GenericResponse<Map<String,String>> uploadProfilePicture(MultipartFile resume);

    GenericResponse<Map<String,String>> uploadResume(MultipartFile resume,String filename);

    GenericResponse<Map<String,String>> uploadEducation(EducationDto educationDto);

    GenericResponse<Map<String,String>> uploadExperience(WorkExperienceDto workExperienceDto);

    GenericResponse<Map<String,String>> uploadSkills(UserSkillsDto userSkillsDto);

    GenericResponse<Map<String,String>> updateProfileWithSocialLinks(SocialLinksDto socialLinksDto);

    GenericResponse<Map<String,String>> setEducationAsPrimary(ProfileUpdateDto profileUpdateDto);

    GenericResponse<Map<String,String>> setExperienceAsPrimary(ProfileUpdateDto profileUpdateDto);

    GenericResponse<Map<String,String>> setResumeAsPrimary(ProfileUpdateDto profileUpdateDto);

    GenericResponse<Map<String,String>> updateDisplayStatus(DisplayStatusDto displayStatusDto);

    GenericResponse<Map<String,String>> deleteProfilePicture();

    GenericResponse<Map<String,String>> deleteResume(Long id);

    GenericResponse<Map<String,String>> deleteEducation(Long id);

    GenericResponse<Map<String,String>> deleteExperience(Long id);

    GenericResponse<Map<String,String>> deleteSkills(Long id);


}
