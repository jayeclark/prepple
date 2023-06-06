package com.prepple.api.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class JwtPayload {
    String sub;
    String name;
    String iat;
    List<Subscription> groups;
    Date expires;
}
