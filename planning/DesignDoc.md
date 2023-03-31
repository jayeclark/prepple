![](../prepple.png)

# Design Doc
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

None of the available resources adequately address the three core needs of job seekers with regard to behavioral interviewing: help & motivation with planning answers, a platform to practice answers and receive immediate feedback, and a way to workshop answers to friends & mentors for feedback.

## 2 The Platform
Prepple is a social platform for planning, practicing, and sharing responses to behavioral interview questions. In this section, we’ll cover the different users of the platform, the stories that drive them to use it, general system architecture, and the detailed functional and non-functional requirements of the platform. This is a living document, so these details may all change in the future, but they represent the current understanding of the platform and the current jumping-off point for establishing development milestones and project plans.

### 2.1 Users

#### 2.1.1 Job Seekers

In the U.S. alone, around 6 million people are currently looking for office-based jobs. They’ll search on average 5 months before finding their next role. There’s an 86% chance that their interview process will be conducted remotely, and a 75% chance that the interview process will include behavioral questions. They will likely turn to a variety of interview preparation resources during their search, which vary by industry. In the software development industry, for example, job seekers might use online sites like LeetCode and HackerRank, which offer premium interview prep plans. They might also turn to a personalized interview coaching service, which can cost anywhere from $500 to $5,000! Although 94% of candidates want to receive feedback on their interviews, fewer than 41% actually receive it. Few statistics are available on the interview preparation market, but it’s likely to be sized similarly to the market for online coding bootcamps - both are niches within the $319B online education market. Coding bootcamps attract the small percent of the population attempting to transition into entry-level roles in the tech industry, while interview preparation tends to have a smaller per-person spend, but applies to a much broader range of industries and career levels. In 2021, the online coding bootcamp market was valued at $1.13B and is expected to grow to $3.66B by 2027.

The average Prepple user is a college-educated individual in their mid-20s to mid-30s who is working to find employment that aligns with their career goals. They have a range of skills and qualifications that make them attractive to potential employers, including strong communication skills, technical expertise, and a proactive problem-solving approach, but they also know that to put their best foot forward in an interview, they need to do some preparation and practice first. They are actively engaged in networking to find job openings, using a range of different options - online job boards, social media, and recruitment agencies. They may face challenges during their job search, such as competition for available positions, lack of job openings in their desired field, or discriminatory hiring practices, which have driven them to Prepple in order to help them stand out more in their behavioral interviews. 

#### 2.1.2 Recruiters & HR Professionals

While Prepple is primarily oriented toward job seekers, recruiters & HR professionals are another category of users who may interact with the platform. There are more than 250,000 recruiters in the US alone, and attracting the right candidates is one of the toughest challenges they face. Recruiters can use Prepple to get a better sense of specific candidates’ personalities and backgrounds, or they can submit job requisition details and browse candidates whose video resumes specifically match the tone, culture, and experience outlined in the job description.

#### 2.1.3 Feedback Providers

One of the most important aspects of Prepple is the ability for job seekers to get feedback from members of their personal networks, not just from AI. A large number of feedback providers will interact with Prepple via its social sharing features. Some of these may convert to mentors on the platform, actively posting example answers to behavioral interview questions and offering paid mentoring and feedback sessions for premium users.

#### 2.1.4 Internal Users

A number of internal users associated with Prepple will need to interact with the platform in order to moderate content and user behavior, investigate customer service issues, and handle billing issues. While ideally the majority of the CX will be automated, individual administrative users are still needed to make judgment calls about questionable content or actions that violate terms of service, or handle unusual billing and administrative issues. 

### 2.2 User Stories

To learn more about how Prepple works, let’s dive into some archetypical user stories. After covering the three core groups of end users, we’ll also discuss some of the user stories internal to the platform, such as community moderation, customer service, and billing admin.

#### 2.2.1 Job Seekers

As a job seeker, I want to…

- register for an account in order to access the features of the platform
- preview certain practice and planning features without creating an account or logging in
- easily discover behavioral interview questions that I might encounter in an upcoming interview - either in general, related to a specific cultural value, or related to a specific company.
- have an easy way to start planning how I can answer certain behavioral questions in a STAR, CARL, or SOAR format, and a way to quickly locate the answers I’ve planned.
- track my progress toward completing the planning stage of my preparation
- receive AI feedback on the answers as I plan them, including how ‘listenable’ my script or bullet points are and how well they fit the intended tone and topic.
- get guidance or prompts if I’m having trouble thinking of a way to answer a question
- see sample responses from others who have made their responses public or are on the platform as mentors
- receive automated feedback on whether my response is too generic or too similar to other users’
- have the platform create a sample planning & practice schedule for me, allow me to modify the schedule, and send me reminders as needed to help me stick to that schedule
- record myself answering behavioral interview questions, and save the recordings I like
- receive AI feedback on the recorded video transcript
- practice answering questions with different levels of ‘cheat sheet’ (full script, bullet points, or no assistance.)
- track my improvement over time both qualitatively and quantitatively
- share answers and sets of answers with friends, mentors, and/or the general Prepple community for feedback
- easily assemble my favorite responses into an interactive video resume that I can use to promote myself to potential employers
- pay for focused feedback from qualified mentors on the platform and rate the quality of that feedback
- be able to subscribe for added benefits like advanced ai analysis, larger storage and publication limits, and unlimited interactive video resumes

#### 2.2.2 Recruiters

As a recruiter, I want to…

- get to know candidates better before or after completing a phone screen by viewing their answers to behavioral questions that they’ve selected to best highlight their skills
- be able to subscribe as a premium user in order to discover candidates on the platform whose video resumes match the cultural values and soft skills of the role I’m recruiting
- check for plagiarism or ‘experience theft’ and know that the videos I am viewing are likely to represent the candidate’s true experiences
- receive AI insights about the candidate’s personality based on their responses, if the candidate agrees to make that information public
- provide feedback to candidates who indicate they are open to feedback

#### 2.2.3 Feedback Providers

As a feedback provider, I want to…

- view an answer video or set of videos and quickly provide feedback on the response
- provide feedback on the ai evaluation of the answer to help improve the platform’s model
- register as a paid mentor on the platform
- record example answers to behavioral questions to help others learn
- connect with job seekers for short, paid micro-mentoring sessions to help them improve their answers
- manage my availability and visibility for paid micro-mentoring
- manage my payout methods and frequency

#### 2.2.4 Moderators

As a moderator on the platform, I want to…

- quickly and proactively identify, via a dashboard, users who may be engaging in toxic or inappropriate behavior on the platform
- view user reports of inappropriate behavior
- investigate flagged accounts and take appropriate action
- escalate cases when needed

#### 2.2.5 Customer Service & Billing
As a customer service representative on the platform, I want to…

- receive customer support tickets
- investigate the circumstances of the ticket
- rocess refunds and resolve other billing issues
- assist customers with account recovery issues
- escalate tickets to GitHub issues as needed
