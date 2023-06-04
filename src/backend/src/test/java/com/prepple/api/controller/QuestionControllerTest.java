package com.prepple.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prepple.api.dto.QuestionDto;
import com.prepple.api.model.Question;
import com.prepple.api.service.QuestionService;
import com.prepple.api.util.Mapper;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.sql.Time;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = QuestionController.class)
class QuestionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper mapper = Mapper.getInstance();

    @MockBean
    private QuestionService service;

    private List<String> idsToFetch;

    private final QuestionDto RANDOM_QUESTION = QuestionService.mapQuestionToQuestionDto(Question.builder()
            .id(123L)
            .urn("abc")
            .title("first title")
            .question("random question")
            .createdAt(new Time(System.currentTimeMillis()))
            .build());

    private final QuestionDto QUESTION_BY_ID = QuestionService.mapQuestionToQuestionDto(Question.builder()
            .id(678)
            .urn("def")
            .title("second title")
            .question("question retrieved by id")
            .createdAt(new Time(System.currentTimeMillis() - 1000))
            .build());

    private final QuestionDto CREATE_QUESTION = QuestionService.mapQuestionToQuestionDto(Question.builder()
            .id(345)
            .urn("cde")
            .title("request title")
            .question("request question")
            .createdAt(new Time(System.currentTimeMillis() - 1000))
            .build());

    private final QuestionDto UPDATE_QUESTION = QuestionService.mapQuestionToQuestionDto(Question.builder()
            .id(345)
            .urn("cde")
            .title("request title")
            .question("request question")
            .createdAt(new Time(System.currentTimeMillis() - 1000))
            .acceptance(0.7)
            .frequency(0.5)
            .build());

    private JSONObject addQuestionJSON;
    private JSONObject updateQuestionJSON;

    // GET RANDOM QUESTION
    @Test
    void when_getRandomQuestion_validInput_thenReturns200() throws Exception {
        when(service.getRandom()).thenReturn(Collections.singletonList(RANDOM_QUESTION));

        mockMvc.perform(get("/question/random")
                        .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    void when_getRandomQuestion_validInput_thenReturnsExpectedOutput() throws Exception {
        when(service.getRandom()).thenReturn(Collections.singletonList(RANDOM_QUESTION));

        MvcResult mvcResult = mockMvc.perform(get("/question/random")
                        .contentType("application/json"))
                .andReturn();

        Map<String, QuestionDto> expectedResponse = new HashMap<>();
        expectedResponse.put("question", RANDOM_QUESTION);
        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        assertEquals(actualResponseBody,
                mapper.writeValueAsString(expectedResponse));
    }

    @Test
    void when_getRandomQuestion_invalidPostMethod_thenReturns4xx() throws Exception {
        when(service.getRandom()).thenReturn(Collections.singletonList(RANDOM_QUESTION));

        mockMvc.perform(post("/question/random")
                        .contentType("application/json"))
                .andExpect(status().is4xxClientError());
    }

    @Test
    void when_getRandomQuestion_invalidPutMethod_thenReturns4xx() throws Exception {
        when(service.getRandom()).thenReturn(Collections.singletonList(RANDOM_QUESTION));

        mockMvc.perform(put("/question/random")
                        .contentType("application/json"))
                .andExpect(status().is4xxClientError());
    }

    @Test
    void when_getRandomQuestion_invalidDeleteMethod_thenReturns4xx() throws Exception {
        when(service.getRandom()).thenReturn(Collections.singletonList(RANDOM_QUESTION));

        mockMvc.perform(delete("/question/random")
                        .contentType("application/json"))
                .andExpect(status().is4xxClientError());
    }

    //GET QUESTION BY ID
    @Test
    void when_getQuestionById_validInput_thenReturns200() throws Exception {
        when(service.getById(anyLong())).thenReturn(QUESTION_BY_ID);

        mockMvc.perform(get("/questions/{id}", "678")
                        .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    void when_getQuestionById_validInput_thenReturnsExpectedOutput() throws Exception {
        when(service.getById(eq(678))).thenReturn(QUESTION_BY_ID);

        MvcResult mvcResult = mockMvc.perform(get("/questions/{id}", "678")
                        .contentType("application/json"))
                .andReturn();

        Map<String, QuestionDto> expectedResponse = new HashMap<>();
        expectedResponse.put("question", QUESTION_BY_ID);
        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        assertEquals(actualResponseBody,
                mapper.writeValueAsString(expectedResponse));
    }

    @Test
    void when_getQuestionById_invalidPostMethod_thenReturns4xx() throws Exception {
        when(service.getById(anyLong())).thenReturn(QUESTION_BY_ID);

        mockMvc.perform(post("/questions/{id}", "678")
                        .contentType("application/json"))
                .andExpect(status().is4xxClientError());
    }

    //ADD QUESTION
    @Test
    void when_addQuestion_validInput_thenReturns200() throws Exception {
        addQuestionJSON = new JSONObject();
        addQuestionJSON
                .put("id", CREATE_QUESTION.getId())
                .put("urn", CREATE_QUESTION.getUrn())
                .put("title", CREATE_QUESTION.getTitle())
                .put("question", CREATE_QUESTION.getQuestion())
                .put("createdAt", CREATE_QUESTION.getCreatedAt());
        when(service.create(any(Question.class))).thenReturn(CREATE_QUESTION);

        mockMvc.perform(post("/questions")
                        .content(addQuestionJSON.toString())
                        .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    void when_addQuestion_validInput_thenReturnsExpectedOutput() throws Exception {
        addQuestionJSON = new JSONObject();
        addQuestionJSON
                .put("id", CREATE_QUESTION.getId())
                .put("urn", CREATE_QUESTION.getUrn())
                .put("title", CREATE_QUESTION.getTitle())
                .put("question", CREATE_QUESTION.getQuestion())
                .put("createdAt", CREATE_QUESTION.getCreatedAt())
                .put("acceptance", CREATE_QUESTION.getAcceptance());
        when(service.create(any(Question.class))).thenReturn(CREATE_QUESTION);

        MvcResult mvcResult = mockMvc.perform(post("/questions")
                .content(addQuestionJSON.toString())
                .contentType("application/json"))
                .andReturn();

        Map<String, QuestionDto> expectedResponse = new HashMap<>();
        expectedResponse.put("question", CREATE_QUESTION);
        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        assertEquals(actualResponseBody,
                mapper.writeValueAsString(expectedResponse));
    }

    //UPDATE QUESTION
    @Test
    void when_updateQuestion_validInput_thenReturns200() throws Exception {
        updateQuestionJSON = new JSONObject();
        updateQuestionJSON
                .put("id", UPDATE_QUESTION.getId())
                .put("urn", UPDATE_QUESTION.getUrn())
                .put("title", UPDATE_QUESTION.getTitle())
                .put("question", UPDATE_QUESTION.getQuestion())
                .put("createdAt", UPDATE_QUESTION.getCreatedAt())
                .put("acceptance", UPDATE_QUESTION.getAcceptance())
                .put("frequency", UPDATE_QUESTION.getFrequency());
        doNothing().when(service).update(any(Question.class));

        mockMvc.perform(put("/questions/{id}", "345")
                        .content(updateQuestionJSON.toString())
                        .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    void when_updateQuestion_invalidInput_thenThrowsIllegalStateException() throws Exception {
        updateQuestionJSON = new JSONObject();
        updateQuestionJSON
                .put("id", UPDATE_QUESTION.getId())
                .put("urn", UPDATE_QUESTION.getUrn())
                .put("title", UPDATE_QUESTION.getTitle())
                .put("question", UPDATE_QUESTION.getQuestion())
                .put("createdAt", UPDATE_QUESTION.getCreatedAt())
                .put("acceptance", UPDATE_QUESTION.getAcceptance())
                .put("frequency", UPDATE_QUESTION.getFrequency());
        doNothing().when(service).update(any(Question.class));

        boolean errorThrown = false;
        String exceptionType = "";
        try {
            mockMvc.perform(put("/questions/{id}", "333")
                            .content(updateQuestionJSON.toString())
                            .contentType("application/json"))
                    .andReturn();
        } catch (Exception e) {
            errorThrown = true;
            exceptionType = (e.getCause()).toString();
        }
        assertTrue(errorThrown);
        assertEquals("java.lang.IllegalStateException", exceptionType);
    }

    //DELETE QUESTION
    @Test
    void when_deleteQuestion_validInput_thenReturns200() throws Exception {

        mockMvc.perform(delete("/questions/{id}", "345")
                        .contentType("application/json"))
                .andExpect(status().isOk());
    }

    // GET QUESTION BATCH
    @Test
    void when_getQuestionBatch_validInput_thenReturns200() throws Exception {
        String[] idArray = new String[]{
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
        };
        idsToFetch = new ArrayList<>();
        idsToFetch.addAll(Arrays.asList(idArray));
        JSONObject request = new JSONObject();
        JSONArray ids = new JSONArray(idsToFetch);
        request.put("idsToFetch", ids);
        mockMvc.perform(post("/questions/batch")
                        .content(request.toString())
                        .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    void when_getQuestionBatch_validInput_thenReturnsExpectedResult() throws Exception {
        String[] idArray = new String[]{"123", "678"};
        idsToFetch = new ArrayList<>();
        idsToFetch.addAll(Arrays.asList(idArray));
        JSONArray ids = new JSONArray(idsToFetch);
        JSONObject request = new JSONObject();
        request.put("idsToFetch", ids);

        when(service.getById(eq(123))).thenReturn(RANDOM_QUESTION);
        when(service.getById(eq(678))).thenReturn(QUESTION_BY_ID);

        MvcResult mvcResult =mockMvc.perform(post("/questions/batch")
                        .content(request.toString())
                        .contentType("application/json"))
                .andReturn();

        QuestionDto expectedQuestion1 = RANDOM_QUESTION;
        QuestionDto expectedQuestion2 = QUESTION_BY_ID;

        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        JSONObject actualResponse = new JSONObject(actualResponseBody);
        JSONArray actualResponseQuestions = actualResponse.getJSONArray("question");

        String q1 = actualResponseQuestions.getString(0);
        QuestionDto actualQuestion1 = mapper.readValue(q1, QuestionDto.class);
        assertEquals(expectedQuestion1.getId(), actualQuestion1.getId());
        assertEquals(expectedQuestion1.getTitle(), actualQuestion1.getTitle());
        assertEquals(expectedQuestion1.getQuestion(), actualQuestion1.getQuestion());

        String q2 = actualResponseQuestions.getString(1);
        QuestionDto actualQuestion2 = mapper.readValue(q2, QuestionDto.class);
        assertEquals(expectedQuestion2.getId(), actualQuestion2.getId());
        assertEquals(expectedQuestion2.getTitle(), actualQuestion2.getTitle());
        assertEquals(expectedQuestion2.getQuestion(), actualQuestion2.getQuestion());
    }

    @Test
    void when_getQuestionBatch_invalidInput_thenThrowsException() throws Exception {
        String[] idArray = new String[]{
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
        };
        idsToFetch = new ArrayList<>();
        idsToFetch.addAll(Arrays.asList(idArray));
        JSONArray ids = new JSONArray(idsToFetch);
        JSONObject request = new JSONObject();
        request.put("idsToFetch", ids);

        when(service.getById(eq(123))).thenReturn(RANDOM_QUESTION);
        when(service.getById(eq(678))).thenReturn(QUESTION_BY_ID);


        boolean errorThrown = false;
        String exceptionType = "";
        try {
            mockMvc.perform(post("/questions/batch")
                            .content(request.toString())
                            .contentType("application/json"))
                    .andReturn();
        } catch (Exception e) {
            errorThrown = true;
            exceptionType = (e.getCause()).toString();
        }
        assertTrue(errorThrown);
        assertEquals("java.lang.IllegalStateException", exceptionType);
    }
}
