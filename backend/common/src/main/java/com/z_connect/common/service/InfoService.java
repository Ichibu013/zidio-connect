package com.z_connect.common.service;

import com.z_connect.common.dto.CompanyInfoDto;
import com.z_connect.common.dto.JobCategoryInfoDto;
import com.z_connect.common.dto.SkillInfoDto;
import com.z_connect.common.model.Company;
import com.z_connect.common.model.JobCategory;
import com.z_connect.common.model.Skill;
import com.z_connect.common.repository.ICompanyRepository;
import com.z_connect.common.repository.IJobCategoryRepository;
import com.z_connect.common.repository.ISkillRepository;
import com.z_connect.common.utils.mapping.GenericDtoMapper;
import com.z_connect.common.utils.response.GenericResponse;
import com.z_connect.common.utils.response.GenericResponseFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Provides methods for managing and uploading company, skill, and job category information
 * to the database. This service is an extension of {@link BaseService} and utilizes
 * repositories and a mapper for handling the respective entities.
 */
@Slf4j
@Service
public class InfoService extends BaseService {

    private final ICompanyRepository companyRepository;
    private final ISkillRepository skillRepository;
    private final IJobCategoryRepository jobCategoryRepository;


    public InfoService(GenericDtoMapper mapper,
                       GenericResponseFactory responseFactory,
                       ICompanyRepository companyRepository,
                       ISkillRepository skillRepository,
                       IJobCategoryRepository jobCategoryRepository) {
        super(mapper, responseFactory);
        this.companyRepository = companyRepository;
        this.skillRepository = skillRepository;
        this.jobCategoryRepository = jobCategoryRepository;
    }

    /**
     * Uploads company information to the database and returns a success response.
     *
     * @param companyInfoDto an object containing company information such as name, description,
     *                       website, logo URL, industry, company size, and location.
     * @return a GenericResponse object containing a map with response details and a success message.
     */
    public GenericResponse<Map<String, String>> uploadCompanyInfo(CompanyInfoDto companyInfoDto) {
        companyRepository.save(mapper.map(companyInfoDto, Company.class));
        log.info("Company details uploaded");
        return responseFactory.successResponse(
                responseMessage("Company details updated"),
                "success.company.uploaded"
        );
    }

    /**
     * Uploads skill information to the database and returns a success or error response.
     *
     * @param skillInfoDto an object containing a list of skill names to be uploaded.
     * @return a GenericResponse object containing a map with response details, indicating
     *         the success or failure of the operation.
     */
    public GenericResponse<Map<String, String>> uploadSkillInfo(SkillInfoDto skillInfoDto) {
        return uploadNewItems(
                skillInfoDto.getSkillName(),
                skillRepository,
                Skill::getSkillName,
                name -> {
                    Skill skill = new Skill();
                    skill.setSkillName(name);
                    return skill;
                },
                "skills"
        );

    }

    /**
     * Uploads job category information to the database and returns a success or error response.
     *
     * @param jobCategoryInfoDto an object containing a list of job category names to be uploaded.
     * @return a GenericResponse object containing a map with response details, indicating
     *         the success or failure of the operation.
     */
    public GenericResponse<Map<String, String>> uploadJobCategoryInfo(JobCategoryInfoDto jobCategoryInfoDto) {
        return uploadNewItems(
                jobCategoryInfoDto.getCategoryName(),
                jobCategoryRepository,
                JobCategory::getCategoryName,
                name -> {
                    JobCategory jobCategory = new JobCategory();
                    jobCategory.setCategoryName(name);
                    return jobCategory;
                },
                "job.categories"
        );
    }

    /**
     * Uploads a list of new items to a specified repository, checking for duplicates
     * based on existing entity names. If any new items are added, they are saved, and
     * a success response is returned. If no new items are added, an error response is
     * returned.
     *
     * @param <T> the entity type to be operated on.
     * @param <D> the type of the identifier for the entity.
     * @param newItems a list of new item names to be uploaded.
     * @param repository the JPA repository used to retrieve and save entities.
     * @param nameExtractor a function to extract the name attribute from the entity.
     * @param itemCreator a function to create a new entity based on a given name.
     * @param entityName a string representing the name of the entity type (used for logging and messages).
     * @return a GenericResponse object containing a map with response details, indicating
     *         the success or failure of the operation.
     */
    public <T, D> GenericResponse<Map<String, String>> uploadNewItems(
            List<String> newItems,
            JpaRepository<T, D> repository,
            Function<T, String> nameExtractor,
            Function<String, T> itemCreator,
            String entityName
    ) {
        Set<String> existingItemNames = repository.findAll()
                .stream()
                .map(nameExtractor)
                .collect(Collectors.toSet());

        List<T> itemsToSave = new ArrayList<>();
        for (String newItemName : newItems) {
            if (!existingItemNames.contains(newItemName)) {
                itemsToSave.add(itemCreator.apply(newItemName));
            }
        }

        if (!itemsToSave.isEmpty()) {
            repository.saveAll(itemsToSave);
            log.info("Saved {} new {}", itemsToSave.size(), entityName);
        } else {
            log.info("No new {} to save", entityName);
            return responseFactory.errorResponse(
                    responseMessage("No new " + entityName + " to save"),
                    "success." + entityName.toLowerCase() + ".not.saved"
            );
        }

        return responseFactory.successResponse(
                responseMessage(entityName + " details updated"),
                "success." + entityName.toLowerCase() + ".uploaded"
        );
    }

}
