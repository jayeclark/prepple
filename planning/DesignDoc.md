# Prepple
Interview Prep that Works

## 1 Summary
The purpose of this document is to summarize the design decisions and planned system architecture for Prepple, a behavioral interview prep web application currently in development. 

### 1.1 Background
The interview process at top employers typically involves answering a series of behavioral questions designed to understand the details of a candidate’s behavior in past workplace situations. The motivation behind this approach is the belief that past behavior is the best predictor of future behavior (and therefore of future success on the job.) 

During the COVID-19 pandemic, many of these behavioral interviews began to be conducted via video chat. This format can be unnerving for candidates accustomed to in-person or phone-based interviews or candidates who are nervous or uncomfortable on camera. 

### 1.2 The Problem
The companies that conduct these behavioral interviews expect answers to be provided in a specific format - typically either STAR, CARL, or SOAR (discussed in detail later in this document). It can be difficult and require some practice to distill a story about a particular experience down to a 2 or 3-minute response, more so for candidates for whom English is not their first language. It can also be challenging to appear natural on camera while answering these questions - in a tight job market, actual interviews are not the place to work out the kinks of your on-camera presence! Often, the only feedback candidates receive on the content and tone of their answers to these questions is the binary output of being offered the job or not.

In the wake of thousands of layoffs in the tech industry, behavioral interview questions have become increasingly important in the hiring process - they are where exceptional candidates stand out.

### 1.3 Current Landscape
There are many online resources related to behavioral interview questions. Dozens of websites provide sample behavioral interview questions and advice on how to answer them. Some also identify which questions are used most frequently by specific companies. 

However, few of these offer interactive tools for planning and practicing responses. LinkedIn has a feature where candidates can practice responding to a pre-recorded video of an interviewer asking a question, but there’s no feedback on the response and no way to save the recorded video, track progress over time, or compare different versions of an answer.  Standout provides options to practice and receive AI feedback but doesn’t include productivity tools for planning answers, or the ability to share responses with friends and mentors for human feedback. Companies like Interview Kickstart offer some amount of planning support, and live feedback through mock interviews, but don’t provide resources for candidates to track their progress, review past answers, or get feedback from external sources. 

As a job seeker, I can easily plan and practice using the tools available to me on my laptop, storing answers in a Google Doc, and I can practice by recording videos locally with my camera, but this basic approach lacks the benefit of immediate feedback on tone and content. It also adds additional work - I need to find my own questions and plan my own practice runs. And I don’t have an easy way to share videos with friends or potential employers.

None of the available resources adequately address the three core issues job seekers need: help & motivation with planning answers, a platform to practice answers and receive immediate feedback, and a way to workshop answers to friends & mentors for feedback.
