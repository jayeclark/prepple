package com.prepple.api.model.practice;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Preconditions;
import com.prepple.api.model.questions.Question;
import com.prepple.api.model.shared.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import java.io.Serializable;
import java.sql.Time;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserActivity implements Serializable {
    @Id
    private String id;

    @NonNull
    @JsonProperty("questionId")
    @JoinColumn(name="question_id", referencedColumnName="id")
    private Question question;

    @NonNull
    @JsonProperty("userId")
    @JoinColumn(name="user_id", referencedColumnName="id")
    private User user;

    @NonNull
    private Status status;

    @Column(name="answer_plan_count")
    private Integer answerPlanCount;

    @Column(name="answer_video_count")
    private Integer answerVideoCount;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="first_planned_at")
    private Time firstPlannedAt;

    @Column(name="last_planned_at")
    private Time lastPlannedAt;

    @Column(name="first_recorded_at")
    private Time firstRecordedAt;

    @Column(name="last_recorded_at")
    private Time lastRecordedAt;

    public void setId() {
        Preconditions.checkState(!this.question.equals(null) && !this.user.equals(null));
        this.id = this.user.getId() + "-" + this.question.getId();
    }

    public void setLastPlannedAt(Time time) {
        if (this.firstPlannedAt.equals(null)) {
            this.firstPlannedAt = time;
        }
        this.lastPlannedAt = time;
    }

    public void setLastRecordedAt(Time time) {
        if (this.firstRecordedAt.equals(null)) {
            this.firstRecordedAt = time;
        }
        this.lastRecordedAt = time;
    }
}
