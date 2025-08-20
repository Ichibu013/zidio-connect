package com.z_connect.common.service;

import com.z_connect.common.utils.mapping.GenericDtoMapper;
import com.z_connect.common.utils.response.GenericResponseFactory;

import java.util.Map;


public class BaseService {

    public final GenericDtoMapper mapper;

    public final GenericResponseFactory responseFactory;

    public BaseService(GenericDtoMapper mapper, GenericResponseFactory responseFactory) {
        this.mapper = mapper;
        this.responseFactory = responseFactory;
    }

    public Map<String, String> responseMessage(String message) {
        return Map.of("message", message);
    }

}
