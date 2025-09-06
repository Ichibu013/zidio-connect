package com.z_connect.serviceuser.services.impl;

import com.z_connect.common.enums.Role;
import com.z_connect.common.exceptions.*;
import com.z_connect.common.model.Company;
import com.z_connect.common.model.Skill;
import com.z_connect.common.model.Users;
import com.z_connect.common.repository.ICompanyRepository;
import com.z_connect.common.repository.ISkillRepository;
import com.z_connect.common.repository.IUserRepository;
import com.z_connect.common.service.BaseService;
import com.z_connect.common.utils.mapping.GenericDtoMapper;
import com.z_connect.common.utils.response.GenericResponse;
import com.z_connect.common.utils.response.GenericResponseFactory;
import com.z_connect.serviceuser.dto.*;
import com.z_connect.serviceuser.model.*;
import com.z_connect.serviceuser.repository.*;
import com.z_connect.serviceuser.services.interfaces.ICandidateProfileService;
import com.z_connect.serviceuser.services.interfaces.ICloudinaryUploadService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.function.BiConsumer;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

/**
 * The CandidateProfileProfileService class provides services for managing candidate
 * profiles including basic information, details, resumes, educations, work experiences,
 * skills, and profile-related data. It facilitates CRUD operations, profile updates,
 * and file uploads (e.g., profile pictures, resumes).
 * <p>
 * The class is designed to interact with various persistence layers (repositories)
 * and utilities (e.g., Cloudinary for file storage) to perform these operations.
 */
@Slf4j
@Service
public class CandidateProfileProfileService extends BaseService implements ICandidateProfileService {

    private final IUserProfileRepository userProfileRepository;
    private final IUserRepository userRepository;
    private final ICompanyRepository companyRepository;
    private final IResumeRepository resumeRepository;
    private final IWorkExperienceRepository workExperienceRepository;
    private final IEducationRepository educationRepository;
    private final IUserSkillRepository userSkillRepository;
    private final ISkillRepository skillRepository;
    private final ICloudinaryUploadService cloudinaryUploadService;

    public CandidateProfileProfileService(GenericDtoMapper mapper,
                                          GenericResponseFactory responseFactory,
                                          IUserRepository userRepository,
                                          IUserProfileRepository userProfileRepository,
                                          ICompanyRepository companyRepository,
                                          IResumeRepository resumeRepository,
                                          IWorkExperienceRepository workExperienceRepository,
                                          IEducationRepository educationRepository,
                                          IUserSkillRepository userSkillRepository,
                                          ISkillRepository skillRepository,
                                          ICloudinaryUploadService cloudinaryUploadService) {
        super(mapper, responseFactory);
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.resumeRepository = resumeRepository;
        this.workExperienceRepository = workExperienceRepository;
        this.educationRepository = educationRepository;
        this.userSkillRepository = userSkillRepository;
        this.skillRepository = skillRepository;
        this.cloudinaryUploadService = cloudinaryUploadService;
    }


    /**
     * Retrieves the basic details of the currently authenticated candidate, including first name, last name,
     * profile picture URL, and personal website URL.
     *
     * @return a GenericResponse containing a BasicInfoDto with the candidate's basic information.
     *         If the user or user profile is not found, exceptions are thrown.
     */
    @Override
    public GenericResponse<BasicInfoDto> getBasicCandidateDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseThrow(() -> new ProfileNotFoundException("UserProfile not found for user with email: " + email));

        BasicInfoDto basicInfoDto = new BasicInfoDto();
        basicInfoDto.setFirstName(user.getFirstName());
        basicInfoDto.setLastName(user.getLastName());
        basicInfoDto.setProfilePictureUrl(profile.getProfilePictureUrl());
        basicInfoDto.setWebsiteUrl(profile.getPortfolioUrl());
        return responseFactory.successResponse(basicInfoDto, "success.candidate.basic.details");
    }

    /**
     * Retrieves the details of the candidate associated with the currently authenticated user.
     *
     * The method fetches the user's information using the email from the authentication context,
     * retrieves the corresponding user profile, maps it to a CandidateProfileDto, and returns it as part of a success response.
     *
     * @return a GenericResponse containing the CandidateProfileDto with the details of the authenticated candidate
     *         and a message indicating the successful retrieval of candidate details
     */
    @Override
    public GenericResponse<CandidateProfileDto> getCandidateDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        UserProfile userProfile = userProfileRepository.findByUser(user)
                .orElseThrow(() -> new ProfileNotFoundException("User profile not found for user with email: " + email));

        CandidateProfileDto candidateProfileDto = mapper.map(userProfile, CandidateProfileDto.class);
        log.info("Mapped candidate profile:{}", candidateProfileDto);
        return responseFactory.successResponse(candidateProfileDto, "success.candidate.details");
    }

    /**
     * Retrieves a list of user details for all users with the role of CANDIDATE.
     *
     * @return a GenericResponse containing a list of UserDetailsDto objects representing candidates
     */
    @Override
    public GenericResponse<List<UserDetailsDto>> getCandidates() {
        List<UserDetailsDto> allCandidates = userProfileRepository.findByUser_Role(Role.CANDIDATE)
                .stream()
                .map(this::mapToUserDetailsDto)
                .toList();
        return responseFactory.successResponse(allCandidates, "success.candidate.list");
    }

    /**
     * Retrieves a list of recruiters by fetching user profiles with the role of RECRUITER,
     * mapping them to UserDetailsDto, and returning a success response containing the list.
     *
     * @return a GenericResponse containing a list of UserDetailsDto objects representing the recruiters.
     */
    @Override
    public GenericResponse<List<UserDetailsDto>> getRecruiters() {
        List<UserDetailsDto> allRecruiters = userProfileRepository.findByUser_Role(Role.RECRUITER)
                .stream()
                .map(this::mapToUserDetailsDto)
                .toList();
        return responseFactory.successResponse(allRecruiters, "success.recruiter.list");
    }


    /**
     * Retrieves the profile picture URL of the currently authenticated user.
     * If the user's profile does not exist or the profile picture URL is not available,
     * appropriate error responses are returned.
     *
     * @return a {@code GenericResponse<String>} containing the profile picture URL if found,
     * or an error response with relevant message if not found.
     */
    @Override
    public GenericResponse<String> getProfilePicture() {
        Users user = getAuthenticatedUser();
        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseThrow(() -> new ProfileNotFoundException("UserProfile not found for user with email: " + user.getEmail()));
        if (profile.getProfilePictureUrl() == null) {
            log.info("No profile picture found for user with email: {}", user.getEmail());
            return responseFactory.errorResponse(
                    null,
                    "error.profile.picture.not.found"
            );
        }
        log.info("Profile picture found for user with email: {}", user.getEmail());
        return responseFactory.successResponse(
                profile.getProfilePictureUrl(),
                "success.profile.picture.found"
        );
    }

    /**
     * Retrieves a list of resumes associated with the currently authenticated user.
     *
     * @return a GenericResponse containing a list of ResumeDto objects and a success message.
     */
    @Override
    public GenericResponse<List<ResumeDto>> getResumes() {
        Users user = getAuthenticatedUser();
        return responseFactory.successResponse(
                resumeRepository.findByUser(user)
                        .stream()
                        .map(resume -> mapper.map(resume, ResumeDto.class))
                        .toList(),
                "success.resume.found");
    }

    /**
     * Retrieves the list of education records associated with the currently authenticated user.
     *
     * @return a {@code GenericResponse} containing a list of {@code EducationDto} objects
     *         representing the user's education records, along with a success message.
     */
    @Override
    public GenericResponse<List<EducationDto>> getEducations() {
        Users user = getAuthenticatedUser();
        return responseFactory.successResponse(
                educationRepository.findByUsers(user)
                        .stream()
                        .map(education -> mapper.map(education, EducationDto.class))
                        .toList(),
                "success.education.found"
        );
    }

    /**
     * Retrieves the work experiences of the currently authenticated user.
     *
     * @return a GenericResponse containing a list of WorkExperienceDto objects representing
     *         the work experiences of the authenticated user, along with a success message.
     */
    @Override
    public GenericResponse<List<WorkExperienceDto>> getExperiences() {
        Users user = getAuthenticatedUser();
        return responseFactory.successResponse(
                workExperienceRepository.findByUser(user)
                        .stream()
                        .map(experience -> mapper.map(experience, WorkExperienceDto.class))
                        .toList(),
                "success.experience.found"
        );
    }

    /**
     * Retrieves a list of skills associated with the authenticated user.
     *
     * @return a GenericResponse containing a list of UserSkillsDto representing the user's skills,
     *         and a success message indicating that the skills were successfully found.
     */
    @Override
    public GenericResponse<List<UserSkillsDto>> getSkills() {
        Users user = getAuthenticatedUser();
        return responseFactory.successResponse(
                userSkillRepository.findByUser(user)
                        .stream()
                        .map(skill -> mapper.map(skill, UserSkillsDto.class))
                        .toList(),
                "success.skills.found"
        );
    }

    /**
     * Creates or updates a candidate profile based on the given data.
     * It retrieves the authenticated user's data, ensures the associated company
     * exists, and updates the candidate profile accordingly.
     *
     * @param candidateProfileDto the DTO containing the data for creating or updating the candidate profile
     * @return a GenericResponse containing a map with a success message when the candidate profile
     *         is successfully created or updated
     * @throws UserNotFoundException if the authenticated user cannot be found
     * @throws CompanyNotFoundException if the company associated with the provided company ID cannot be found
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> createAndUpdateCandidate(CandidateProfileDto candidateProfileDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        Company company = companyRepository.findById(candidateProfileDto.getCompanyId())
                .orElseThrow(() -> new CompanyNotFoundException("Company not found with id: " + candidateProfileDto.getCompanyId()));

        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseGet(() -> {
                    UserProfile newProfile = new UserProfile();
                    newProfile.setUser(user); // Set the user for the new profile
                    return newProfile;
                });

        mapper.map(candidateProfileDto, profile);
        profile.setCompany(company);
        profile.setUpdatedAt(LocalDateTime.now());
        userProfileRepository.save(profile);
        log.info("UserProfile created/updated with id: {}", profile.getId());

        return responseFactory.successResponse(
                responseMessage("Candidate Profile updated successfully"),
                "success.candidate.profile.updated"
        );
    }

    /**
     * Uploads a profile picture for the authenticated user.
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> uploadProfilePicture(MultipartFile profilePicture) {
        Users user = getAuthenticatedUser();
        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseThrow(() -> new ProfileNotFoundException("UserProfile not found for user with email: " + user.getEmail()));
        profile.setProfilePictureUrl(cloudinaryUploadService.uploadData(profilePicture, "profile"));
        profile.setUpdatedAt(LocalDateTime.now());
        userProfileRepository.save(profile);
        log.info("Profile picture uploaded for user with email: {}", user.getEmail());
        return responseFactory.successResponse(
                responseMessage("Profile picture uploaded successfully"),
                "success.profile.picture.uploaded"
        );
    }

    /**
     * Handles the process of uploading a resume file for the authenticated user.
     *
     * @param resume   the multipart file containing the resume to be uploaded
     * @param filename the desired filename for the uploaded resume
     * @return a generic response containing a map with a success message and status key-value pairs
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> uploadResume(MultipartFile resume, String filename) {
        Users user = getAuthenticatedUser();
        Resume newResume = new Resume();
        newResume.setUser(user);
        newResume.setFileName(filename);
        newResume.setResumeUrl(cloudinaryUploadService.uploadData(resume, "resume"));
        resumeRepository.save(newResume);
        log.info("Resume uploaded for user with email: {}", user.getEmail());
        return responseFactory.successResponse(
                responseMessage("Resume uploaded successfully"),
                "success.resume.uploaded"
        );
    }

    /**
     * Handles the uploading and saving of education information for the authenticated user.
     *
     * @param educationDto the data transfer object containing education details to be uploaded
     * @return a GenericResponse containing a map with the status message indicating success or failure
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> uploadEducation(EducationDto educationDto) {
        Users user = getAuthenticatedUser();
        return uploadData(
                educationDto,
                user,
                educationRepository::findByUsers,
                // Provide a Supplier to create a new Education entity
                () -> {
                    Education newEducation = new Education();
                    newEducation.setUsers(user);
                    return newEducation;
                },
                educationRepository,
                "success.education.created"
        );
    }

    /**
     * Uploads work experience data for the authenticated user.
     * This method saves or updates the provided work experience details to a persistent storage.
     *
     * @param workExperienceDto the data transfer object containing the details of the work experience to be uploaded
     * @return a GenericResponse containing a map of response messages, including success or error messages
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> uploadExperience(WorkExperienceDto workExperienceDto) {
        Users user = getAuthenticatedUser();
        return uploadData(
                workExperienceDto,
                user,
                workExperienceRepository::findByUser,
                // Provide a Supplier to create a new WorkExperience entity
                () -> {
                    WorkExperience newWorkExperience = new WorkExperience();
                    newWorkExperience.setUser(user);
                    return newWorkExperience;
                },
                workExperienceRepository,
                "success.experience.created"
        );
    }

    /**
     * Uploads new skills for the authenticated user. Any skills provided in the request
     * that the user does not already possess will be saved to the database.
     *
     * @param userSkillsDto the data transfer object containing the list of skills to be uploaded
     * @return a response object containing a message and details of the skill upload process
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> uploadSkills(UserSkillsDto userSkillsDto) {
        Users user = getAuthenticatedUser();
        List<String> newSkills = userSkillsDto.getSkills();

        Set<String> existingUserSkills = userSkillRepository.findByUser(user).stream()
                .map(userSkill -> userSkill.getSkill().getSkillName())
                .collect(Collectors.toSet());

        List<UserSkill> skillsToSave = new ArrayList<>();

        for (String skillName : newSkills) {
            if (!existingUserSkills.contains(skillName)) {
                Skill skill = skillRepository.findBySkillName(skillName)
                        .orElseThrow(() -> new SkillNotFoundException("Skill not found with name: " + skillName));

                UserSkill userSkill = new UserSkill();
                userSkill.setUser(user);
                userSkill.setSkill(skill);

                skillsToSave.add(userSkill);

                log.info("Added {} to user with email: {}", skillName, user.getEmail());
            }
        }

        if (!skillsToSave.isEmpty()) {
            userSkillRepository.saveAll(skillsToSave);
            log.info("Saved {} new skills for user with email: {}", skillsToSave.size(), user.getEmail());
        } else {
            log.info("No new skills to save for user with email: {}", user.getEmail());
            return responseFactory.errorResponse(
                    responseMessage("No new skills to save"),
                    "success.skills.not.saved"
            );
        }

        return responseFactory.successResponse(
                responseMessage("Skills saved successfully"),
                "success.skills.saved"
        );

    }

    /**
     * Updates the social links of the authenticated user's profile.
     *
     * @param socialLinksDto the data transfer object containing the updated social links,
     *                       including LinkedIn, GitHub, and portfolio URLs.
     * @return a generic response containing a map with the status and message indicating
     *         whether the update was successful.
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> updateProfileWithSocialLinks(SocialLinksDto socialLinksDto) {
        Users user = getAuthenticatedUser();
        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseThrow(() -> new ProfileNotFoundException("UserProfile not found for user with email: " + user.getEmail()));
        profile.setLinkedinUrl(socialLinksDto.getLinkedinUrl());
        profile.setGithubUrl(socialLinksDto.getGithubUrl());
        profile.setPortfolioUrl(socialLinksDto.getPortfolioUrl());
        userProfileRepository.save(profile);
        log.info("Social links updated for user with email: {}", user.getEmail());
        return responseFactory.successResponse(
                responseMessage("Social links updated successfully"),
                "success.social.links.updated"
        );
    }

    /**
     * Sets the specified education record as the primary education for a user profile.
     *
     * @param profileUpdateDto the DTO containing the user profile ID and other update details
     * @return a response containing a map of status messages indicating the outcome of the operation
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> setEducationAsPrimary(ProfileUpdateDto profileUpdateDto) {
        return setPrimary(
                profileUpdateDto.getId(),
                educationRepository,
                UserProfile::setEducationPrimary,
                "Education"
        );
    }

    /**
     * Sets a specific work experience as the primary experience for the user's profile.
     *
     * @param profileUpdateDto the data transfer object containing the details needed to update the profile, including the ID of the experience to be set as primary.
     * @return a generic response containing a map with status information indicating the result of the operation.
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> setExperienceAsPrimary(ProfileUpdateDto profileUpdateDto) {
        return setPrimary(
                profileUpdateDto.getId(),
                workExperienceRepository,
                UserProfile::setWorkExperiencePrimary,
                "Experience"
        );
    }

    /**
     * Sets the specified resume as the primary resume for a user profile.
     *
     * @param profileUpdateDto the data transfer object containing the ID of the resume to be marked as primary
     * @return a GenericResponse containing a map with the status and any associated messages
     */
    @Override
    public GenericResponse<Map<String, String>> setResumeAsPrimary(ProfileUpdateDto profileUpdateDto) {
        return setPrimary(
                profileUpdateDto.getId(),
                resumeRepository,
                UserProfile::setResumePrimary,
                "Resume"
        );
    }

    /**
     * Updates the display status of the currently authenticated user.
     * The method fetches the authenticated user, updates their display
     * visibility status as per the provided input, saves the updated user entity,
     * and logs the changes. Returns a success response with an appropriate message.
     *
     * @param displayStatusDto the data transfer object containing the new display status
     *                         to be updated for the authenticated user
     * @return a generic response object containing a success message and status code
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> updateDisplayStatus(DisplayStatusDto displayStatusDto) {
        Users user = getAuthenticatedUser();
        user.setVisible(displayStatusDto.getIsDisplay());
        userRepository.save(user);
        log.info("User with email: {} updated display status to: {}", user.getEmail(), displayStatusDto.getIsDisplay());
        return responseFactory.successResponse(
                responseMessage("Profile display status updated successfully"),
                "success.user.display.status.updated"
        );
    }

    /**
     * Deletes the profile picture of the currently authenticated user. The profile picture URL
     * in the user profile is set to null, effectively removing the profile picture entry.
     *
     * @return a GenericResponse object containing a map of messages indicating the success of the operation.
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> deleteProfilePicture() {
        return deleteProfileItem(
                null,
                userProfileRepository,
                UserProfile.class,
                (profile, userProfile) -> profile.setProfilePictureUrl(null),
                "success.profile.picture.deleted",
                "Profile picture deleted for user with email: {}",
                "Profile picture"
        );
    }

    /**
     * Deletes a resume based on the provided ID.
     *
     * @param id the ID of the resume to be deleted
     * @return a GenericResponse containing a map with the result of the delete operation
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> deleteResume(Long id) {
        return deleteProfileItem(
                id,
                resumeRepository,
                Resume.class,
                (profile, resume) -> profile.setResumePrimary(null),
                "success.resume.deleted",
                "Resume deleted for user with email: {}",
                "Resume"
        );
    }

    /**
     * Deletes an education record associated with the given ID.
     *
     * @param id*/
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> deleteEducation(Long id) {
        return deleteProfileItem(
                id,
                educationRepository,
                Education.class,
                (profile, education) -> profile.setEducationPrimary(null),
                "success.education.deleted",
                "Education deleted for user with email: {}",
                "Education"
        );
    }

    /**
     * Deletes a work experience entry associated with the given ID.
     *
     * @param id the unique identifier of the work experience to be deleted
     * @return a GenericResponse containing a map with status information about the deletion outcome
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> deleteExperience(Long id) {
        return deleteProfileItem(
                id,
                workExperienceRepository,
                WorkExperience.class,
                (profile, experience) -> profile.setWorkExperiencePrimary(null),
                "success.experience.deleted",
                "Experience deleted for user with email: {}",
                "Experience"
        );
    }

    /**
     * Deletes a UserSkill associated with the authenticated user based on the provided skill ID.
     *
     * @param id the ID of the UserSkill to be deleted
     * @return a GenericResponse containing a success message and additional response details
     * @throws UserNotFoundException if the specified UserSkill is not found for the authenticated user
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> deleteSkills(Long id) {
        Users users = getAuthenticatedUser();
        UserSkill skills = userSkillRepository.findByUser(users)
                .stream().filter(skill -> skill.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new UserNotFoundException("UserSkill not found for user with email: " + users.getEmail()));
        userSkillRepository.delete(skills);
        log.info("UserSkill deleted for user with email: {}", users.getEmail());
        return responseFactory.successResponse(
                responseMessage("UserSkill deleted successfully"),
                "success.skills.deleted"
        );
    }

    // Helper method to get the authenticated user and handle the not found case
    private Users getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    }

    /**
     * Maps a UserProfile object to a UserDetailsDto object.
     *
     * @param candidate The UserProfile object containing user-related data to be mapped.
     * @return A UserDetailsDto object populated with data from the provided UserProfile.
     */
    private UserDetailsDto mapToUserDetailsDto(UserProfile candidate) {

        UserDetailsDto userDetailsDto = new UserDetailsDto();

        userDetailsDto.setId(candidate.getUser().getId());
        userDetailsDto.setFirstName(candidate.getUser().getFirstName());
        userDetailsDto.setLastName(candidate.getUser().getLastName());
        userDetailsDto.setEmail(candidate.getUser().getEmail());
        userDetailsDto.setPhoneNumber(candidate.getPhoneNumber());

        userDetailsDto.setProfilePictureUrl(candidate.getProfilePictureUrl());
        userDetailsDto.setCountry(candidate.getCountry());
        userDetailsDto.setBio(candidate.getBio());
        userDetailsDto.setCurrentLocation(candidate.getCurrentLocation());

        userDetailsDto.setJobSearchStatus(String.valueOf(candidate.getJobSearchStatus()));

        Optional.ofNullable(candidate.getCompany()).ifPresent(company -> {
            userDetailsDto.setCompanyName(company.getName());
        });
        Optional.ofNullable(candidate.getEducationPrimary()).ifPresent(education -> {
            userDetailsDto.setEducation(mapper.map(candidate.getEducationPrimary(), EducationDto.class));
        });
        Optional.ofNullable(candidate.getWorkExperiencePrimary()).ifPresent(experience -> {
            userDetailsDto.setWorkExperience(mapper.map(candidate.getWorkExperiencePrimary(), WorkExperienceDto.class));
        });

        if (candidate.getUser().getRole() == Role.CANDIDATE) {
            Optional.ofNullable(candidate.getResumePrimary()).ifPresent(resume -> {
                userDetailsDto.setResume(mapper.map(candidate.getResumePrimary(), ResumeDto.class));
            });

            List<UserSkillsDto> userSkills = userSkillRepository.findByUser(candidate.getUser())
                    .stream()
                    .map(skill -> mapper.map(skill, UserSkillsDto.class))
                    .toList();
            userDetailsDto.setUserSkills(userSkills);
        }

        return userDetailsDto;
    }

    /**
     * A generic method to handle the upload logic for different profile sections.
     * This version uses a Supplier to create new entities, which is safer and more
     * explicit than using reflection.
     *
     * @param <D>                The DTO type (e.g., EducationDto, WorkExperienceDto).
     * @param <E>                The Entity type (e.g., Education, WorkExperience).
     * @param dto                The data transfer object to be saved.
     * @param user               The authenticated user entity.
     * @param findFunction       A function to find an existing entity for the user.
     * @param newEntitySupplier  A supplier function to create a new entity instance.
     * @param repository         The JPA repository for the entity.
     * @param successMessageCode The success message key.
     * @return A generic response containing the success message.
     */
    private <D, E> GenericResponse<Map<String, String>> uploadData(
            D dto,
            Users user,
            Function<Users, Optional<E>> findFunction,
            Supplier<E> newEntitySupplier,
            JpaRepository<E, ?> repository,
            String successMessageCode
    ) {
        E entity = findFunction.apply(user)
                .orElseGet(newEntitySupplier);

        // Map DTO to entity and save
        mapper.map(dto, entity);
        repository.save(entity);
        log.info("Entity created/updated for user: {}", user.getEmail());

        return responseFactory.successResponse(
                responseMessage("Entity created/updated successfully"),
                successMessageCode
        );
    }

    /**
     * Updates the user profile to set the given entity as primary and persists the changes.
     *
     * @param <T>           The type parameter representing the entity.
     * @param id            The identifier of the entity to set as primary.
     * @param repository    The repository to retrieve the entity by its ID.
     * @param profileSetter A function that updates the user profile with the specified entity.
     * @param entityName    The name of the entity being updated.
     * @return A GenericResponse containing a map with success messages.
     */
    private <T> GenericResponse<Map<String, String>> setPrimary(
            Long id,
            JpaRepository<T, Long> repository,
            BiConsumer<UserProfile, T> profileSetter,
            String entityName
    ) {
        Users user = getAuthenticatedUser();
        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseThrow(() -> new ProfileNotFoundException("UserProfile not found for user with email: " + user.getEmail()));

        T entity = repository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(entityName + " not found with id: " + id));

        profileSetter.accept(profile, entity);

        profile.setUpdatedAt(LocalDateTime.now());
        userProfileRepository.save(profile);

        if (entityName.equals("Resume")) {
            Resume resume = (Resume) entity;
            resume.setIsPrimary(true);
            resumeRepository.save(resume);
            log.info("Resume {} updated for user: {} to true in Resume Table", entityName, user.getEmail());
        }

        log.info("Primary {} updated for user: {}", entityName, user.getEmail());
        return responseFactory.successResponse(
                responseMessage(entityName + " updated successfully"),
                "success.profile.updated"
        );
    }

    /**
     * Deletes a profile item associated with the authenticated user.
     *
     * This method handles the deletion of a specific item from a user's profile. Depending on the type
     * of item, it either removes a profile-specific item or performs additional operations such as
     * updating the user profile.
     *
     * @param <T> The type of the profile item to be deleted.
     * @param <R> The type of the repository used to handle the profile item, extending JpaRepository.
     * @param id The unique identifier of the item to be deleted.
     * @param itemRepository The repository responsible for accessing and managing the item's persistence.
     * @param itemClass The class type of the item being deleted.
     * @param profileSetter A BiConsumer function that updates the UserProfile with the associated item.
     * @param successMessageKey The key for the success message to be included in the response.
     * @param logMessage The message to be logged upon successful deletion.
     * @param entityName The name of the entity being deleted (e.g., "Profile Picture").
     * @return A GenericResponse containing a success message and any relevant details.
     */
    private <T, R extends JpaRepository<T, Long>> GenericResponse<Map<String, String>> deleteProfileItem(
            Long id,
            R itemRepository,
            Class<T> itemClass,
            BiConsumer<UserProfile, T> profileSetter,
            String successMessageKey,
            String logMessage,
            String entityName
    ) {
        Users users = getAuthenticatedUser();

        if (entityName.equals("Profile Picture")) {
            UserProfile profile = userProfileRepository.findByUser(users)
                    .orElseThrow(() -> new ProfileNotFoundException("UserProfile not found for user with email: " + users.getEmail()));
            profileSetter.accept(profile, null);
            userProfileRepository.save(profile);
            log.info(logMessage, users.getEmail());
            return responseFactory.successResponse(
                    responseMessage("Profile picture deleted successfully"),
                    successMessageKey
            );
        }

        T item = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Cannot find item of type " + itemClass.getSimpleName() + " with id: " + id));

        UserProfile profile = userProfileRepository.findByUser(users)
                .stream()
                .findFirst()
                .orElseThrow(() -> new ProfileNotFoundException("UserProfile not found for user with email: " + users.getEmail()));

        profileSetter.accept(profile, item);

        userProfileRepository.save(profile);
        itemRepository.delete(item);

        log.info(logMessage, users.getEmail());

        return responseFactory.successResponse(
                responseMessage("Item deleted successfully"),
                successMessageKey
        );
    }
}
