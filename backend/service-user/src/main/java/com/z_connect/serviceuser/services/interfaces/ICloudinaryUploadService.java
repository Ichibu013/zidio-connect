package com.z_connect.serviceuser.services.interfaces;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service interface responsible for handling file uploads to Cloudinary.
 * This interface defines the contract for uploading files to a specified folder
 * within a Cloudinary account.
 */
@Service
public interface ICloudinaryUploadService {

    String uploadData(MultipartFile file, String folder);

}
