import { useTheme, Skeleton } from "@mui/material"

export default function NewsAndInfo() {
  const theme = useTheme();

  return (
    <>
      <div className="news">
        <h4>Featured Questions</h4>
        <div className="news-items">
          <div className="news-item">
            <div className="question">
              <h2><em>&quot;Tell me about a goal you reached and how you achieved it.&quot;</em></h2>
            </div>
            <p>
              The interviewer is interested in learning about your process more than the goal itself. How do you plan out achieving a specific goal, and how do you keep yourself on track? 
            </p>
          </div>
          <div className="news-item">
            <div className="question">
              <h2><em>&quot;Tell me about an unpopular decision you made.&quot;</em></h2>
            </div>
            <p>
              The interviewer is interested in learning how you deal with conflict. This and similar questions may be especially common if you are interviewing for a management role.
            </p>
          </div>
          <div className="news-item">
            <div className="question">
              <h2><em>&quot;What coding language are you most comfortable with?&quot;</em></h2>
            </div>
            <p>
              The interviewer is looking for more than just a one-word answer here. Give details on how you became comfortable with that language and what you most like about it.
            </p>
          </div>
        </div>
      </div>
      <div className="info">
        <h1>Helpful Links</h1>
        <div className="links">
          <a href="https://interviewsteps.com/blogs/news/amazon-star-method" target="_blank" rel="noreferrer">
          <div className="info-link">
            <h3><span className="blue">STAR method answers.</span></h3>
            <p>A detailed article on the Situation-Task-Action-Result method of answering behavioral interview questions.</p>
            </div>
          </a>
          <a href="https://hunterskillrecruitment.co.uk/answer-any-interview-question-with-c-a-r-l-your-best-reference/" target="_blank" rel="noreferrer">
            <div className="info-link">
            <h3><span className="blue">Answer any interview question with CARL.</span></h3>
              <p>An article outlining how to answer interview questions using the Context-Action-Result-Learning structure.</p>
            </div>
          </a>
        </div>
        <div className="links">
          <a href="https://www.indeed.com/career-advice/interviewing/interview-question-tell-me-about-yourself" target="_blank" rel="noreferrer">
            
          <div className="info-link">
            <h3><span className="blue">How to answer &quot;tell me about yourself&quot;.</span></h3>
            <p>A step by step guide from Indeed on how to give your elevator pitch for yourself in an interview.</p>
          </div>
          </a>
          <a href="https://www.themuse.com/advice/video-interview-tips" target="_blank" rel="noreferrer">
          <div className="info-link">
            <h3><span className="blue">Video interview tips.</span></h3>
            <p>20 tips from The Muse on how to look and sound your very best in video interviews.</p>
            </div>
          </a>
        </div>
        <div className="links">
          <a href="https://www.indeed.com/career-advice/interviewing/common-technical-interview-questions-and-answers" target="_blank" rel="noreferrer">
          <div className="info-link">
            <h3><span className="blue">Common technical interview questions &amp; example answers.</span></h3>
            <p>A comprehensive guide by Indeed that explains the types of questions you may get, and strategies for answering.</p>
            </div>
          </a>
          <a href="https://www.udemy.com/course/crack-the-coding-interview-like-an-expert-bigtech-faang/" target="_blank" rel="noreferrer">
          <div className="info-link">
            <h3><span className="blue">Cracking the coding interview at FAANG &amp; tech companies.</span></h3>
            <p>A comprehensive Udemy course on the interview process at Faang companies, with sample problems and solutions. (Costs $9.99.)</p>
            </div>
          </a>
        </div>
     </div>
      <style jsx>{`
      h1 {
        text-align: center;
      }
      h3 {
        margin-top: 16px;
      }
      h4 {
        text-transform: uppercase;
        letter-spacing: 3px;
        font-weight: 400;
        color: ${theme.palette.primary.main}
      }
      .blue {
        color: ${theme.palette.primary.main};
      }
      .info,
      .news {
        width: 100vw;
        padding: 20px 40px;
      }
      .info {
        background-color: ${theme.palette.background.paper};
        margin-bottom: -16px;
      }
      .news-items {
        margin: 0px -8px;
        height: max-content;
        display: flex;
        justify-content: stretch;
      }
      .news-item {
        margin: 8px;
        height: 100%;
        min-width: 250px;
        flex-grow: 1;
        border-radius: 10px;
        background-color: ${theme.palette.secondary.main};
        padding: ${theme.spacing(1)} ${theme.spacing(2)};
        color: ${theme.palette.background.default};
      }
      .question {
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #fff;
      }
      .news-item > p {
        font-weight: 300;
        font-size: 0.85rem;
        line-height: 1.25rem;
      }
      .links {
        margin: 16px -8px;
        height: max-content;
        display: flex;
        justify-content: stretch;
      }
      .info-link {
        margin: 8px;
        height: 100%;
        min-width: 250px;
        width: calc(50vw - 49px);
        flex-grow: 1;
        flex-shrink: 1;
        border-radius: 10px;
        padding: ${theme.spacing(2)};
        border: 1px solid ${theme.palette.background.default}
      }
      @media only screen and (max-width: 700px) {
        .news-items,
        .links {
          flex-wrap: wrap;
          margin: 0px -24px;
        }
        .info-link {
          height: fit-content;
          width: calc(100% - 16px);
          padding: 16px;
        }
        .info-link h3 {
          margin: 0;
        }
        .info-link p {
          margin-bottom: 0;
          margin-top: 4px;
          color: #666;
          font-size: 0.85rem;
          line-height: 1.2rem;
        }

        .news-item {
          margin: 16px 8px;
        }

        .news h4 {
          text-align: center;
        }
      }
      `}</style>
    </>
  )
}