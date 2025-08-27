package com.z_connect.serviceuser.services.impl;

import com.z_connect.common.enums.Role;
import com.z_connect.common.exceptions.ProfileNotFoundException;
import com.z_connect.common.exceptions.UserNotFoundException;
import com.z_connect.common.model.Company;
import com.z_connect.common.model.Users;
import com.z_connect.common.repository.ICompanyRepository;
import com.z_connect.common.repository.IUserRepository;
import com.z_connect.common.service.BaseService;
import com.z_connect.common.utils.mapping.GenericDtoMapper;
import com.z_connect.common.utils.response.GenericResponse;
import com.z_connect.common.utils.response.GenericResponseFactory;
import com.z_connect.serviceuser.dto.*;
import com.z_connect.serviceuser.model.*;
import com.z_connect.serviceuser.repository.*;
import com.z_connect.serviceuser.services.interfaces.ICandidateService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiConsumer;
import java.util.function.Function;
import java.util.function.Supplier;

@Slf4j
@Service
public class CandidateService extends BaseService implements ICandidateService {


    @Autowired
    private final IUserProfileRepository userProfileRepository;

    @Autowired
    private final IUserRepository userRepository;

    @Autowired
    private final ICompanyRepository companyRepository;

    @Autowired
    private final IResumeRepository resumeRepository;

    @Autowired
    private final IWorkExperienceRepository workExperienceRepository;

    @Autowired
    private final IEducationRepository educationRepository;

    @Autowired
    private final IUserSkillRepository userSkillRepository;

    public CandidateService(GenericDtoMapper mapper,
                            GenericResponseFactory responseFactory,
                            IUserRepository userRepository,
                            IUserProfileRepository userProfileRepository,
                            ICompanyRepository companyRepository,
                            IResumeRepository resumeRepository,
                            IWorkExperienceRepository workExperienceRepository,
                            IEducationRepository educationRepository,
                            IUserSkillRepository userSkillRepository) {
        super(mapper, responseFactory);
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.resumeRepository = resumeRepository;
        this.workExperienceRepository = workExperienceRepository;
        this.educationRepository = educationRepository;
        this.userSkillRepository = userSkillRepository;
    }


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

    @Override
    public GenericResponse<CandidateProfileDto> getCandidateDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        UserProfile userProfile = userProfileRepository.findByUser(user)
                .orElseThrow(() -> new UserNotFoundException("User profile not found for user with email: " + email));

        CandidateProfileDto candidateProfileDto = mapper.map(userProfile, CandidateProfileDto.class);
        log.info("Mapped candidate profile:{}", candidateProfileDto);
        return responseFactory.successResponse(candidateProfileDto, "success.candidate.details");
    }

    @Override
    public GenericResponse<List<UserDetailsDto>> getCandidates() {
        List<UserDetailsDto> users = userProfileRepository.findAll()
                .stream().filter(user -> user.getUser().getRole().equals(Role.CANDIDATE))
                .map(this::mapToUserDetailsDto)
                .toList();

        return responseFactory.successResponse(users, "success.candidate.list");
    }

    @Override
    public GenericResponse<List<UserDetailsDto>> getRecruiters() {
        List<UserDetailsDto> users = userProfileRepository.findAll()
                .stream().filter(user -> user.getUser().getRole().equals(Role.RECRUITER))
                .map(this::mapToUserDetailsDto)
                .toList();
        return responseFactory.successResponse(users, "success.recruiter.list");
    }


    @Override
    public GenericResponse<?> getProfilePicture() {
        return null;
    }

    @Override
    public GenericResponse<List<ResumeDto>> getResumes() {
        Users user = getAuthenticatedUser();
        return responseFactory.successResponse(
                resumeRepository.findAll()
                        .stream().filter(resume -> resume.getUser().equals(user))
                        .map(resume -> mapper.map(resume, ResumeDto.class))
                        .toList(),
                "success.resume.found");
    }

    @Override
    public GenericResponse<?> getEducations() {
        Users user = getAuthenticatedUser();
        return responseFactory.successResponse(
                educationRepository.findAll()
                        .stream().filter(education -> education.getUsers().equals(user))
                        .map(education -> mapper.map(education, EducationDto.class))
                        .toList(),
                "success.education.found"
        );
    }

    @Override
    public GenericResponse<?> getExperiences() {
        Users user = getAuthenticatedUser();
        return responseFactory.successResponse(
                workExperienceRepository.findAll()
                        .stream().filter(experience -> experience.getUser().equals(user))
                        .map(experience -> mapper.map(experience, WorkExperienceDto.class))
                        .toList(),
                "success.experience.found"
        );
    }

    @Override
    public GenericResponse<?> getSkills() {
        Users user = getAuthenticatedUser();
        return responseFactory.successResponse(
                userSkillRepository.findAll()
                        .stream().filter(skill -> skill.getUser().equals(user))
                        .map(skill -> mapper.map(skill, UserSkillsDto.class))
                        .toList(),
                "success.skills.found"
        );
    }

    @Override
    @Transactional
    public GenericResponse<Map<String, String>> createAndUpdateCandidate(CandidateProfileDto candidateProfileDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        Company company = companyRepository.findById(candidateProfileDto.getCompanyId())
                .orElseThrow(() -> new UserNotFoundException("Company not found with id: " + candidateProfileDto.getCompanyId()));

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

    @Override
    public GenericResponse<Map<String, String>> uploadProfilePicture() {
        return null;
    }

    @Override
    public GenericResponse<?> uploadResume() {
        return null;
    }

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

    @Override
    @Transactional
    public GenericResponse<Map<String, String>> uploadSkills(UserSkillsDto userSkillsDto) {
        Users user = getAuthenticatedUser();

        return uploadData(
                userSkillsDto,
                user,
                userSkillRepository::findByUser,
                // Provide a Supplier to create a new UserSkill entity
                () -> {
                    UserSkill newSkill = new UserSkill();
                    newSkill.setUser(user);
                    return newSkill;
                },
                userSkillRepository,
                "success.skills.created"
        );
    }

    @Override
    public GenericResponse<?> updateProfileWithSocialLinks() {
        return null;
    }

    @Override
    @Transactional
    public GenericResponse<Map<String, String>> updateProfileWithEducation(ProfileUpdateDto profileUpdateDto) {
        BiConsumer<UserProfile, Long> educationUpdater = (profile, id) -> {
            Education education = educationRepository.findById(profileUpdateDto.getId())
                    .orElseThrow(() -> new UserNotFoundException("Education not found with id: " + profileUpdateDto.getId()));
            profile.setEducation(List.of(education));
        };
        return updateData(profileUpdateDto.getId(), educationUpdater);
    }

    @Override
    @Transactional
    public GenericResponse<Map<String, String>> updateProfileWithExperience(ProfileUpdateDto profileUpdateDto) {
        BiConsumer<UserProfile, Long> experienceUpdater = (profile, id) -> {
            WorkExperience experience = workExperienceRepository.findById(profileUpdateDto.getId())
                    .orElseThrow(() -> new UserNotFoundException("Experience not found with id: " + profileUpdateDto.getId()));
            profile.setWorkExperience(List.of(experience));
        };
        return updateData(profileUpdateDto.getId(), experienceUpdater);
    }

    @Override
    public GenericResponse<?> updateProfileWithResume(ProfileUpdateDto profileUpdateDto) {
        BiConsumer<UserProfile, Long> resumeUpdater = (profile, id) -> {
            Resume resume = resumeRepository.findById(profileUpdateDto.getId())
                    .orElseThrow(() -> new UserNotFoundException("Resume not found with id: " + profileUpdateDto.getId()));
            profile.setResume(List.of(resume));
        };
        return updateData(profileUpdateDto.getId(), resumeUpdater);
    }

    @Override
    @Transactional
    public GenericResponse<?> updateDisplayStatus(DisplayStatusDto displayStatusDto) {
        Users user = getAuthenticatedUser();
        user.setVisible(displayStatusDto.getIsDisplay());
        userRepository.save(user);
        log.info("User with email: {} updated display status to: {}", user.getEmail(), displayStatusDto.getIsDisplay());
        return responseFactory.successResponse(
                responseMessage("Profile display status updated successfully"),
                "success.user.display.status.updated"
        );
    }

    @Override
    public GenericResponse<?> deleteProfilePicture() {
        return null;
    }

    @Override
    public GenericResponse<?> deleteResume() {
        return null;
    }

    @Override
    public GenericResponse<?> deleteEducation() {
        return null;
    }

    @Override
    public GenericResponse<?> deleteExperience() {
        return null;
    }

    @Override
    public GenericResponse<?> deleteSkills() {
        return null;
    }

    @Override
    public GenericResponse<?> setEducationAsPrimary() {
        return null;
    }

    @Override
    public GenericResponse<?> setExperienceAsPrimary() {
        return null;
    }

    @Override
    public GenericResponse<?> setSkillsAsPrimary() {
        return null;
    }

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
        userDetailsDto.setCompanyName(candidate.getCompany().getName());
        if (candidate.getUser().getRole() == Role.CANDIDATE) {
            userDetailsDto.setResume(resumeRepository.findByUser(candidate.getUser())
                    .stream().map(resume -> mapper.map(resume, ResumeDto.class))
                    .toList()
            );
            userDetailsDto.setUserSkills(userSkillRepository.findByUser(candidate.getUser())
                    .stream().map(skill -> mapper.map(skill, UserSkillsDto.class))
                    .toList()
            );
        }
        userDetailsDto.setEducation(educationRepository.findByUsers(candidate.getUser())
                .stream().map(education -> mapper.map(education, EducationDto.class))
                .toList());

        userDetailsDto.setWorkExperience(workExperienceRepository.findByUser(candidate.getUser())
                .stream().map(experience -> mapper.map(experience, WorkExperienceDto.class))
                .toList()
        );
        return userDetailsDto;
    }

    // Helper method to get the authenticated user and handle the not found case
    private Users getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    }

    private <T, R> GenericResponse<R> getProfileEntity(Function<Users, Optional<T>> findFunction, Class<R> dtoClass, String successMessageCode, String notFoundMessageCode) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        Optional<T> entity = findFunction.apply(user);

        if (entity.isEmpty()) {
            log.info("No details found for user with email: {}", email);
            return responseFactory.successResponse(
                    null,
                    notFoundMessageCode
            );
        }

        R dto = mapper.map(entity.get(), dtoClass);
        log.info("Details found for user with email: {}", email);
        return responseFactory.successResponse(dto, successMessageCode);
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

    private <T> GenericResponse<Map<String, String>> updateData(
            T value,
            BiConsumer<UserProfile, T> fieldUpdater
    ) {
        Users user = getAuthenticatedUser();
        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseThrow(() -> new ProfileNotFoundException("UserProfile not found for user with email: " + user.getEmail()));

        fieldUpdater.accept(profile, value);
        profile.setUpdatedAt(LocalDateTime.now());
        userProfileRepository.save(profile);
        log.info("UserProfile updated with id: {}", profile.getId());
        return responseFactory.successResponse(
                responseMessage("UserProfile updated successfully"),
                "success.profile.updated"
        );
    }
}
