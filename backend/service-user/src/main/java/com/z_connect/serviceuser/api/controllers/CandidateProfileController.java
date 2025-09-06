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

@RestController
@RequestMapping("/api/v1/candidate")
public class CandidateProfileController {

    private final ICandidateProfileService candidateProfileService;

    public CandidateProfileController(ICandidateProfileService candidateProfileService) {
        this.candidateProfileService = candidateProfileService;
    }

    @GetMapping("/status")
    @Operation(summary = "Get the status of the service")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.accepted().body("OK");
    }

    @GetMapping("/basicDetails")
    public ResponseEntity<GenericResponse<BasicInfoDto>> getBasicCandidateDetails() {
        return ResponseEntity.ok(candidateProfileService.getBasicCandidateDetails());
    }

    @GetMapping("/details")
    public ResponseEntity<GenericResponse<CandidateProfileDto>> getCandidateDetails() {
        return ResponseEntity.ok(candidateProfileService.getCandidateDetails());
    }

    @GetMapping("/all-candidates")
    public ResponseEntity<GenericResponse<List<UserDetailsDto>>> getAllCandidates() {
        return ResponseEntity.ok(candidateProfileService.getCandidates());
    }

    @GetMapping("/all-recruiters")
    public ResponseEntity<GenericResponse<List<UserDetailsDto>>> getAllRecruiters() {
        return ResponseEntity.ok(candidateProfileService.getRecruiters());
    }

    @GetMapping("/resumes")
    public ResponseEntity<GenericResponse<List<ResumeDto>>> getCandidateResumes() {
        return ResponseEntity.ok(candidateProfileService.getResumes());
    }

    @GetMapping("/education")
    public ResponseEntity<GenericResponse<List<EducationDto>>> getCandidateEducation() {
        return ResponseEntity.ok(candidateProfileService.getEducations());
    }

    @GetMapping("/experience")
    public ResponseEntity<GenericResponse<List<WorkExperienceDto>>> getCandidateExperience() {
        return ResponseEntity.ok(candidateProfileService.getExperiences());
    }

    @GetMapping("/skills")
    public ResponseEntity<GenericResponse<List<UserSkillsDto>>> getCandidateSkills() {
        return ResponseEntity.ok(candidateProfileService.getSkills());
    }

    @GetMapping("/profile-picture")
    public ResponseEntity<GenericResponse<String>> getProfilePicture() {
        return ResponseEntity.ok(candidateProfileService.getProfilePicture());
    }

    @PutMapping("/create-update-profile")
    public ResponseEntity<GenericResponse<Map<String,String>>> createAndUpdateCandidate(@RequestBody CandidateProfileDto candidateProfileDto) {
        return ResponseEntity.ok(candidateProfileService.createAndUpdateCandidate(candidateProfileDto));
    }

    @PostMapping("/upload-profile-picture")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadProfilePicture(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(candidateProfileService.uploadProfilePicture(file));
    }

    @PostMapping("/upload-resume")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadResume(@RequestParam("file") MultipartFile file, @RequestBody String filename) {
        return ResponseEntity.ok(candidateProfileService.uploadResume(file,filename));
    }

    @PostMapping("/upload-education")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadEducation(@RequestBody EducationDto educationDto) {
        return ResponseEntity.ok(candidateProfileService.uploadEducation(educationDto));
    }

    @PostMapping("/upload-experience")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadExperience(@RequestBody WorkExperienceDto workExperienceDto) {
        return ResponseEntity.ok(candidateProfileService.uploadExperience(workExperienceDto));
    }

    @PostMapping("/upload-skills")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadSkills(@RequestBody UserSkillsDto userSkillsDto) {
        return ResponseEntity.ok(candidateProfileService.uploadSkills(userSkillsDto));
    }

    @PatchMapping("/update-profile-with-Social-Links")
    public ResponseEntity<GenericResponse<Map<String,String>>> updateProfileWithSocialLinks(@RequestBody SocialLinksDto socialLinksDto) {
        return ResponseEntity.ok(candidateProfileService.updateProfileWithSocialLinks(socialLinksDto));
    }

    @PatchMapping("/set-education-as-primary")
    public ResponseEntity<GenericResponse<Map<String,String>>> setEducationAsPrimary(@RequestBody ProfileUpdateDto profileUpdateDto) {
        return ResponseEntity.ok(candidateProfileService.setEducationAsPrimary(profileUpdateDto));
    }

    @PatchMapping("/set-experience-as-primary")
    public ResponseEntity<GenericResponse<Map<String,String>>> setExperienceAsPrimary(@RequestBody ProfileUpdateDto profileUpdateDto) {
        return ResponseEntity.ok(candidateProfileService.setExperienceAsPrimary(profileUpdateDto));
    }

    @PatchMapping("/set-resume-as-primary")
    public ResponseEntity<GenericResponse<Map<String,String>>> setResumeAsPrimary(@RequestBody ProfileUpdateDto profileUpdateDto) {
        return ResponseEntity.ok(candidateProfileService.setResumeAsPrimary(profileUpdateDto));
    }

    @PatchMapping("/update-display-status")
    public ResponseEntity<GenericResponse<Map<String,String>>> updateDisplayStatus(@RequestBody DisplayStatusDto displayStatusDto) {
        return ResponseEntity.ok(candidateProfileService.updateDisplayStatus(displayStatusDto));
    }

    @DeleteMapping("/delete-profile-picture")
    public ResponseEntity<GenericResponse<Map<String,String>>> deleteProfilePicture() {
        return ResponseEntity.ok(candidateProfileService.deleteProfilePicture());
    }

    @DeleteMapping("/delete-resume/{id}")
    public ResponseEntity<GenericResponse<Map<String,String>>> deleteResume(@PathVariable Long id) {
        return ResponseEntity.ok(candidateProfileService.deleteResume(id));
    }

    @DeleteMapping("/delete-education/{id}")
    public ResponseEntity<GenericResponse<Map<String,String>>> deleteEducation(@PathVariable Long id) {
        return ResponseEntity.ok(candidateProfileService.deleteEducation(id));
    }

    @DeleteMapping("/delete-experience/{id}")
    public ResponseEntity<GenericResponse<Map<String,String>>> deleteExperience(@PathVariable Long id) {
        return ResponseEntity.ok(candidateProfileService.deleteExperience(id));
    }

    @DeleteMapping("/delete-skills/{id}")
    public ResponseEntity<GenericResponse<Map<String,String>>> deleteSkills(@PathVariable Long id) {
        return ResponseEntity.ok(candidateProfileService.deleteSkills(id));
    }

}
