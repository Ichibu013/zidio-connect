package com.z_connect.serviceuser.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.z_connect.common.exceptions.CloudinaryOperationFailedException;
import com.z_connect.common.service.BaseService;
import com.z_connect.common.utils.mapping.GenericDtoMapper;
import com.z_connect.common.utils.response.GenericResponseFactory;
import com.z_connect.serviceuser.services.interfaces.ICloudinaryUploadService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * Service implementation for handling file uploads to Cloudinary.
 * This class provides functionality to upload files to a specified folder
 * within a Cloudinary account and retrieve the resulting file URL.
 */
@Service
public class CloudinaryUploadService extends BaseService implements ICloudinaryUploadService {

    private final Cloudinary cloudinary;

    public CloudinaryUploadService(GenericDtoMapper mapper,
                                   GenericResponseFactory responseFactory,
                                   Cloudinary cloudinary) {
        super(mapper, responseFactory);
        this.cloudinary = cloudinary;
    }

    /**
     * Uploads a file to a specified folder in Cloudinary and returns the URL of the uploaded file.
     *
     * @param file   the file to be uploaded, provided as a {@link MultipartFile}
     * @param folder the folder within the Cloudinary account where the file will be uploaded
     * @return the URL of the successfully uploaded file as a {@link String}
     * @throws CloudinaryOperationFailedException if the file upload process fails
     */
    @Override
    public String uploadData(MultipartFile file, String folder) {
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder",folder));
            return (String) uploadResult.get("url");
        } catch (IOException e) {
            throw new CloudinaryOperationFailedException("Failed to upload file to cloudinary ... message:" + e.getMessage());
        }
    }
}
