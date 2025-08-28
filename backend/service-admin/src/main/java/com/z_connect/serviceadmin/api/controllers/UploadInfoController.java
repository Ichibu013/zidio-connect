package com.z_connect.serviceadmin.api.controllers;

import com.z_connect.common.dto.CompanyInfoDto;
import com.z_connect.common.dto.JobCategoryInfoDto;
import com.z_connect.common.dto.SkillInfoDto;
import com.z_connect.common.service.InfoService;
import com.z_connect.common.utils.response.GenericResponse;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Rest Controller for uploading and managing informational data such as company, skill, and job category details.
 * All operations within this controller are restricted to users with the 'ADMIN' role.
 *
 * Endpoints provided in this controller allow the following functionalities:
 * - Uploading company information.
 * - Uploading skill information.
 * - Uploading job category information.
 */
@Validated
@RestController
@RequestMapping("/api/upload-info")
@PreAuthorize( "hasRole('ADMIN')")
public class UploadInfoController {

    private final InfoService infoService;

    public UploadInfoController(InfoService infoService) {
        this.infoService = infoService;
    }

    /**
     * Handles the HTTP POST request to upload company information.
     * This method processes the provided company details and saves them to the database.
     *
     * @param companyInfoDto a DTO containing company information such as name, description, website,
     *                       logo URL, industry, company size, and location.
     * @return a ResponseEntity containing a GenericResponse with a success message and detailed response data.
     */
    @PostMapping("/company")
    @Operation(summary = "Upload company information", description = "Uploads company information to the database.")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadCompanyInfo(@Valid @RequestBody CompanyInfoDto companyInfoDto) {
        return ResponseEntity.ok(infoService.uploadCompanyInfo(companyInfoDto));
    }

    /**
     * Uploads skill information to the database.
     *
     * @param skillInfoDto a DTO containing a list of skill names to be uploaded.
     * @return a ResponseEntity containing a GenericResponse with the success message,
     *         additional details, and status of the operation.
     */
    @PutMapping("/skill")
    @Operation(summary = "Upload skill information", description = "Uploads skill information to the database.")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadSkillInfo(@Valid @RequestBody SkillInfoDto skillInfoDto) {
        return ResponseEntity.ok(infoService.uploadSkillInfo(skillInfoDto));
    }

    /**
     * Uploads job category information to the database.
     *
     * @param jobCategoryInfoDto a DTO containing a list of job category names to be uploaded.
     * @return a ResponseEntity containing a GenericResponse with a map of response details
     *         indicating the success or failure of the operation.
     */
    @PutMapping("/job-category")
    @Operation(summary = "Upload job category information", description = "Uploads job category information to the database.")
    public ResponseEntity<GenericResponse<Map<String,String>>> uploadJobCategoryInfo(@Valid @RequestBody JobCategoryInfoDto jobCategoryInfoDto) {
        return ResponseEntity.ok(infoService.uploadJobCategoryInfo(jobCategoryInfoDto));
    }

}
