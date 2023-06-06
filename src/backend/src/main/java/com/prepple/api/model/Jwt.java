package com.prepple.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Class to model components of the Jwt passed to the CORE API
 */
@Data
@AllArgsConstructor
public class Jwt {
    JwtHeader header;
    JwtPayload payload;
    String signature;
}
