# ![Prepple](./preppleHeader.png) Design Doc

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

However, few of these offer interactive tools for planning and practicing responses. LinkedIn has a feature where candidates can practice responding to prompts and get AI and network feedback on their delivery, but there are no interactive planning tools, no way to track progress over time or compare different versions of an answer, and no way to connect with specific feedback providers for paid micro-mentoring.  Standout provides options to practice and receive AI feedback but doesn’t include productivity tools for planning answers, or the ability to share responses with friends and mentors for human feedback, and costs $29/month for job seekers. Companies like Interview Kickstart offer some amount of planning support, and live feedback through mock interviews, but don’t provide resources for candidates to track their progress, review past answers, or get feedback from sources outside the program. Not everyone can afford to commit $5K, either!
However, few of these offer interactive tools for planning and practicing responses. LinkedIn has a feature where candidates can practice responding to prompts and get AI and network feedback on their delivery, but there are no interactive planning tools, no way to track progress over time or compare different versions of an answer, and no way to connect with specific feedback providers for paid micro-mentoring.  Standout provides options to practice and receive AI feedback but doesn’t include productivity tools for planning answers, or the ability to share responses with friends and mentors for human feedback, and costs $29/month for job seekers. Companies like Interview Kickstart offer some amount of planning support, and live feedback through mock interviews, but don’t provide resources for candidates to track their progress, review past answers, or get feedback from sources outside the program. Not everyone can afford to commit $5K, either!

As a job seeker, I could plan using the tools available to me on my laptop, storing answers in a Google Doc, and I could practice by recording videos locally with my camera, but this basic approach doesn't provide me with immediate feedback on tone and content. It also adds additional work - I need to find my own questions and plan my own practice runs. And I don’t have an easy way to share videos with friends or potential employers.

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

### 2.3 Guiding Principles

Guiding principles can help with decisionmaking by providing a reference point to evaluate different options. I like to include a few to remind the team of the driving philosophy that should be behind the design. (Here there's no team yet, but I'm including them for my own reference to keep me on track. Working on a project while job hunting, it's tempting to try to 'show off' and add unnecessary complexity to a project, so most of my guiding principles here are focused on keeping me focused on the goal: turning my earlier proof-of-concept into a platform that provides value to fellow job seekers.)

#### 2.3.1 Plan Big, Start Small

Plan for scalability and a plan to scale, but start with a system sized to the expected initial user base. Add convenient configuration options that allow for assorted configuration options to automatically be 'turned on' if/as needed. Develop through small, immediately-testable iterations behind feature flags.  Create contingency plans to address known and unknown obstacles based on observed solutions and solution times to past challenges.

#### 2.3.2 Simplify the Wheel, Don't Reinvent It

It's easy to get caught up in trying to create everything from scratch or demonstrate a new approach to an old problem, especially on personal projects where one has carte blanche on design decisions. This approach can lead to wasted time and resources, as well as potential security vulnerabilities. Design decisions for Prepple should be focused mainly on simplifying tried-and-true architecture configurations, design patterns, and frameworks - not attempting to create new ones.

#### 2.3.3 Prioritize Customer Value over Income

The costs for running Prepple are anticipated to be relatively low. Design decisions should prioritize the experience of the primary customers of Prepple (non-subscribing users.) Efforts to improve monetization, such as through machine learning analysis of conversion behaviors, should take a back seat to efforts that improve the overall experience and value of the platform.

#### 2.3.4 Make Architecture Decisions Based on Data

At this stage, most of the load and latency calculations are hypothetical and highly contingent. The design for Prepple should establish a procedure for setting and monitoring metrics that will enable data-driven decisions on when to make scalability, reliability, or availability upgrades to the existing architecture. Known potential bottlenecks, as well as areas assumed *not* to be bottlenecks, should be tracked and validated through load testing in advance of deployment to production.

### 2.4 Load Calculations and Potential Bottlenecks

One of the biggest concerns in designing a platform like this is not just ‘will it scale’, but ‘what might it have to scale to?’ and ‘what will it cost me to run the project at X scale?’  Let’s run sample calculations on three scenarios:

- **Niche:** Prepple stays a hobby project but attracts a small group of regular users. In this scenario, we have 500 registered users, 2,000 app sessions per month, and max 25 concurrent users.
- **Side Hustle:** a moderate success story where Prepple becomes a reasonable side business with tens of thousands of registered users. Expect 50,000 registered users, 200,000 app sessions per month, and a max of 2,500 concurrent users.
- **Viral Success:** a blue sky scenario where Prepple catches on like wildfire and becomes the LeetCode of behavioral interview preparation. This would equate to 5M registered users, 20M app sessions per month, and a whopping 250,000 peak concurrent users.

There are a few areas where we need to consider whether bottlenecks will occur at scale. Running load and TPS calculations for each of these can be helpful in understanding when scalability begins to be an issue. In addition, since the architecture for Prepple is all Cloud-based (where costs are notorious for creeping up) this process can help forecast costs and make sure they’re in line with expectations. 

We’ll revisit these calculations as development proceeds, but for now, it appears that scalability concerns become a serious issue when approaching the third scenario (as expected.) We’ll design the system so that it can operate at the smaller ‘Niche’ and ‘Side Hustle’ scopes but scale as needed if the platform grows.

**Table 1. Load Estimates**   
(Numbers are for peak use unless otherwise indicated)
<table>
  <thead>
    <tr>
      <td><strong>Area</strong></td>
      <td><strong>Assumptions</strong></td>
      <td><strong>Niche</strong></td>
      <td><strong>Side Hustle</strong></td>
      <td><strong>Viral Success</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Core Api</td>
      <td>Planning & practicing involves 20-30 API calls per minute due to video ingest & telemetry (though the I/O for them will be split among Postgres, DocumentDB, S3, and DynamoDB.) Some of these, especially events, could be moved to take place through a websocket connection, but let’s leave them in this calculation for now.</td>
      <td><em>Peak:</em><br>1-2&nbsp;TPS<br><br><em>Average:</em><br>&lt;1&nbsp;TPS</td>
      <td><em>Peak:</em><br>100-150&nbsp;TPS<br><br><em>Average:</em><br>&lt;6-10&nbsp;PS</td>
      <td><em>Peak:</em><br>10K-15K&nbsp;TPS<br><br><em>Average:</em><br>&lt;600-1K&nbsp;TPS</td>
    </tr>
    <tr>
      <td>Auth Api</td>
      <td>Will be used as frequently as the Core API to confirm auth status of user tokens, plus additional use for registration and password resets (+5% of core API usage), however there will also be a DDB cache for authed users which can reduce the load by ~95%.</td>
      <td>&lt;1&nbsp;TPS</td>
      <td>5-8&nbsp;TPS</td>
      <td>500-750&nbsp;TPS</td>
    </tr>
    <tr>
      <td>Billing API</td>
      <td>Used infrequently, max 5% of visits</td>
      <td>&lt;1&nbsp;TPS</td>
      <td>&lt;1&nbsp;TPS</td>
      <td>5-8&nbsp;TPS</td>
    </tr>
    <tr>
      <td>Relational DB I/O</td>
      <td>Planning & practicing both involve 2-3 transactions per minute since most of the work happens on the client side. Rating & recruiting involves 10-20. We assume 90% of the app volume is practice & planning.</td>
      <td><em>Peak:</em><br>&lt;1&nbsp;TPS<br><br><em>Average:</em><br>&lt;1&nbsp;TPM</td>
      <td><em>Peak:</em><br>1-23&nbsp;TPS<br><br><em>Average:</em><br>1-2&nbsp;TPS</td>
      <td><em>Peak:</em><br>1.5K-2.3K&nbsp;TPS<br><br><em>Average:</em><br>80-150&nbsp;TPS</td>
    </tr>
    <tr>
      <td>Document DB I/O</td>
      <td>Planning involves 4-5 transactions per minute. Assume (⅓ * 90%) of users are planning.</td>
      <td>&lt;1&nbsp;TPS</td>
      <td>20-40&nbsp;TPS</td>
      <td>2K-4K&nbsp;TPS</td>
    </tr>
    <tr>
      <td>Video Ingest & Processing API</td>
      <td>20 minutes of video per 30-minute session. For 1080p/60FPS this would be 900 MB per session or around 0.75 MB per second. Assume (⅔ * 90%)of job seekers are practicing with videos.</td>
      <td>0.1-0.3&nbsp;MB/s</td>
      <td>4-5&nbsp;MB/s</td>
      <td>300-400&nbsp;MB/s</td>
    </tr>
    <tr>
      <td>Event Persistence Layer</td>
      <td>Assume that all I/O events are sent to the platform, plus 1 event per 10 seconds per user session.
</td>
      <td>2-3&nbsp;per&nbsp;sec</td>
      <td>150-200&nbsp;per&nbsp;sec</td>
      <td>15-20K&nbsp;per&nbsp;sec</td>
    </tr>
    <tr>
      <td>Video Storage<br>(Per Month)</td>
      <td>No limits on storage per user. ⅔ * 90% of visitors * 20 minutes recording * ⅔ saved.
</td>
      <td><em>Raw:</em><br>20-27&nbsp;GB/mo<br><br><em>Compressed:</em><br>2-3&nbsp;GB/mo</td>
      <td><em>Raw:</em><br>2-3&nbsp;TB/mo<br><br><em>Compressed:</em><br>200-300&nbsp;GB/mo</td>
      <td><em>Raw:</em><br>200-270&nbsp;TB/mo<br><br><em>Compressed:</em><br>20-27&nbsp;TB/mo</td>
    </tr>
    <tr>
      <td>Video Storage<br>(Total Year 1)</td>
      <td>Assume worst case scenario (steady growth month over month and no deletion of old videos)</td>
      <td><em>Raw:</em><br>$33-$45<br><br><em>Compressed:</em><br>$3-$4</td>
      <td><em>Raw:</em><br>$3.4K-$4.5K<br><br><em>Compressed:</em><br>$340-$450</td>
      <td><em>Raw:</em><br>$343K-$463K<br><br><em>Compressed:</em><br>$34K-$46K</td>
    </tr>
  </tbody>
</table>

#### 2.4.1 Notes on Bottlenecks

We can see a few areas of concern from this chart, mostly in ‘Viral Success’ scenario. Core API calls are fairly high, meaning that an application load balance and multiple instances of the API server will likely be needed. Document database and relational database transactions are both fairly high, indicating a need for read replicas or clustering. (At the point that a single database instance is handling 5M registered users, sharding & partitioning becomes an important consideration too.)

Video storage costs are significant at higher levels of usage, as is ingest bandwidth. We’ll need to do further calculations and design work to determine what kinds of trade-offs are acceptable here in terms of when, where & how video footage is compressed for transmission & storage.

#### 2.4.2. Calculations to Revisit

For now, these calculations are sufficient to highlight the areas where scalability may become an issue, and the areas it will likely not. We’ll revisit some of these calculations in the future. The one that seems the most potentially off is the event platform message rate. Assumptions about just how many events may be generated from user activity on the platform may  (SQS queues are limited to 3,000 messages processed per second.)

### 2.5 Planned System Design

#### 2.5.1 High-Level Overview

The current working plan is to organize the platform architecture into four groups of resources:

1. a core web app consisting of a front end, a backend middleware layer, a persistence layer, and monitoring stack
2. an administrative web app for customer service, user safety, and content moderation
3. an event platform (event bus + event store) that can help the core web app scale by decoupling follow-on actions from the API events that trigger them.
4. a machine learning application consisting of a model training stack that interacts with the event platform, persistence layer & monitoring stacks (to trigger alarms related to model drift), and an administrative/debugging UI.

![High Level Design Diagram](./Prepple-HighLevelArchitecture.png)

The core web app, with the exception of the video ingest component, is a relatively straightforward design with separate frontend and backend. The backend is composed of a core API for CRUD functions and lightweight, specialized APIs for authentication/authorization, billing, short link management/redirects, and video ingestion & analysis. A separate event platform records user actions and other selected events for storage in an events table. These events can be used in machine learning workflows (early ML will be focused on predicting user engagement, subscriptions, and lifecycle as well as identifying potential micro-mentors) and may also trigger text message, email or push notifications as well as other workflows. For example, the initiation of a new video streaming connection with the video encoder server results in the publication of a message to an SNS topic that then triggers a step function that manages the storage and analysis of video content. A machine learning stack and ML administrative stack handle the training and serving of models. (In addition to internally trained models for predicting user behavior, Prepple’s video analysis tools rely on pre-trained models for computer vision, natural language processing, and audio analysis.) Finally, an administrative UI stack provides access to moderation tools and service dashboards.

#### 2.5.2 Core Web App

The heart of Prepple is a Next.js PWA-style web app with a CRUD API backend for core db modification functions, and specialized microservices for authorization/authentication, billing, and short links. (In contrast to a true PWA, however, Prepple has limited functionality offline.) The front-end web client is a Typescript/Next.js app - a refactored version of the original project, My Dev Interview. The core backend API is a straightforward Java/Spring app that allows users to create, edit, review, and delete the basic entities of the app: interview prep plans, planned answers to behavioral interview questions, and recorded video answers to questions (with associated transcripts.) This API also handles saving data on video resumes, feedback requests, ratings, company associations, and both user-derived and AI-derived reports of misconduct (the language models used to process video transcripts and conduct content analysis are also capable of flagging inappropriate content.) Though not in the initial priority list, discussion forums for interview questions will be added in the future and will likely also operate via the core API. 

The choice to separate backend functionality into different APIs is based on several factors. In general, we are interested in minimizing costs by taking advantage of serverless architecture for low-load backend functionality and using a Fargate ECS or EKS deployment strategy for higher-load functionality like CRUD and video ingest, which requires splitting the functionality into different apps. As discussed later in the trade-offs section, for this specific project, a broader range of languages and frameworks is favored over a single framework or single-language approach because of the potential to attract a larger number of contributors from the Open Source community. Separating backend functionality into individual microservices when there is little to no shared code among the services also helps make the mono repo codebase structure more navigable to new contributors. 

**AUTHORIZATION/AUTHENTICATION**  
Authorization and authentication will be via OIDC. Users will be able to log in with their personal email, Gmail account, or GitHub account. JWTs containing information on the scope of user permissions will be saved locally in cookies, meaning that the load on the auth API will be significantly lower than for the core API, since the auth API will only be called upon login, logout, password change, initiation of video analysis, or when a decoded JWT passed in an API request’s auth header is found to be expired.

**BILLING**  
The billing API is expected to have a significantly lower load than the core CRUD API, video ingest API, or auth API. In a well-performing freemium SaaS model, less than 10% of users are paid subscribers. Billing functions are expected to be called relatively infrequently for subscribing, canceling subscriptions, and on a periodic basis to verify that a user is still subscribed (i.e. that their subscription hasn’t automatically lapsed due to issues with their payment method) or update authorization claims based on an event emitted by the payment processor.

**SHORTLINKS**  
A key feature of Prepple is the blending of AI and human feedback. Users can build video resumes and circulate them or individual answers to friends for feedback via a star-rating system. The service for generating short-links and associating them with specific video resumes and recorded answers is envisioned as its own separate API. This will reduce load on the core API and will make it easier to extend & enhance the shortlink URL generator in the future. In the initial release, functionality will be limited (create URLs, expire them as appropriate, send redirect requests as applicable) but in future development, the API will be expanded to provide better tracking of short-link use and better visibility to users of how and when their feedback providers have accessed the links.  

#### 2.5.3 Video Ingest Api

Video ingestion & analysis is expected to be a resource-intensive process that will likely require its own load balancer and specialized strategies to ensure that video analysis and AI feedback are sent back to the end user with acceptable latency. The initial MVP involves transcribing video content and analyzing the listenability and content of that transcript, in response to a user clicking a ‘run analysis’ button. The goal is to have the apparent latency of the analysis be similar to the latency observed when testing a solution in Leetcode (4 - 10 seconds.) This will involve real-time analysis and results caching, and may require experimentation with concurrency to accelerate processing time. (Functionally, we expect that most users will review their video prior to submitting it for analysis, which can provide additional time for backend analysis to ‘catch up’.) 

Longer term, a complete video analysis will consist of a transcript analysis, vocal tone analysis, and computer-vision-based emotion analysis. Users should be able to receive a subset of this analysis in real-time or immediately after reviewing a recently-recorded video, similar to how Leetcode users can test out their solution with a limited number of self-defined test cases prior to submitting their final answer for analysis.

The video ingest design is discussed in more detail in section 2.7.2.

#### 2.5.4 Event Bus & Machine Learning

Sequelae of user actions that do not require immediate reaction via one of the backend API routes become part of the event ecosystem of Prepple. Events that occur during API calls are sent to an SQS queue, processed into a Kinesis streams-enabled DynamoDB events table, and then processed for fan-out. The core use cases are email, text, and push notifications, and the use of user events in machine learning training & prediction workflows.  

In addition to the event processing stack, this area of the platform includes a multi-tenant model training system and a machine learning admin app for administering the training workflows, shadow mode, and other settings as well as visualizing the performance of the ML models without directly logging in to the AWS console.

Initial machine learning workflows focus on two relatively limited areas (due to the small expected user base at outset):

- Predicting high engagement, high-value users
- Identifying potential micro-mentors from among feedback providers

This area of the platform is targeted for phase III of the development process and will likely change in design and scope as that phase gets closer to initiation.

#### 2.5.4 Customer Service & Administration

Customer service functions for billing, account management, and moderation will exist in a separate Ruby on Rails web app. The choice of framework is primarily driven by the potential of attracting open source contributions - compared to the web app and the ML management app, this customer service admin application will likely rely heavily on open source contributions, and Ruby has one of the highest PR-to-issues ratios on GitHub.  

#### 2.5.3 Android and IOS Clients

Initial development will focus exclusively on the web client. However, unlike with LeetCode and traditional coding interview prep tools, behavioral interviews can be planned for and practiced on mobile devices as well as via desktop browsers. A priority once the web app exits beta will be developing Android and IOS apps to provide mobile access to the platform. The current plan is to develop the iOS app with Swift, and the Android app with Kotlin. (An alternative option is to use React Native for cross-platform development.)

#### 2.5.5. Infrastructure and CICD

Currently, Prepple is in the very earliest stages of development and exists in two separate GitHub repositories - one large monorepo containing the code for most of the components, and a smaller repository containing a very early scaffolding of the machine learning management app. The ML management app resources are provisioned with Terraform and deployed via a Jenkins CICD server. Other resources are provisioned with AWS CDK and deployed using AWS CodePipeline via a single deployment pipeline. Future refactoring will separate out the resources to deploy in parallel via different pipelines. Currently, a failed deployment of any one resource at a certain point in the pipeline will block the promotion of all resources from beta to gamma to prod, which is not the intended behavior. A new deployment to the front-end should be able to fail and block that particular pipeline without also preventing full deployment of updates to the backend API.

![Main CICD](./Prepple-DeploymentPipeline-Transparent-Screenshot.png)

![ML App CICD](./Prepple-Alternative-Deployment-Pipeline.png)

### 2.6 Tradeoffs

#### 2.6.1 Multiple languages & frameworks vs unified language and framework

The choice to develop in multiple languages and frameworks is an unorthodox one and is driven by the expected financial prospects of the project. Early financial modeling suggests that even at Leetcode levels of popularity, Prepple would generate relatively modest income. Because of this, it’s likely to remain a passion project driven by an individual, rather than grow into a business with a development team. In the most likely scenario, Prepple merely covers its costs - but still provides a valuable service to a dedicated group of job seekers in a range of industries.

Because of this, and because of the project’s ‘build in public’ orientation, contributions from the open source community will be an important part of the future development of the platform. The range of languages included in the project design covers more than 50% of all pull requests on GitHub, meaning that the project would have the potential to reach a much larger pool of potential contributors than if it were focused on a single language. All but one of the languages has a PR-to-Issue ratio greater than 1, meaning that there are more pull requests opened in the language than there are issues to resolve, a sign of a strong and active open source contributor community.

And, on a personal level, I just *enjoy* working in multiple languages at once. Choosing a variety of frameworks and languages, including ones that I don’t know as well but would like to improve in, ensures that I will stay highly engaged with the project. However, there is a limit to how many languages & frameworks are feasible - While earlier versions of the design plan had the mobile clients being written in Kotlin (Android) and Swift (iOS), I’ve changed this to React Native as the ramp up from React JS is very small, the mobile client is not anticipated to be the primary use case for Prepple early on, and getting the app accepted onto the app stores will be challenge enough without having to learn additional languages, dependencies and build systems.

A major trade-off with this multi-language strategy is that if the financial prospects of Prepple change and the project shifts to a paid development team instead of an open source effort, it may be difficult to recruit developers as most engineers prefer working in a single stack or language over a polyglot approach. If this becomes the case, it may make sense to rewrite the CS Admin App and the Auth, Billing, and Shorturl APIs in Java so that the core languages are limited to Java and Typescript. (The ML admin app would most likely stay as Python/Django because of the prevalence of python in machine learning and data science.)

|Prepple Component|Language|GitHub PR Prevalence|PR/Issue Ratio|
|--|--|--|--|
|Web Client|TypeScript|7.93%|0.77|
|Android Client|Kotlin|1.44%|1.09|
|iOS Client|Swift|0.94%|1.11|
|Core API|Java|11.36%|1.05|
|Auth, Billing, & Shorturl APIs|Go|10.47%|1.10|
|ML Admin App|Python|17.28%|1.06|
|CS Admin App (RoR)|Ruby|5.03%|2.42|
|Overall| |54.45%|1.06|

#### 2.6.2 Complexity of provisioned resources vs complexity of code

Prepple has a relatively high number of CloudFormation stacks and individual AWS resources. There is a tradeoff between complexity of the infrastructure vs complexity of the code - by separating the infrastructure up into smaller pieces, the code base for any one component becomes simpler.

#### 2.6.3 Cost vs flexibility

Several of the decisions in this design may result in higher costs compared to a more monolithic design, especially at larger scale. This is not a one-way door, however - several of the resources that are currently separated out as their own API’s could eventually be built into the core backend API.  

### 2.7 Design Detail - Video Ingest & Analysis

![Video Ingest Schema](./Prepple-Video-Ingest.png)

### 2.8 Alternative Designs

#### 2.8.1 Classic Enterprise Monolith

#### 2.8.2 React Native + Express

#### 2.8.3 Desktop App w/RTMP ingest

## 3 Design Details

### 3.1 Functional requirements

#### 3.1.1 Core Auth & Billing Functionality

#### 3.1.2 Question & Answer View

#### 3.1.3 Prepper Landing Page

#### 3.1.4 Video resume builder

#### 3.1.5 Video resume view

#### 3.1.6 Candidate search & contact page

#### 3.1.7 Recruiter landing page

#### 3.1.8 Micro-mentor search & contact

#### 3.1.9 Micro-mentor Landing Page

#### 3.1.10 Notifications

#### 3.1.11 Prep plans

#### 3.1.12 Answer data view

### 3.2 Non-functional requirements

#### 3.2.1 Scaling

As discussed in the load calculations, scaling becomes a concern for certain components of the system only at the very top end of expected usage levels, and only during peak times. A Fargate-enabled ECS cluster should be sufficient to mitigate these concerns, but it may also be a good idea to build in an easy way to transition to an EKS based deployment strategy.  

#### 3.2.2 Latency

Minimizing latency is a major concern. Analyzing video, audio, and visual content takes time - as does actually uploading the video itself to the server orchestrating the analysis! The time between when a user clicks the ‘analyze video’ button and when they receive their results should be similar to the user experience on sites like Leetcode, Codewars, and Hackerrank. We don’t want to create needless costs by starting analysis on videos that won’t ultimately need it (users may record 4 or 5 attempts before determining that a video is their ‘best effort’ meriting analysis.) However, some amount of pre-processing and pre-analysis will likely be necessary in order to limit the latency of the results.

#### 3.2.3 Availability & Recovery

Service availability is a medium concern. Prepple is an interview prep tool - it does not contain sensitive data. While it is an important tool in interview prep, it is not as critical as, say, having access to one’s bank account or health information. Users will, however, be subscribing to the service to gain access to more features - they will expect the application to be highly available, and downtime or slow recovery could affect retention of both paying and non-paying customers.

#### 3.2.4 Security & Privacy

There are no unusual security or privacy concerns for Prepple aside from the standard ones. Users will have full control over the degree of public visibility of their video answers. The application does not store any sensitive data, and billing data storage is handled by a third party service.

#### 3.2.5 Monitoring & Observability

As a small, founder-driven project, monitoring infrastructure health and user behavior will be highly important in flagging, diagnosing, and resolving potential operational issues with the platform. The application has a central monitoring stack with separate CloudWatch dashboards focusing on infrastructure health, user experience, and general business performance for the various components of the platform. 

#### 3.2.6 Testing

The current plan is to implement Prepple with the full complement of unit, integration, E2E, load, chaos, and canary tests. This is particularly important since Prepple will eventually be welcoming contributions from the open source community - developers who are unfamiliar with the codebase risk inadvertently breaking existing functionality as they implement their changes. Chaos testing is of special interest because it relates to service recoverability and to the user experience when an individual component of the system goes down. (This can also be tested to a certain extent using integration tests and mocked inaccurate or improperly formatted responses.)

#### 3.2.7 Internationalization & Accessibility

There are currently no plans to localize Prepple to other languages. Based on my experience working in an internationalized open source project, this is a significant undertaking and is difficult to complete well using only volunteer open source contributions. The front end GH Actions CICD for pull requests is set up to run deep source analyses on the code, which should help catch and resolve most basic accessibility issues.

#### 3.2.8 Regulatory Concerns

Though the application is clearly not directed at children under the age of 13, some care will have to be taken to ensure that demographic data is collecte and that children for whom COPPA protections would apply are not using Prepple. In addition, even though there are no immediate plans for internationalization of the app, some number of users may be located in states or countries where privacy protection laws (CCPA and GDPR) apply. Care will have to be taken to build in the functionality for opting out of cookies and deleting personal data.

### 3.3 Phasing

## 4 Open Questions

## 5 Appendices

### 5.1 Doc Data/Change Log

### 5.2 FAQ

### 5.3 Background Information

### 5.4 Glossary

