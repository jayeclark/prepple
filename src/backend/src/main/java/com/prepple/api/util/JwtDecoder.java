package com.prepple.api.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prepple.api.configuration.ServiceConfig;
import com.prepple.api.model.Jwt;
import com.prepple.api.model.JwtHeader;
import com.prepple.api.model.JwtPayload;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.DefaultJwtSignatureValidator;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Component
public class JwtDecoder {
    private final Base64.Decoder base64decoder;

    ObjectMapper objectMapper = Mapper.getInstance();

    public JwtDecoder() {
        base64decoder = Base64.getUrlDecoder();
    }

    public Jwt decodeToken(String jwtEncoded) throws JsonProcessingException {
        String[] chunks = jwtEncoded.split("\\.");
        JwtHeader header = decodeHeader(new String(base64decoder.decode(chunks[0])));
        JwtPayload payload = decodePayload(new String(base64decoder.decode(chunks[1])));
        String signature = chunks[2];
        return new Jwt(header, payload, signature);
    }

    public Boolean isTokenValid(String jwtEncoded) {
        Boolean tokenValid = false;

        String[] chunks = jwtEncoded.split("\\.");
        String tokenWithoutSignature = chunks[0] + "." + chunks[1];
        String signature = chunks[2];

        SignatureAlgorithm sa = SignatureAlgorithm.HS256;
        SecretKeySpec secretKeySpec = new SecretKeySpec(ServiceConfig.getJwtSecretKey().getBytes(), sa.getJcaName());

        DefaultJwtSignatureValidator validator = new DefaultJwtSignatureValidator(sa, secretKeySpec);

        if (validator.isValid(tokenWithoutSignature, signature)) {
            tokenValid = true;
        }
        return tokenValid;
    }

    private JwtHeader decodeHeader(String headerString) throws JsonProcessingException {
        return objectMapper.readValue(headerString, JwtHeader.class);
    }

    private JwtPayload decodePayload(String headerString) throws JsonProcessingException {
        return objectMapper.readValue(headerString, JwtPayload.class);
    }
}
