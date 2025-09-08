package com.z_connect.serviceuser.api.controllers;

import com.z_connect.common.utils.response.GenericResponse;
import com.z_connect.serviceuser.dto.*;
import com.z_connect.serviceuser.services.interfaces.ICandidateProfileService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * CandidateProfileController is a REST controller responsible for managing candidate profiles.
 * This controller provides endpoints for CRUD operations on candidate profiles, resumes,
 * education, experience, skills, and social links.
 *
 * It also includes endpoints for retrieving profile-related data and managing profile settings.
 * All responses are wrapped in a GenericResponse object.
 */
@RestController
@RequestMapping("/api/v1/candidate")
public class CandidateProfileController {

    private final ICandidateProfileService candidateProfileService;

    public CandidateProfileController(ICandidateProfileService candidateProfileService) {
        this.candidateProfileService = candidateProfileService;
    }

    /**
     * Retrieves the status of the service.
     * The endpoint indicates if the service is operational by returning "OK".
     *
     * @return ResponseEntity containing the service status as a string.
     */
    @GetMapping("/status")
    @Operation(summary = "Get the status of the service", description = "Returns OK if the service is running")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.accepted().body("OK");
    }

    /**
     * Retrieves the basic details of the candidate, including name, email, and phone number.
     *
     * @return ResponseEntity containing a GenericResponse that wraps a BasicInfoDto object
     *         with the candidate's basic information.
     */
    @GetMapping("/basicDetails")
    @Operation(summary = "Get basic details of the candidate", description = "Includes name, email, and phone number")
    public ResponseEntity<GenericResponse<BasicInfoDto>> getBasicCandidateDetails() {
        return ResponseEntity.ok(candidateProfileService.getBasicCandidateDetails());
    }

    /**
     * Retrieves the complete profile details of a candidate, including basic
     * information, educational background, work experience, skills, and social links.
     *
     * @return ResponseEntity containing a GenericResponse with the candidate profile data wrapped in a CandidateProfileDto object
     */
    @GetMapping("/details")
    @Operation(summary = "Get complete details of the candidate", description = "Includes basic details, education, experience, skills, and social links")
    public ResponseEntity<GenericResponse<CandidateProfileDto>> getCandidateDetails() {
        return ResponseEntity.ok(candidateProfileService.getCandidateDetails());
    }

    /**
     * Retrieves a list of all candidates.
     *
     * @return ResponseEntity containing a GenericResponse that holds a list of UserDetailsDto objects,
     *         which represents the details of all candidates.
     */
    @GetMapping("/all-candidates")
    @Operation(summary = "Get all candidates", description = "Returns a list of all candidates")
    public ResponseEntity<GenericResponse<List<UserDetailsDto>>> getAllCandidates() {
        return ResponseEntity.ok(candidateProfileService.getCandidates());
    }

    /**
     * Retrieves a list of all recruiters.
     *
     * @return a ResponseEntity containing a GenericResponse object with a list of UserDetailsDto
     *         representing the recruiters.
     */
    @GetMapping("/all-recruiters")
    @Operation(summary = "Get all recruiters", description = "Returns a list of all recruiters")
    public ResponseEntity<GenericResponse<List<UserDetailsDto>>> getAllRecruiters() {
        return ResponseEntity.ok(candidateProfileService.getRecruiters());
    }

    /**
     * Retrieves all candidate resumes.
     *
     * @return a ResponseEntity containing a GenericResponse with a list of ResumeDto objects
     *         representing all candidate resumes.
     */
    @GetMapping("/resumes")
    @Operation(summary = "Get all resumes", description = "Returns a list of all resumes")
    public ResponseEntity<GenericResponse<List<ResumeDto>>> getCandidateResumes() {
        return ResponseEntity.ok(candidateProfileService.getResumes());
    }

    /**
     * Retrieves a list of all education details associated with candidates.
     *
     * @return a ResponseEntity containing a GenericResponse with a list of EducationDto objects.
     */
    @GetMapping("/education")
    @Operation(summary = "Get all education", description = "Returns a list of all education")
    public ResponseEntity<GenericResponse<List<EducationDto>>> getCandidateEducation() {
        return ResponseEntity.ok(candidateProfileService.getEducations());
    }

    /**
     * Retrieves a list of all work experiences associated with a candidate profile.
     *
     * @return ResponseEntity containing a GenericResponse with a list of WorkExperienceDto objects.
     */
    @GetMapping("/experience")
    @Operation(summary = "Get all experience", description = "Returns a list of all experience")
    public ResponseEntity<GenericResponse<List<WorkExperienceDto>>> getCandidateExperience() {
        return ResponseEntity.ok(candidateProfileService.getExperiences());
    }

    /**
     * Retrieves a list of all candidate skills.
     *
     * @return a ResponseEntity containing a GenericResponse with a list of UserSkillsDto instances
     */
    @GetMapping("/skills")
    @Operation(summary = "Get all skills", description = "Returns a list of all skills")
    public ResponseEntity<GenericResponse<List<UserSkillsDto>>> getCandidateSkills() {
        return ResponseEntity.ok(candidateProfileService.getSkills());
    }

    /**
     * Retrieves the profile picture of the currently authenticated user.
     *
     * @return a ResponseEntity containing a GenericResponse with the profile picture URL as a string
     */
    @GetMapping("/profile-picture")
    public ResponseEntity<GenericResponse<String>> getProfilePicture() {
        return ResponseEntity.ok(candidateProfileService.getProfilePicture());
    }

    /**
     * Creates a new candidate profile or updates an existing profile based on the provided data.
     *
     * @param candidateProfileDto The data transfer object containing the candidate profile details
     *                            to create or update.
     * @return A ResponseEntity containing a GenericResponse with a map of response details
     *         including status and messages.
     */
    @PutMapping("/create-update-profile")
    @Operation(summary = "Create or update a candidate profile", description = "Creates a new candidate profile if it doesn't exist, or updates an existing profile")
    public ResponseEntity<GenericResponse<Map<String,String>>> createAndUpdateCandidate(@RequestBody CandidateProfileDto candidateProfileDto) {
        return ResponseEntity.ok(candidateProfileService.createAndUpdateCandidate(candidateProfileDto));
    }

    /**
     * Uploads a candidate profile picture to the storage service.
     *
     * @param file the uploaded file containing the profile picture
     * @return a response entity containing a generic response with a map of results
     */
    @PostMapping("/upload-profile-picture")
    @Operation(summary = "Upload a candidate profile picture", description = "Uploads a candidate profile picture to the storage service")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadProfilePicture(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(candidateProfileService.uploadProfilePicture(file));
    }

    /**
     * Handles the upload of a candidate's resume to the storage service.
     *
     * @param file the resume file to be uploaded, provided as a MultipartFile
     * @param filename the desired filename for the uploaded resume, provided as a String
     * @return a ResponseEntity containing a GenericResponse with a map of key-value pairs,
     *         typically indicating the status or details of the uploaded file
     */
    @PostMapping("/upload-resume")
    @Operation(summary = "Upload a candidate resume", description = "Uploads a candidate resume to the storage service")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadResume(@RequestParam("file") MultipartFile file, @RequestBody String filename) {
        return ResponseEntity.ok(candidateProfileService.uploadResume(file,filename));
    }

    /**
     * Endpoint to upload a candidate's education details to the storage service.
     *
     * @param educationDto the data transfer object containing the education details to be uploaded
     * @return ResponseEntity containing a GenericResponse with a map of key-value pairs indicating the outcome of the operation
     */
    @PostMapping("/upload-education")
    @Operation(summary = "Upload a candidate education", description = "Uploads a candidate education to the storage service")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadEducation(@RequestBody EducationDto educationDto) {
        return ResponseEntity.ok(candidateProfileService.uploadEducation(educationDto));
    }

    /**
     * Uploads a candidate's work experience to the storage service.
     *
     * @param workExperienceDto the data transfer object containing details of the candidate's work experience
     * @return a ResponseEntity containing a GenericResponse object with a map of upload details
     */
    @PostMapping("/upload-experience")
    @Operation(summary = "Upload a candidate experience", description = "Uploads a candidate experience to the storage service")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadExperience(@RequestBody WorkExperienceDto workExperienceDto) {
        return ResponseEntity.ok(candidateProfileService.uploadExperience(workExperienceDto));
    }

    /**
     * Uploads a candidate's skills to the storage service.
     *
     * @param userSkillsDto the data transfer object containing user skills
     * @return a ResponseEntity containing a GenericResponse with a map of response details
     */
    @PostMapping("/upload-skills")
    @Operation(summary = "Upload a candidate skills", description = "Uploads a candidate skills to the storage service")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadSkills(@RequestBody UserSkillsDto userSkillsDto) {
        return ResponseEntity.ok(candidateProfileService.uploadSkills(userSkillsDto));
    }

    /**
     * Updates the candidate profile with the provided social links.
     *
     * @param socialLinksDto the data transfer object containing the social links to be updated
     * @return a ResponseEntity containing a GenericResponse with the updated social links as a map
     */
    @PatchMapping("/update-profile-with-Social-Links")
    @Operation(summary = "Update profile with social links", description = "Updates the candidate profile with social links")
    public ResponseEntity<GenericResponse<Map<String,String>>> updateProfileWithSocialLinks(@RequestBody SocialLinksDto socialLinksDto) {
        return ResponseEntity.ok(candidateProfileService.updateProfileWithSocialLinks(socialLinksDto));
    }

    /**
     * Sets the specified education as primary for the candidate profile.
     *
     * @param profileUpdateDto the data transfer object containing profile information
     *                         and details of the education to be set as primary
     * @return a ResponseEntity containing a GenericResponse with a map of status or
     *         confirmation messages
     */
    @PatchMapping("/set-education-as-primary")
    @Operation(summary = "Set education as primary", description = "Sets the education as primary")
    public ResponseEntity<GenericResponse<Map<String,String>>> setEducationAsPrimary(@RequestBody ProfileUpdateDto profileUpdateDto) {
        return ResponseEntity.ok(candidateProfileService.setEducationAsPrimary(profileUpdateDto));
    }

    /**
     * Sets the specified experience as the primary experience in a user's profile.
     *
     * @param profileUpdateDto an object containing the details of the experience to be set as primary
     * @return a ResponseEntity containing a GenericResponse with a map of result details
     */
    @PatchMapping("/set-experience-as-primary")
    @Operation(summary = "Set experience as primary", description = "Sets the experience as primary")
    public ResponseEntity<GenericResponse<Map<String,String>>> setExperienceAsPrimary(@RequestBody ProfileUpdateDto profileUpdateDto) {
        return ResponseEntity.ok(candidateProfileService.setExperienceAsPrimary(profileUpdateDto));
    }

    /**
     * Sets the specified resume as the primary resume for a candidate's profile.
     *
     * @param profileUpdateDto the data transfer object containing information required to*/
    @PatchMapping("/set-resume-as-primary")
    @Operation(summary = "Set resume as primary", description = "Sets the resume as primary")
    public ResponseEntity<GenericResponse<Map<String,String>>> setResumeAsPrimary(@RequestBody ProfileUpdateDto profileUpdateDto) {
        return ResponseEntity.ok(candidateProfileService.setResumeAsPrimary(profileUpdateDto));
    }

    /**
     * Updates the candidate display status.
     *
     * @param displayStatusDto an object containing the necessary information to update the display status
     * @return a ResponseEntity containing a generic response that includes a map with status details
     */
    @PatchMapping("/update-display-status")
    @Operation(summary = "Update display status", description = "Updates the candidate display status")
    public ResponseEntity<GenericResponse<Map<String,String>>> updateDisplayStatus(@RequestBody DisplayStatusDto displayStatusDto) {
        return ResponseEntity.ok(candidateProfileService.updateDisplayStatus(displayStatusDto));
    }

    /**
     * Deletes the candidate's profile picture from the storage service.
     *
     * @return a ResponseEntity containing a GenericResponse with a map of key-value pairs
     * indicating the status or result of the deletion operation.
     */
    @DeleteMapping("/delete-profile-picture")
    @Operation(summary = "Delete profile picture", description = "Deletes the candidate profile picture from the storage service")
    public ResponseEntity<GenericResponse<Map<String,String>>> deleteProfilePicture() {
        return ResponseEntity.ok(candidateProfileService.deleteProfilePicture());
    }

    /**
     * Deletes the candidate resume from the storage service.
     *
     * @param id The unique identifier of the resume to be deleted.
     * @return ResponseEntity containing a GenericResponse with a Map of status messages
     *         indicating the result of the delete operation.
     */
    @DeleteMapping("/delete-resume/{id}")
    @Operation(summary = "Delete resume", description = "Deletes the candidate resume from the storage service")
    public ResponseEntity<GenericResponse<Map<String,String>>> deleteResume(@PathVariable Long id) {
        return ResponseEntity.ok(candidateProfileService.deleteResume(id));
    }

    /**
     * Deletes the candidate's education record identified by the given ID from the storage service.
     *
     * @param id The unique identifier of the education record to be deleted.
     * @return A ResponseEntity containing a GenericResponse with a map of success message and status.
     */
    @DeleteMapping("/delete-education/{id}")
    @Operation(summary = "Delete education", description = "Deletes the candidate education from the storage service")
    public ResponseEntity<GenericResponse<Map<String,String>>> deleteEducation(@PathVariable Long id) {
        return ResponseEntity.ok(candidateProfileService.deleteEducation(id));
    }

    /**
     * Deletes the candidate experience with the specified ID from the storage service.
     *
     * @param id the unique identifier of the candidate experience to be deleted
     * @return a ResponseEntity containing a GenericResponse with a map detailing the outcome of the deletion operation
     */
    @DeleteMapping("/delete-experience/{id}")
    @Operation(summary = "Delete experience", description = "Deletes the candidate experience from the storage service")
    public ResponseEntity<GenericResponse<Map<String,String>>> deleteExperience(@PathVariable Long id) {
        return ResponseEntity.ok(candidateProfileService.deleteExperience(id));
    }

    /**
     * Deletes the candidate skills from the storage service.
     *
     * @param id the unique identifier of the candidate whose skills need to be deleted
     * @return a ResponseEntity containing a GenericResponse with a map of status messages
     */
    @DeleteMapping("/delete-skills/{id}")
    @Operation(summary = "Delete skills", description = "Deletes the candidate skills from the storage service")
    public ResponseEntity<GenericResponse<Map<String,String>>> deleteSkills(@PathVariable Long id) {
        return ResponseEntity.ok(candidateProfileService.deleteSkills(id));
    }

}
