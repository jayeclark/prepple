package com.prepple.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Preconditions;
import com.prepple.api.configuration.ServiceConfig;
import com.prepple.api.dto.QuestionDto;
import com.prepple.api.model.Question;
import com.prepple.api.model.QuestionBatchRequest;
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
    ObjectMapper mapper = Mapper.getInstance();

    /**
     * Retrieves a random question or questions from the database
     * TODO: Add in session storage and the option to sample questions with and without replacement
     * @return Map<String, QuestionDto> A REST API json response containing a single question data transfer object
     */
    @RequestMapping(path = "/question/random", method = RequestMethod.GET)
    public Map<String, List<QuestionDto>> getRandomQuestion(@RequestParam Integer maxResults, @RequestHeader(HttpHeaders.AUTHORIZATION) String authToken) {
        List<String> seenQuestionUrns = authToken == null ? null: sessionService.getSeenQuestionUrns(authToken);
        List<QuestionDto> question = service.getRandom(maxResults, seenQuestionUrns);
        Map<String, List<QuestionDto>> response = new HashMap<>();
        response.put("question", question);
        return response;
    }

    /**
     * Retrieves a single question from the database based on its unique urn
     * @param urn String The id of the question that should be retrieved
     * @return Map<String, QuestionDto> A REST API json response containing a single question data transfer object
     */
    @RequestMapping(path = "/questions/{urn}", method = RequestMethod.GET)
    public Map<String, QuestionDto> getQuestionById(@PathVariable(value="urn") String urn) {
        QuestionDto question = service.getByUrn(urn);
        Map<String, QuestionDto> response = new HashMap<>();
        response.put("question", question);
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
    public Map<String, QuestionDto> addQuestion(@RequestBody String body) throws JsonProcessingException {
        Question entityToCreate = mapper.readValue(body, Question.class);
        QuestionDto question = service.create(entityToCreate);
        Map<String, QuestionDto> response = new HashMap<>();
        response.put("question", question);
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
    public Map<String, String> updateQuestion(@PathVariable(value="urn") String urn, @RequestBody String body) throws JsonProcessingException {
        Question entityToUpdate = mapper.readValue(body, Question.class);
        Preconditions.checkState(entityToUpdate.getUrn().equals(urn));
        service.update(entityToUpdate);
        Map<String, String> response = new HashMap<>();
        response.put("update", "success");
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
    public Map<String, String> deleteQuestion(@PathVariable(value="urn") String urn) {
        service.deleteByUrn(urn);
        Map<String, String> response = new HashMap<>();
        response.put("delete", "success");
        return response;
    }

    /**
     * Searches questions with a specific query
     * @return TBD. (Need to plan/implement query design and how it will work on the front end)
     */
    @RequestMapping(path = "/questions", method = RequestMethod.GET)
    public Map<String, String> searchQuestions() {
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
    public Map<String, List<QuestionDto>> getQuestionsBatch(@RequestBody String body) throws JsonProcessingException {
        QuestionBatchRequest request = mapper.readValue(body, QuestionBatchRequest.class);
        List<String> urns = request.getUrnsToFetch();
        Preconditions.checkState(urns.size() <= ServiceConfig.MAX_QUESTION_BATCH_SIZE);

        List<QuestionDto> questions = urns.stream().map(urn -> service.getByUrn(urn)).collect(Collectors.toList());
        Map<String, List<QuestionDto>> response = new HashMap<>();
        response.put("question", questions);
        return response;
    }
}
