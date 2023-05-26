package com.prepple.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.HashMap;
import java.util.Map;

@RestController
@EnableWebMvc
public class QuestionController {

    @RequestMapping(path = "/questions/random", method = RequestMethod.GET)
    public Map<String, String> getRandomQuestion() {
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }

    @RequestMapping(path = "/questions/{*id}", method = RequestMethod.GET)
    public Map<String, String> getQuestion() {
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }

    @RequestMapping(path = "/questions", method = RequestMethod.POST)
    public Map<String, String> addQuestion() {
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }

    @RequestMapping(path = "/questions/{*id}", method = RequestMethod.PUT)
    public Map<String, String> updateQuestion() {
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }

    @RequestMapping(path = "/questions/{*id}", method = RequestMethod.DELETE)
    public Map<String, String> deleteQuestion() {
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }

    @RequestMapping(path = "/questions", method = RequestMethod.GET)
    public Map<String, String> searchQuestions() {
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }

    @RequestMapping(path = "/questions/batch", method = RequestMethod.GET)
    public Map<String, String> getQuestionsBatch() {
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }


}
