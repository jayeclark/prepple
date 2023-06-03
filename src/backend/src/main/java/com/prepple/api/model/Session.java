package com.prepple.api.model;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class Session {
    @NonNull
    private String sessionToken;

    private List<String> seenQuestionUrns;
}
