import { useState, useEffect, useCallback } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { getQuestionIDs, getQuestion } from '../scripts/queries'
import { useTheme } from '@mui/material/'
import styles from '../styles/Practice.module.css'
import { offlineQuestions } from '../constants/offline'
import QuestionNavigator from '../components/QuestionNavigator'
import AnswerNavigator from '../components/AnswerNavigator'

let url = 'http://localhost:1337'
if (typeof window !== "undefined") {
  if (window.location.href.includes("herokuapp") || window.location.href.includes("mydevinterview")) {
    url = "https://backend-sheltered-shelf-66946.herokuapp.com";
  }
} 

export const API_URL = process.env.API_URL || url;
console.log("API URL: "  + API_URL);

const Home: NextPage = () => {
  const theme = useTheme();
  const askedArray: Array<string> = []
  const filterArray: Array<string> = []
  const [question, setQuestion] = useState({id: '', content: '', category: ''});
  const [count, setCount] = useState(0);
  const [asked, setAsked] = useState(askedArray);
  const [filters, setFilters] = useState(filterArray);

  const getQuestionCount = async () => {
    let currentCount = 1000;
    let totalCount = 0;
    while (currentCount === 1000) {
      try {
        const response = await fetch(`${API_URL}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: getQuestionIDs
          })
        })
        const parsedResponse = await response.json();
        const data = await parsedResponse.data.questions.data;
        totalCount += data.length;
        currentCount = data.length;
      } catch (e: unknown) {
        currentCount = 0;
        totalCount = 10;
      }
    }

    return totalCount;
  }

  const fetchQuestion = async (idToFetch: string) => {
    try {
      const response = await fetch(`${API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getQuestion,
          variables: {
            id: idToFetch
          }
        })
      })
      const parsedResponse = await response.json();
      const { data } = await parsedResponse;
      const { question: fetchedQuestion } = await data;
      return fetchedQuestion;
    } catch (e: unknown) {
      return offlineQuestions[parseInt(idToFetch)];
    }

  }

  const getPreviousQuestion = async (idToFetch: string) => {
    const prevQuestion = await fetchQuestion(idToFetch)
    return {
      id: idToFetch,
      content: prevQuestion.data.attributes.question,
      category: prevQuestion.data.attributes.category
      };
  }

  const getRandomQuestion = useCallback(async (length: number) => {
    let idToFetch = -1;
    while (idToFetch < 0) {
      const randomID = parseInt((Math.random() * (length - 1)).toFixed(0));
      if (asked.includes((randomID + 1).toString()) === false || (asked.length >= 30 && asked.slice(asked.length - 15).includes((randomID + 1).toString()) === false)) {
        idToFetch = randomID + 1;
      }
    }
    const randomQuestion = await fetchQuestion(idToFetch.toString());
    return randomQuestion;
  }, [asked])

  const getNextQuestion = useCallback(async (length = count) => {
    let nextQuestion = await getRandomQuestion(length);
    while (filters.length > 0 && !filters.includes(nextQuestion.data.attributes.category.split("_")[0])) {
      nextQuestion = await getRandomQuestion(length);
    }

    console.log(nextQuestion);
    return {
      id: nextQuestion.data.id,
      content: nextQuestion.data.attributes.question,
      category: nextQuestion.data.attributes.category
      };
  }, [count, filters, getRandomQuestion])

  useEffect(() => {
    getQuestionCount().then(async (res) => {
        setCount(res);
        const newQuestion = await getNextQuestion(res);
        setQuestion(newQuestion);
      })
  }, [getNextQuestion])

  useEffect(() => {
    if (filters.length > 0 && !filters.includes(question.category.split("_")[0])) {
      getNextQuestion().then((res) => setQuestion(res));
    }
  }, [filters, getNextQuestion, question.category])


  const handleNext = () => {
    const newAsked = [...asked];
    newAsked.push(question.id);
    setAsked(newAsked);
    getNextQuestion(count).then((res) => {
      setQuestion(res);
    })
  }

  const handleSkip = async () => {
    await getNextQuestion(count).then((res) => {
      setQuestion(res);
    })
  }

  const handlePrevious = async () => {
    await getPreviousQuestion(asked[asked.length - 1]).then((res) => {
      setQuestion(res);
    })
  }

  const toggleFilter = (filter: string) => {
    let newFilters;
    if (filters.includes(filter)) {
      newFilters = filters.filter(f => f !== filter);
    } else {
      newFilters = [...filters, filter];
    }
    setFilters(newFilters);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Prepple</title>
        <meta name="description" content="Video interview simulator with some wildcards thrown in." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className="question-navigator">
          <QuestionNavigator question={question} />
        </section>
        <section className="answer-navigator">
          <AnswerNavigator questionId={question.id} />
        </section>
      </main>

      <style jsx>{`
        .question-navigator {
          width: 45vw;
          flex-grow: 0;
          min-width: 200px;
          max-width: 550px;
          height: calc(100vh - 134.5px - 3rem);
          border: 1px solid blue;
          padding: 1rem;
        }
        .answer-navigator {
          border: 1px solid green;
          width: 55vw;
          min-width: 200px;
          padding: 1rem;
          height: calc(100vh - 134.5px - 3rem);
        }
        .buttons {
          display: flex!important:
          flex-wrap: nowrap;
          width: 100%;
          flex-wrap: nowrap;
          justify-content: space-between;
          justify-items: space-between;
          align-content: center;
          align-items: center;
        }
        .options {
          padding: 0px 0px 16px 0px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: calc(min(72vh, 72vw));
          min-width: calc(min(72vh, 72vw));
          max-width: 1600px;
        }
        .mobile {
          display: none;
        }
        @media only screen and (max-width: 700px) {
          .question {
            width: calc(min(88vh, 88vw));
            height: calc(min(66vh, 66vw) + 182px);
            min-width: calc(min(88vh, 88vw));
            min-height: calc(min(66vh, 66vw) + 182px);
          }
          .mobile {
            display: unset;
          }
          .options {
            flex-wrap: wrap;
            width: calc(min(88vh, 88vw));
            min-width: calc(min(88vh, 88vw));
            max-width: 1600px;
            justify-content: center;
          }
          .options-title {
            display: inline-block;
            padding: 0px 8px;
            width: 100%;
            text-align: center;
          }
          .skip-question,
          .previous-question {
            padding-top: 28px;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
