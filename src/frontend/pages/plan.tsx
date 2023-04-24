import React, { MutableRefObject, SyntheticEvent } from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import Head from 'next/head'
import axios from 'axios'
import RecordView from '../components/RecordView'
import { Card, TextField, Button, FormHelperTextTypeMap, FormGroup } from '@mui/material';
import { useTheme } from "@mui/material"
import Markdown from 'markdown-to-jsx';
import { GraphQLQueryResponseData, PlanAttributes, QuestionAttributes, getPlans, getQuestions } from '../scripts/queries';
import QuestionList from "../components/QuestionList"
import { UserContext } from '../scripts/context'
import { redirectIfUnauthed } from '../scripts/auth'
import styles from '../styles/Home.module.css'
import { API_URL } from '.';

export interface CatalogEntry {
  qid: string;
  question: QuestionAttributes;
}

export interface PlanCatalogEntry extends CatalogEntry {
  plans: GraphQLQueryResponseData[];
}

export interface VideoCatalogEntry extends CatalogEntry {
  videos: GraphQLQueryResponseData[];
}

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false
});

const plus = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg>)

export default function Plans({ id }: { id: number}) {

  const { user } = useContext(UserContext);
  const router = useRouter();
  const theme = useTheme();

  const plan: GraphQLQueryResponseData = { id: '0' } as GraphQLQueryResponseData;
  const initCatalog: Array<PlanCatalogEntry> = [];
  const [catalog, setCatalog] = useState(initCatalog);
  const [activeRecords, setActiveRecords] = useState([] as GraphQLQueryResponseData[]);
  const [currentPlan, setCurrentPlan] = useState(plan);
  const [editTitle, setEditTitle] = useState(false);
  const [editPlan, setEditPlan] = useState(false);
  const [editPrompts, setEditPrompts] = useState(false);
  const [planMode, setPlanMode] = useState("edit");
  const [searchFor, setSearchFor] = useState("");
  const [searched, setSearched] = useState(false);
  const [searchResults, setSearchResults] = useState(catalog);
  const [collapseNew, setCollapseNew] = useState(false);
  const [collapseExisting, setCollapseExisting] = useState(false);

  const handleSetCatalog = (newCatalog: Array<PlanCatalogEntry>) => {
    setCatalog(newCatalog);
  }

  const handleSetActiveRecords = (id: string) => {
    const plans = catalog.find((q: PlanCatalogEntry) => q.plans.some((x: GraphQLQueryResponseData) => x.id == id))?.plans
    const plan = plans?.find((x: GraphQLQueryResponseData) => x.id == id)
    setActiveRecords([plan as GraphQLQueryResponseData]);
    setCurrentPlan(plan as GraphQLQueryResponseData);
  }

  const handleSetEditTitle = (bool: boolean) => {
    setEditTitle(bool)
  }

  const handleSetEditPlan = (bool: boolean) => {
    setEditPlan(bool)
  }

  const handleSetEditPrompts = (bool: boolean) => {
    setEditPrompts(bool);
  }

  const handleSetPlanMode = (str: string) => {
    setPlanMode(str);
  }

  const handleGetPlans = async (userId: string) => {
    const request = {
        query: getPlans,
        variables: {
          id: userId
        }
      }
    const result = await fetch(`${API_URL}/graphql`, {
      headers: {
        Authorization: `Bearer ${user.jwt}`,
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(request)
    })
    const parsed = await result.json()
    const answers = await parsed.data.answers
    return answers.data;
  }

  useEffect(() => {
    redirectIfUnauthed(user.jwt, router);

    if (user.jwt) {
      handleGetPlans(user.id).then((res) => {
        const questionsSortedByCategory = res.sort((a: GraphQLQueryResponseData, b: GraphQLQueryResponseData) =>
          ((a.attributes.question?.data as GraphQLQueryResponseData).attributes.category || 0) - ((b.attributes.question?.data as GraphQLQueryResponseData).attributes.category || 0));
        const reduced = questionsSortedByCategory.reduce((collector: PlanCatalogEntry[], item: GraphQLQueryResponseData) => {
          const index = collector.findIndex((x: PlanCatalogEntry) => x.qid == (item.attributes.question?.data as GraphQLQueryResponseData).id);
          if (index >= 0 && item.attributes.datetime_planned && item.attributes.datetime_planned > 0) {
            collector[index].plans.push(item)
          } else if (item.attributes.datetime_planned && item.attributes.datetime_planned > 0) {
            collector.push({
              qid: (item.attributes.question?.data as GraphQLQueryResponseData).id,
              question: (item.attributes.question?.data as GraphQLQueryResponseData).attributes.question as QuestionAttributes,
              plans: [item]
            }) 
          }
          return collector;
        }, [])
        setCatalog(reduced);
      })
    }
  }, [])

  const handleUpdate = async (e: SyntheticEvent, payload: object) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${user.jwt}`,
      'Content-Type': 'application/json'
    }
    if (planMode == "edit") {
      const body = {
        data: { ...payload}
      }
      await axios.put(`${API_URL}/api/answers/${currentPlan.id}`, body, { headers }).then(() => {
        const newPlan = { ...currentPlan };
        newPlan.attributes = { ...newPlan.attributes, ...payload };

        const qIndex = catalog.findIndex((q: PlanCatalogEntry) => q.plans.some((x: GraphQLQueryResponseData) => x.id == currentPlan.id))
        const newQ = { ...catalog[qIndex] };
        const pIndex = newQ.plans.findIndex((p: GraphQLQueryResponseData) => p.id == currentPlan.id)
        const newPlans = [...newQ.plans];
        newPlans[pIndex] = newPlan;
        newQ.plans = newPlans;
        const newCatalog = [ ...catalog ];
        newCatalog[qIndex] = newQ;
        const key = Object.keys(payload)[0]
        if (key === "title") {
          setEditTitle(false)
        }
        if (key === "planned_answer") {
          setEditPlan(false);
        }
        if (key === "prompts") {
          setEditPrompts(false);
        }
        setCurrentPlan(newPlan);
        setCatalog(newCatalog);
      })
    } else {
      const body = {
        data: {
          ...payload,
          users_permissions_user: user.id,
          user_id: user.id,
          datetime_planned: new Date(Date.now()).getTime(),
          question: (currentPlan.attributes.question?.data as GraphQLQueryResponseData).id,
        }
      }

      await axios.post(`${API_URL}/api/answers/`, body, { headers }).then((res) => {
        const qid = (currentPlan.attributes.question?.data as GraphQLQueryResponseData).id;

        const qIndex = catalog.findIndex((q: PlanCatalogEntry) => q.qid === qid);
        const newQ = { ...catalog[qIndex] };
        const plan = {
          id: res.data.data.id,
          attributes: {
            ...res.data.data.attributes,
            question: {
              data: {
                id: (currentPlan.attributes.question?.data as GraphQLQueryResponseData).id,
                attributes: {
                  question: (currentPlan.attributes.question?.data as GraphQLQueryResponseData).attributes.question
                }
              }
            }
          }
        };
        newQ.plans = newQ.plans.length ? newQ.plans.filter((x: GraphQLQueryResponseData) => x.id !== '0') : []
        newQ.plans.push(plan);
        const newCatalog = [ ...catalog ];
        newCatalog[qIndex] = newQ;
        const key = Object.keys(payload)[0]
        if (key === "title") {
          setEditTitle(false)
        }
        if (key === "planned_answer") {
          setEditPlan(false);
        }
        if (key === "prompts") {
          setEditPrompts(false);
        }
        setActiveRecords([plan.id.toString()])
        setCurrentPlan(plan);
        setCatalog(newCatalog);
        setPlanMode("edit");
      })
    }

  }

  const createNewAnswer = (qid: string, question: string) => {
    const newPlan = {
      id: '0',
      attributes: {
        title: "",
        planned_answer: "",
        prompts: "",
        question: {
          data: {
            id: qid.toString(),
            attributes: {
              question: question
            }
          }
        }
      } 
    };
    // Add in a check -- don't add the question to the catalog if already there
    const existing = catalog.filter(q => q.question == question)
    if (existing.length == 0) {
      const newPlanCatalog = [...catalog, { qid: qid, question: question, records: [] }];
      setCatalog(newPlanCatalog as PlanCatalogEntry[]);
    } 
      setPlanMode("create");
      setCurrentPlan(newPlan as GraphQLQueryResponseData);
      setEditTitle(true);
      setEditPlan(true);
      setEditPrompts(true);
  }

  const renderResults = () => {
    return (
      <>
      {searchResults.map((q: PlanCatalogEntry) => (
        <Card sx={{ p: 1, mb: 2 }} key={q.qid}>
          <div className="row">
            <div><b>{q.question.question}</b>&nbsp;&nbsp;&nbsp;</div>
          </div>
          <div className="row">
            <abbr className="icon" title="Add New Answer" onClick={() => { console.log(q); createNewAnswer(q.qid, q.question.question || "") }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </abbr>
            <div>&nbsp;&nbsp;&nbsp;Plan an answer to this question</div>
          </div>
          <style jsx>{`
            .row {
              padding: 8px;
              display: flex;
              flex-wrap: nowrap; 
              align-items: center;
            }
            .icon {
              margin-top: 4px;
              cursor: pointer;
            }
          `}</style>
        </Card>
      ))}
      </>
    )
  }
  
  interface SearchForm extends EventTarget {
    search: HTMLInputElement;
  }

  interface PlanForm extends EventTarget {
    title: HTMLInputElement;
    planned_answer: HTMLInputElement;
    prompts: HTMLInputElement;
  }

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (searchFor.length > 0) {
        const request = {
          query: getQuestions,
          variables: {
            search: (e.target as SearchForm).search.value,
          }
        }
      const result = await fetch(`${API_URL}/graphql`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(request)
      })

      const parsed = await result.json()
      const questions = await parsed.data.questions
      const questionData = await questions.data;
      setSearchResults(questionData);
      setSearched(true);
      setSearchFor("");
      (e.target as SearchForm).search.value = "";
    }
  }

  const titleEditStyle = { flexGrow: 1, width: "100%", backgroundColor: theme.palette.background.paper,}

  const mdEditorStyle = { minHeight: 300, height: "auto", width: "100%" };

  const calcMaxHeight = () => {
      if (collapseNew && collapseExisting) {
        return "calc(100vh - 146px - 114px)"
      }
      if (collapseNew && !collapseExisting) {
        return "calc(100vh - 446px)"
      }
      if (!collapseNew && collapseExisting) {
        return "calc(50vh - 14px)"
      }
      if (!collapseNew && !collapseExisting) {
        return "calc(50vh - 14px)"
      }
    return "calc(110vh - 114px)"
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>My Dev Interview - Video Interview Practice App</title>
        <meta name="description" content="Video interview simulator with some wildcards thrown in." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className="videos">
          <h1>Plan a New Answer <span onClick={() => setCollapseNew(!collapseNew)} className={`mobile ${collapseNew ? "collapsed-icon" : "expanded-icon"}`}>{plus}</span></h1>
          <div className={`collabsible ${collapseNew ? "collapsed" : "expanded"}`}>
          <form onSubmit={handleSearch}>
            <TextField 
              id="search" 
              name="search"
              label="Search for a question"
              onChange={(e) => { setSearchFor(e.target.value); if (searched) { setSearched(false) } }}
              sx={{ background: theme.palette.background.paper,  width: "100%", mb: 2 }}
            />
            <div className="search-button">
              <Button sx={{ mr: 2, mb: 2 }} type="reset" variant="outlined" onClick={() => {
                setSearchResults([]);
                setSearchFor("");
                setSearched(false);
              }}>Clear</Button>
              <Button sx={{ mb: 2 }}type="submit" variant="contained">Search</Button>
            </div>
          </form>
            {searchResults?.length > 0 ? renderResults() : searched === false ? "" : "No questions match that search." }
          </div>
          <h1>My Planned Answers <span onClick={() => setCollapseExisting(!collapseExisting) }  className={`mobile ${collapseExisting ? "collapsed-icon" : "expanded-icon"}`}>{plus}</span></h1>
          <div className={`collabsible ${collapseExisting ? "collapsed" : "expanded"}`}>
          {catalog?.length > 0 ? (
            <QuestionList
              catalog={catalog}
              style="plans"
              activeRecords={activeRecords}
              setActiveRecords={handleSetActiveRecords}
              setCatalog={handleSetCatalog}
              planHandlers={{
                setEditTitle: handleSetEditTitle,
                setEditPlan: handleSetEditPlan,
                setEditPrompts: handleSetEditPrompts,
                setPlanMode: handleSetPlanMode
              }}
            />
            ) : "No plans available to display"}
          </div>
        </section>
        <section className="viewer">
          <h1 className="desktop">&nbsp;</h1>
          {(Number(currentPlan.id) > 0 || planMode == "create") && (<>
            <Card variant="outlined" sx={{ mb: theme.spacing(2), p: theme.spacing(2), display: 'flex', width: '100%', height: '10vh', minHeight: '80px', alignItems: 'center', justifyContent: 'center' }}>
              <div><b>{(currentPlan.attributes.question?.data as GraphQLQueryResponseData).attributes.question}</b></div>
            </Card>
                      {Number(currentPlan.id) > 0 && planMode == "record" && (
            <>
              <RecordView
                questionId={(currentPlan.attributes.question?.data as GraphQLQueryResponseData).id}
                title={currentPlan.attributes.title}
                answerId={currentPlan.id}
                />
                <Button sx={{ mt: 6 }} type="button" onClick={() => setPlanMode('edit')}>Cancel Recording</Button>
            </>
          )}
            {planMode !== 'record' && (
              <>
                <h3 className="mb-0">
                  Story Title&nbsp;&nbsp;
                  {editTitle == false && (
                    <svg className="clickable" onClick={() => setEditTitle(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                  )}
                </h3>
                {editTitle == false && (
                  <p className="mb-4">{currentPlan.attributes.title}</p>
                )}
                {editTitle && (
                  <form className="title" onSubmit={(e: SyntheticEvent) => handleUpdate(e, { title: (e.target as PlanForm).title.value })}>
                    <TextField
                      name="title"
                      style={titleEditStyle}
                      defaultValue={currentPlan.attributes.title}
                    />
                    <Button sx={{ mt: 1 }} onClick={() => setEditTitle(false)} type="button" variant="outlined">Cancel</Button>
                    <Button sx={{ mt: 1, ml: 1 }} type="submit" variant="contained">Save</Button>
                  </form>
                )}
                <h3 className="mb-1">Narrative&nbsp;&nbsp;
                  {editPlan === false && (
                    <svg className="clickable" onClick={() => setEditPlan(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                  )}
                </h3>
                <div className="mb-4">
                  {editPlan === false && currentPlan.attributes.planned_answer && (
                    <Markdown>{currentPlan.attributes.planned_answer}</Markdown>
                  )}
                {editPlan && (
                  <form onSubmit={(e: SyntheticEvent) => handleUpdate(e, { planned_answer: (e.target as PlanForm).planned_answer.value })} className="md-editor">
                      <MdEditor
                        view={{ menu: true, md: true, html: false }}
                        canView={{ both: false, menu: true, md: true, html: true, fullScreen: false, hideMenu: true }}
                      name="planned_answer"
                      defaultValue={currentPlan.attributes.planned_answer || ""}
                      style={mdEditorStyle}
                      renderHTML={(text) => <ReactMarkdown>{text || ""}</ReactMarkdown>}
                    />
                    <Button sx={{ mt: 1 }} onClick={() => setEditPlan(false)} type="button" variant="outlined">Cancel</Button>
                    <Button sx={{ mt: 1, ml: 1 }} type="submit" variant="contained">Save</Button>
                  </form>
                )}
                </div>
              </>
            )}
            <h3 className="mb-1">Prompts&nbsp;&nbsp;
              {editPrompts === false && (
                <svg className="clickable" onClick={() => setEditPrompts(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg>
              )}
            </h3>
            <div className="mb-4">
              {editPrompts === false && currentPlan.attributes.prompts && (
                <Markdown>{currentPlan.attributes.prompts}</Markdown>
              )}
              {editPrompts && (
                <form onSubmit={(e: SyntheticEvent) => handleUpdate(e, { prompts: (e.target as PlanForm).prompts.value })} className="md-editor">
                  <MdEditor
                    name="prompts"
                    defaultValue={currentPlan.attributes.prompts || ""}
                    style={mdEditorStyle}
                    renderHTML={(text) => <ReactMarkdown>{text || ""}</ReactMarkdown>}
                  />
                  <Button sx={{ mt: 1 }} onClick={() => setEditPrompts(false)} type="button" variant="outlined">Cancel</Button>
                  <Button sx={{ mt: 1, ml: 1 }} type="submit" variant="contained">Save</Button>
                </form>
              )}
            </div>
          </>)}
        </section>
      </main>
      <style>{`
      @media only screen and (max-width: 601px) {
        .button-type-strikethrough,
        .button-type-wrap, 
        .button-type-underline,
        .button-type-quote, 
        .button-type-clear,
        .button-type-table,
        .button-type-undo,
        .button-type-code-block,
        .button-type-redo
         {
          display: none!important;
        }
      }
      `}
      </style>
      <style jsx>{`
        main {
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row;
          align-items: flex-start;
        }
        .videos {
          width: calc(40vw - 4rem - 16px);
          margin-right: 2rem;
          max-height: calc(100vh - 67px);
          overflow-y: scroll;
        }
        .collapsible {
          transition: max-height 1s ease, height 1s ease, transform 1s ease;
        }
        .collapsed {
          max-height: 0px;
          overflow: hidden;
        }
        .viewer {
          width: calc(60vw - 2rem - 16px);
        }
        .viewer video {
          height: calc(0.75 * (60vw - 2rem - 16px))
        }
        .search-button {
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }
        .mb-0 {
          margin-bottom: 0;
        }
        .mb-1 {
          margin-bottom: 8px;
        }
        .clickable {
          cursor: pointer;
        }
        mb-4 {
          margin-bottom: 32px;
        }
        .title {
          display: flex; 
          flex-wrap: wrap; 
          justify-content: flex-end; 
          width: 100%; 
          margin: 8px 0px;
        }
        .md-editor {
          display: flex;
          flex-wrap: wrap; 
          justify-content: flex-end; 
          width: 100%; 
        }
        .mobile {
          display: none;
        }
        .expanded-icon {
          transform: rotate(45deg);
        }
        .collapsed-icon {
          transform: rotate(0deg);
        }
        @media only screen and (max-width: 700px) {
          main {
            flex-wrap: wrap-reverse;
            overflow: hidden;
            padding: 0;
            flex-direction: row!important;
            align-items: flex-end!important;
            align-content: flex-end!important;
            justify-content: flex-end!important;
          }
          .videos {
            width: 100%;
            margin-right: 0;
            padding: 8px 16px 8px 16px;
            min-height: ${currentPlan.id == "0" ? "calc(100vh - 148px)" : ""};
            max-height: ${currentPlan.id == "0" ? "100%" : "calc(50vh - 92px)"};
            overflow: scroll;
            vertical-align: bottom;
            box-shadow: 0px -3px 3px rgb(0,0,0,0.3);
            background-color: ${theme.palette.background.paper};
          }
          .videos h1 {
            display: inline-block;
            width: calc(100% + 32px);
            margin: 0px -16px;
            padding: 16px;
            position: relative;
            margin-bottom: 8px;
            background-color: ${theme.palette.primary.main};
            color: #fff;
          }
          .viewer {
            min-height: 0;
            max-height: ${calcMaxHeight()};
            overflow: scroll;
            width: 100%;
            padding: 1rem;
          }
          .viewer h1.desktop {
            display: none!important;
          }
          .mb-1 {
            margin-bottom: 0;
          }
          .mb-4 {
            margin-bottom: 8px;
          }
          .mobile {
            display: inline-block;
            position: absolute;
            top: calc(50% - 12px);
            right: 10px;
          }
        }
      `}</style>
    </div>
  )
}
