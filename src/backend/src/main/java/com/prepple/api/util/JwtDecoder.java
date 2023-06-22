package com.prepple.api.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prepple.api.configuration.ServiceConfig;
import com.prepple.api.model.shared.Jwt;
import com.prepple.api.model.shared.JwtHeader;
import com.prepple.api.model.shared.JwtPayload;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.DefaultJwtSignatureValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

/**
 * Utility for decoding & validating JSON Web Tokens passed to Core API
 */
@Component
public class JwtDecoder {
    private final Base64.Decoder base64decoder;

    @Autowired
    ObjectMapper objectMapper;

    /**
     * Instance contructor. Sets the base64decoder instance.
     */
    public JwtDecoder() {
        base64decoder = Base64.getUrlDecoder();
    }

    /**
     * Method to decode the JWT passed to the API
     * @param jwtEncoded the encoded string version of the JWT
     * @return Jwt A deserialized JWT
     * @throws JsonProcessingException
     */
    public Jwt decodeToken(String jwtEncoded) throws JsonProcessingException {
        String[] chunks = jwtEncoded.split("\\.");
        JwtHeader header = decodeHeader(new String(base64decoder.decode(chunks[0])));
        JwtPayload payload = decodePayload(new String(base64decoder.decode(chunks[1])));
        String signature = chunks[2];
        return new Jwt(header, payload, signature);
    }

    /**
     * Method to determine whether a JWT is valid based on the signature. This allows us to checked whether the JWT
     * claims or expiry time has been altered.
     * @param jwtEncoded The encoded string of the JWT
     * @return Boolean is the token valid or not
     */
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

    /**
     * Method to parse the JWT header into a data object
     * @param headerString String representing the decoded header
     * @return JwtHeader
     * @throws JsonProcessingException
     */
    private JwtHeader decodeHeader(String headerString) throws JsonProcessingException {
        return objectMapper.readValue(headerString, JwtHeader.class);
    }

    /**
     * Method to parse the JWT payload into a data object
     * @param headerString String representing the decoded payload
     * @return JwtPayload
     * @throws JsonProcessingException
     */
    private JwtPayload decodePayload(String headerString) throws JsonProcessingException {
        return objectMapper.readValue(headerString, JwtPayload.class);
    }
}
