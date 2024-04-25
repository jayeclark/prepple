package com.prepple.resources;

import com.prepple.models.Question;
import com.prepple.models.Schema;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.UUID;

@Path("/goodbye")
public class OtherGreetingResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Question goodbye() {
        return Question.builder()
                .schema(Schema.QUESTION)
                .schemaVersion(1)
                .id(UUID.randomUUID().toString())
                .title("test title 2")
                .question("test question")
                .guidesCount(0)
                .build();
    }
}
