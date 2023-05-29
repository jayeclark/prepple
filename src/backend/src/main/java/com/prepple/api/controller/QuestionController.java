package com.prepple.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Preconditions;
import com.prepple.api.configuration.ServiceConfig;
import com.prepple.api.dto.QuestionDto;
import com.prepple.api.model.Question;
import com.prepple.api.model.QuestionBatchRequest;
import com.prepple.api.service.QuestionService;
import com.prepple.api.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    ObjectMapper mapper = Mapper.getInstance();

    @RequestMapping(path = "/question/random", method = RequestMethod.GET)
    public Map<String, QuestionDto> getRandomQuestion() {
        QuestionDto question = service.getRandom();
        Map<String, QuestionDto> response = new HashMap<>();
        response.put("question", question);
        return response;
    }

    @RequestMapping(path = "/questions/{id}", method = RequestMethod.GET)
    public Map<String, QuestionDto> getQuestionById(@PathVariable(value="id") String id) {
        QuestionDto question = service.getById(id);
        Map<String, QuestionDto> response = new HashMap<>();
        response.put("question", question);
        return response;
    }

    @RequestMapping(path = "/questions", method = RequestMethod.POST)
    public Map<String, QuestionDto> addQuestion(@RequestBody String body) throws JsonProcessingException {
        Question entityToCreate = mapper.readValue(body, Question.class);
        QuestionDto question = service.create(entityToCreate);
        Map<String, QuestionDto> response = new HashMap<>();
        response.put("question", question);
        return response;
    }

    @RequestMapping(path = "/questions/{id}", method = RequestMethod.PUT)
    public Map<String, String> updateQuestion(@PathVariable(value="id") String id, @RequestBody String body) throws JsonProcessingException {
        Question entityToUpdate = mapper.readValue(body, Question.class);
        Preconditions.checkState(entityToUpdate.getId().equals(id));
        service.update(entityToUpdate);
        Map<String, String> response = new HashMap<>();
        response.put("update", "success");
        return response;
    }

    @RequestMapping(path = "/questions/{id}", method = RequestMethod.DELETE)
    public Map<String, String> deleteQuestion(@PathVariable(value="id") String id) {
        service.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("delete", "success");
        return response;
    }

    @RequestMapping(path = "/questions", method = RequestMethod.GET)
    public Map<String, String> searchQuestions() {
        // TODO: Implement search functionality for common searches, depends on creating related entities first
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }

    @RequestMapping(path = "/questions/batch", method = RequestMethod.POST)
    public Map<String, List<QuestionDto>> getQuestionsBatch(@RequestBody String body) throws JsonProcessingException {
        QuestionBatchRequest request = mapper.readValue(body, QuestionBatchRequest.class);
        List<String> ids = request.getIdsToFetch();
        Preconditions.checkState(ids.size() <= ServiceConfig.MAX_QUESTION_BATCH_SIZE);

        List<QuestionDto> questions = ids.stream().map(id -> service.getById(id)).collect(Collectors.toList());
        Map<String, List<QuestionDto>> response = new HashMap<>();
        response.put("question", questions);
        return response;
    }
}
