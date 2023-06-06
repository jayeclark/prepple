package com.prepple.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.Map;

@Data
@AllArgsConstructor
public class Jwt {
    JwtHeader header;
    JwtPayload payload;
    String signature;
}
