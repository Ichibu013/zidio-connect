package com.z_connect.serviceuser.services.impl;

import com.z_connect.common.enums.Role;
import com.z_connect.common.exceptions.ProfileNotFoundException;
import com.z_connect.common.exceptions.UserNotFoundException;
import com.z_connect.common.model.Company;
import com.z_connect.common.model.Users;
import com.z_connect.common.repository.ICompanyRepository;
import com.z_connect.common.repository.IUserRepository;
import com.z_connect.common.utils.mapping.GenericDtoMapper;
import com.z_connect.common.utils.response.GenericResponse;
import com.z_connect.common.utils.response.GenericResponseFactory;
import com.z_connect.serviceuser.dto.*;
import com.z_connect.serviceuser.model.Education;
import com.z_connect.serviceuser.model.UserProfile;
import com.z_connect.serviceuser.repository.*;
import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.context.MessageSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class CandidateServiceTest {

    @Mock private IUserProfileRepository userProfileRepository;
    @Mock private IUserRepository userRepository;
    @Mock private ICompanyRepository companyRepository;
    @Mock private IResumeRepository resumeRepository;
    @Mock private IWorkExperienceRepository workExperienceRepository;
    @Mock private IEducationRepository educationRepository;
    @Mock private IUserSkillRepository userSkillRepository;
    @Mock private GenericDtoMapper mapper;
    @Mock private GenericResponseFactory responseFactory;

    // For GenericResponse construction in mocks
    private MessageSource messageSource;

    private CandidateService candidateService;

    private final String email = "john.doe@example.com";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        messageSource = mock(MessageSource.class);

        candidateService = new CandidateService(
                mapper,
                responseFactory,
                userRepository,
                userProfileRepository,
                companyRepository,
                resumeRepository,
                workExperienceRepository,
                educationRepository,
                userSkillRepository
        );

        // Set SecurityContext with mocked Authentication
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        // Default behavior for GenericResponseFactory.successResponse
        lenient().when(responseFactory.successResponse(any(), anyString())).thenAnswer(invocation ->
                new GenericResponse<>(invocation.getArgument(0), invocation.getArgument(1), messageSource)
        );
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    private Users buildUser() {
        Users u = new Users();
        u.setId(1L);
        u.setFirstName("John");
        u.setLastName("Doe");
        u.setEmail(email);
        u.setPassword("secret");
        u.setRole(Role.CANDIDATE);
        u.setVisible(true);
        return u;
    }

    @Test
    void updateDisplayStatus_shouldUpdateVisibilityAndSave() {
        Users user = buildUser();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        DisplayStatusDto dto = DisplayStatusDto.builder().isDisplay(false).build();

        GenericResponse<?> response = candidateService.updateDisplayStatus(dto);

        assertNotNull(response);
        verify(userRepository).save(user);
        assertFalse(user.isVisible());
    }

    @Test
    void getBasicCandidateDetails_shouldReturnDtoBuiltFromUserAndProfile_whenUserAndProfileExist() {
        Users user = buildUser();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        UserProfile profile = new UserProfile();
        profile.setUser(user);
        profile.setProfilePictureUrl("http://img/pic.png");
        profile.setPortfolioUrl("http://me.site");
        when(userProfileRepository.findByUser(user)).thenReturn(Optional.of(profile));

        @SuppressWarnings("unchecked")
        GenericResponse<BasicInfoDto> response = (GenericResponse<BasicInfoDto>) candidateService.getBasicCandidateDetails();

        assertNotNull(response);
        BasicInfoDto dto = response.getData();
        assertNotNull(dto);
        assertEquals("John", dto.getFirstName());
        assertEquals("Doe", dto.getLastName());
        assertEquals("http://img/pic.png", dto.getProfilePictureUrl());
        assertEquals("http://me.site", dto.getWebsiteUrl());

        // Ensure we did not rely on mapper for this method
        verifyNoInteractions(mapper);
    }

    @Test
    void getBasicCandidateDetails_shouldThrow_whenUserMissing() {
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> candidateService.getBasicCandidateDetails());
    }

    @Test
    void createAndUpdateCandidate_shouldCreateNewProfileAndSave_whenProfileAbsent() {
        Users user = buildUser();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        Company company = new Company();
        company.setId(10L);
        company.setName("Acme");
        when(companyRepository.findById(10L)).thenReturn(Optional.of(company));

        when(userProfileRepository.findByUser(user)).thenReturn(Optional.empty());

        CandidateProfileDto input = CandidateProfileDto.builder().companyId(10L).phoneNumber("1234567890").build();

        // mapper.map for DTO->entity should just do nothing (void mapping)
        lenient().doAnswer(inv -> {
            // simulate mapping without changing fields
            return null;
        }).when(mapper).map(eq(input), any(UserProfile.class));

        ArgumentCaptor<UserProfile> captor = ArgumentCaptor.forClass(UserProfile.class);

        GenericResponse<?> response = candidateService.createAndUpdateCandidate(input);

        assertNotNull(response);
        verify(userProfileRepository).save(captor.capture());
        UserProfile saved = captor.getValue();
        assertNotNull(saved);
        assertEquals(user, saved.getUser());
        assertEquals(company, saved.getCompany());
        assertNotNull(saved.getUpdatedAt(), "updatedAt should be set");
    }

    @Test
    void uploadEducation_shouldCreateNewEntityWithUserAndSave_whenAbsent() {
        Users user = buildUser();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(educationRepository.findByUsers(user)).thenReturn(Optional.empty());

        EducationDto educationDto = EducationDto.builder().degree("BSc").institution("Uni").build();

        ArgumentCaptor<Education> captor = ArgumentCaptor.forClass(Education.class);

        // For mapper: map DTO to entity (void mapping)
        lenient().doAnswer(inv -> null).when(mapper).map(eq(educationDto), any(Education.class));

        GenericResponse<?> response = candidateService.uploadEducation(educationDto);
        assertNotNull(response);
        verify(educationRepository).save(captor.capture());
        Education saved = captor.getValue();
        assertNotNull(saved);
        assertEquals(user, saved.getUsers(), "Education entity should reference authenticated user");
    }

    @Test
    void updateProfileWithEducation_shouldThrow_whenProfileMissing() {
        Users user = buildUser();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(userProfileRepository.findByUser(user)).thenReturn(Optional.ofNullable(null));

        ProfileUpdateDto dto = ProfileUpdateDto.builder().Id(5L).build();
        assertThrows(ProfileNotFoundException.class, () -> candidateService.updateProfileWithEducation(dto));
    }
}
