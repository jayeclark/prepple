package com.prepple.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Preconditions;
import com.google.common.collect.ImmutableMap;
import com.prepple.api.configuration.Authorization;
import com.prepple.api.configuration.Route;
import com.prepple.api.configuration.ServiceConfig;
import com.prepple.api.dto.QuestionDto;
import com.prepple.api.model.Question;
import com.prepple.api.model.QuestionBatchRequest;
import com.prepple.api.service.AuthService;
import com.prepple.api.service.QuestionService;
import com.prepple.api.service.SessionService;
import com.prepple.api.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Class defines REST API routes and service calls for to the Question entity.
 */
@RestController
@EnableWebMvc
public class QuestionController {

    @Autowired
    QuestionService service;

    @Autowired
    SessionService sessionService;

    @Autowired
    AuthService authService;

    @Autowired
    ObjectMapper mapper = Mapper.getInstance();

    /**
     * Retrieves a random question or questions from the database
     * @return Map<String, QuestionDto> A REST API json response containing a single question data transfer object
     */
    @RequestMapping(path = "/question/random", method = RequestMethod.GET)
    public Map<Object, Object> getRandomQuestion(
            @RequestParam(required = false) Integer maxResults,
            @RequestHeader(required = false, value=HttpHeaders.AUTHORIZATION) String authToken
    ) {
        if (!authService.isUserAuthorizedToAccessRoute(Route.GET_RANDOM_QUESTION, authToken)) {
            Authorization.throwUnauthorizedResponseStatusException();
        }

        List<String> seenQuestionUrns = authToken == null ? null: sessionService.getSeenQuestionUrns(authToken);
        List<QuestionDto> questions = service.getRandom(maxResults, seenQuestionUrns);
        Map<Object, Object> response = ImmutableMap.builder().put("question", questions).build();
        return response;
    }

    /**
     * Retrieves a single question from the database based on its unique urn
     * @param urn String The id of the question that should be retrieved
     * @return Map<String, QuestionDto> A REST API json response containing a single question data transfer object
     */
    @RequestMapping(path = "/questions/{urn}", method = RequestMethod.GET)
    public Map<Object, Object> getQuestionByUrn(
            @PathVariable(value="urn") String urn,
            @RequestHeader(required = false, value=HttpHeaders.AUTHORIZATION) String authToken
    ) {
        if (!authService.isUserAuthorizedToAccessRoute(Route.GET_QUESTION_BY_URN, authToken)) {
            Authorization.throwUnauthorizedResponseStatusException();
        }

        QuestionDto question = service.getByUrn(urn);
        Map<Object, Object> response = ImmutableMap.builder().put("question", question).build();
        return response;
    }

    /**
     * Adds a question to the database
     * @param body String A parseable JSON object containing entity data for creating a question
     * @return @return Map<String, QuestionDto> A REST API json response containing a single question
     * data transfer object representing the question that was just created
     * @throws JsonProcessingException
     */
    @RequestMapping(path = "/questions", method = RequestMethod.POST)
    public Map<Object, Object> addQuestion(
            @RequestBody String body,
            @RequestHeader(required = false, value=HttpHeaders.AUTHORIZATION) String authToken
    ) throws JsonProcessingException {
        if (!authService.isUserAuthorizedToAccessRoute(Route.ADD_QUESTION, authToken)) {
            Authorization.throwUnauthorizedResponseStatusException();
        }

        Question entityToCreate = mapper.readValue(body, Question.class);
        QuestionDto question = service.create(entityToCreate);
        Map<Object, Object> response = ImmutableMap.builder().put("question", question).build();
        return response;
    }

    /**
     * Updates a question in the database
     * @param urn String The urn of the question that should be updated
     * @param body String A parsable JSON object containing the new entity data
     * @return Map<String, String> A response indicating that the update was successful
     * TODO: Change response type to indicate whether entity was upserted or not, or whether there were changes
     * @throws JsonProcessingException
     */
    @RequestMapping(path = "/questions/{urn}", method = RequestMethod.PUT)
    public Map<Object, Object> updateQuestion(
            @PathVariable(value="urn") String urn,
            @RequestBody String body,
            @RequestHeader(required = false, value=HttpHeaders.AUTHORIZATION) String authToken

    ) throws JsonProcessingException {
        if (!authService.isUserAuthorizedToAccessRoute(Route.UPDATE_QUESTION, authToken)) {
            Authorization.throwUnauthorizedResponseStatusException();
        }

        Question entityToUpdate = mapper.readValue(body, Question.class);
        Preconditions.checkState(entityToUpdate.getUrn().equals(urn));
        service.update(entityToUpdate);
        Map<Object, Object> response = ImmutableMap.builder().put("update", "success").build();
        return response;
    }

    /**
     * Deletes a question from the postgres database
     * TODO: What happens to questions stored elsewhere in other data stores when this happens?
     * @param urn String The URN of the question to be deleted
     * @return Map<String, String> A response indicating that the deletion was successful
     * TODO: Change response type to indicate more useful information
     */
    @RequestMapping(path = "/questions/{urn}", method = RequestMethod.DELETE)
    public Map<Object, Object> deleteQuestion(
            @PathVariable(value="urn") String urn,
            @RequestHeader(required = false, value=HttpHeaders.AUTHORIZATION) String authToken
    ) {
        if (!authService.isUserAuthorizedToAccessRoute(Route.DELETE_QUESTION, authToken)) {
            Authorization.throwUnauthorizedResponseStatusException();
        }

        service.deleteByUrn(urn);
        Map<Object, Object> response = ImmutableMap.builder().put("delete", "success").build();
        return response;
    }

    /**
     * Searches questions with a specific query
     * @return TBD. (Still need to plan/implement query design and how it will work on the front end)
     */
    @RequestMapping(path = "/questions", method = RequestMethod.GET)
    public Map<String, String> searchQuestions(
            @RequestHeader(required = false, value=HttpHeaders.AUTHORIZATION) String authToken
    ) {
        if (!authService.isUserAuthorizedToAccessRoute(Route.SEARCH_QUESTIONS, authToken)) {
            Authorization.throwUnauthorizedResponseStatusException();
        }

        // TODO: Implement search functionality for common searches, depends on creating related entities first
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }

    /**
     * Retrieves a batch of questions based on their ids
     * @param body String A JSON Array of ids that should be retrieved
     * @return A list of question data transfer objects for the requested IDs
     * @throws JsonProcessingException
     */
    @RequestMapping(path = "/questions/batch", method = RequestMethod.POST)
    public Map<Object, Object> getQuestionsBatch(
            @RequestBody String body,
            @RequestHeader(required = false, value=HttpHeaders.AUTHORIZATION) String authToken
    ) throws JsonProcessingException {
        if (!authService.isUserAuthorizedToAccessRoute(Route.GET_QUESTIONS_BATCH, authToken)) {
            Authorization.throwUnauthorizedResponseStatusException();
        }

        QuestionBatchRequest request = mapper.readValue(body, QuestionBatchRequest.class);
        List<String> urns = request.getUrnsToFetch();
        Preconditions.checkState(urns.size() <= ServiceConfig.MAX_QUESTION_BATCH_SIZE);

        List<QuestionDto> questions = urns.stream().map(urn -> service.getByUrn(urn)).collect(Collectors.toList());
        Map<Object, Object> response = ImmutableMap.builder().put("question", questions).build();
        return response;
    }
}
