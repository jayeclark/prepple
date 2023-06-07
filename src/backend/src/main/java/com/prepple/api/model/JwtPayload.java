package com.prepple.api.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * Payload component of JSON web token model
 */
@Data
public class JwtPayload {
    String sub;
    String name;
    String iat;
    List<Subscription> groups;
    Date expires;
}
