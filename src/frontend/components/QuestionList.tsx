import { useState, useContext } from 'react'
import { TextField, Card, Dialog, Button, useTheme } from '@mui/material'
import axios from 'axios'
import Videos from './Videos'
import Plans from './Plans'
import { UserContext } from '../scripts/context'
import { API_URL } from '../pages'
import { GraphQLQueryResponseData } from '../scripts/queries';
import { PlanCatalogEntry, VideoCatalogEntry } from '../pages/plan';
interface QuestionsProps {
  catalog: PlanCatalogEntry[] | VideoCatalogEntry[];
  listStyle: "plans" | "videos";
  activeRecords: GraphQLQueryResponseData[];
  setActiveRecords: (s: string) => void;
  setCatalog: (c: VideoCatalogEntry[] | PlanCatalogEntry[]) => void;
  planHandlers?: {
    setEditTitle: (b: boolean) => void;
    setEditPlan: (b: boolean) => void;
    setEditPrompts: (b: boolean) => void;
    setPlanMode: (s: string) => void;
  };
}

function Questions({ catalog, setCatalog, listStyle, activeRecords, setActiveRecords, planHandlers }: QuestionsProps) {
  const { user } = useContext(UserContext)
  const theme = useTheme()
  const [filterBy, setFilterBy] = useState('')
  const [modalMode, setModalMode] = useState("delete")
  const [currentModalID, setCurrentModalID] = useState("")
  const [currentS3Key, setCurrentS3Key] = useState("")
  const [showModal, setShowModal] = useState(false)
  
  const { setEditTitle, setEditPlan, setEditPrompts, setPlanMode } = planHandlers || {};
  
  const handleSetModalMode = (mode: string) => {
    setModalMode(mode);
  }

  const handleSetCurrentModalID = (id: string) => {
    setCurrentModalID(id);
  }

  const handleSetCurrentS3Key = (key: string) => {
    setCurrentS3Key(key);
  }

  const handleSetShowModal = (bool: boolean) => {
    setShowModal(bool);
  }


  const removeFromCatalog = (id: string) => {
    const newCatalog = catalog.map((question: PlanCatalogEntry | VideoCatalogEntry) => {
          if ('plans' in question) {
            question.plans = question.plans.filter(x => x.id !== id)
          }
          if ('videos' in question) {
            question.videos = question.videos.filter(x => x.id !== id)
          }
          return question;
      })
      .filter((q) => {
        if ('plans' in q) {
          return q.plans.length > 0;
        }
        if ('videos' in q) {
          return q.videos.length > 0;
        }
        return false;
      });
    setCatalog('plans' in newCatalog[0] ? newCatalog as PlanCatalogEntry[] : newCatalog as VideoCatalogEntry[]); 
    if (activeRecords[0].id == id) {
      setActiveRecords("");
    }
  }
  
  const handleArchiveVideo = () => {
    const body = {
      data: {
          archive: true
      }
    }
    const headers = {
      Authorization: `Bearer ${user.jwt}`,
      'Content-Type': 'application/json'
    }
    axios.put(`${API_URL}/api/videos/${currentModalID}`, body, {headers}).then(() => {
      removeFromCatalog(currentModalID.toString());
      setShowModal(false);
      setCurrentModalID("");
    })
  }

  const handleArchivePlan = () => {
    const body = {
      data: {
          archive: true
      }
    }
    const headers = {
      Authorization: `Bearer ${user.jwt}`,
      'Content-Type': 'application/json'
    }
    axios.put(`${API_URL}/api/answers/${currentModalID}`, body, {headers}).then(() => {
      removeFromCatalog(currentModalID.toString());
      setShowModal(false);
      setCurrentModalID("");
    })
  }

  const handleDeleteVideo = async () => {
    const headers = {
      Authorization: `Bearer ${user.jwt}`
    }
    axios.delete(`${API_URL}/api/videos/${currentModalID}`, { headers }).then(async () => {
      await fetch(`/api/delete-s3?key=${currentS3Key}`, {
        method: "POST",
        headers
      })
      removeFromCatalog(currentModalID.toString());
      setShowModal(false);
      setCurrentModalID("");
      setCurrentS3Key("");
    })
  }
  
  const handleDeletePlan = async () => {
    const headers = {
      Authorization: `Bearer ${user.jwt}`
    }
    axios.delete(`${API_URL}/api/answers/${currentModalID}`, { headers }).then(async () => {
      removeFromCatalog(currentModalID.toString());
      setShowModal(false);
      setCurrentModalID("");
    })
  }

  return (
    <>
      <TextField 
          onChange={(e) => setFilterBy(e.target.value.toLowerCase())} 
          id="filter" 
          name="filter"
          label="Filter by question or video title"
          sx={{ background: theme.palette.background.paper, width: '100%', mb: 2 }}
      />
      <div className="cards-list">
        {'plans' in catalog[0] ? (catalog as PlanCatalogEntry[]).filter((q: PlanCatalogEntry) => {
            const question = q.question as string; 
            let records: GraphQLQueryResponseData[] = [];
            if ('plans' in q) {
              records = q.plans;
            } 
            return (question?.toLowerCase().match(filterBy)) || records.some((v: GraphQLQueryResponseData) => v.attributes.title?.toLowerCase().match(filterBy))
          }).map((q: PlanCatalogEntry) => (
            <Card sx={{ p: 1, mb: 2 }} key={q.qid}>
              <div className="question"><b>{q.question.question}</b></div>
                <Plans
                  allRecords={q.plans}
                  activeRecords={activeRecords}
                  setActiveRecords={setActiveRecords}
                  filterBy={filterBy}
                  handlers={{
                    setModalMode: handleSetModalMode,
                    setCurrentModalID: handleSetCurrentModalID,
                    setShowModal: handleSetShowModal,
                    setEditTitle: setEditTitle as (b: boolean) => void,
                    setEditPlan: setEditPlan as (b: boolean) => void,
                    setEditPrompts: setEditPrompts as (b: boolean) => void,
                    setPlanMode: setPlanMode as (s: string) => void,
                  }}
                />
            </Card>
          )) : null
        }
      {'videos' in catalog[0] && (catalog as VideoCatalogEntry[]).filter((q: VideoCatalogEntry) => {
          const question = q.question as string; 
          let records: GraphQLQueryResponseData[] = [];
          if ('videos' in q) {
            records = q.videos;
          } 
          return (question?.toLowerCase().match(filterBy)) || records.some((v: GraphQLQueryResponseData) => v.attributes.title?.toLowerCase().match(filterBy))
        }).map((q: VideoCatalogEntry) => (
          <Card sx={{ p: 1, mb: 2 }} key={q.qid}>
            <div className="question"><b>{q.question.question}</b></div>
              <Videos
                allRecords={q.videos}
                activeRecords={activeRecords}
                setActiveRecords={setActiveRecords}
                filterBy={filterBy}
                handlers={{
                  setModalMode: handleSetModalMode,
                  setCurrentModalID: handleSetCurrentModalID,
                  setCurrentS3Key: handleSetCurrentS3Key,
                  setShowModal: handleSetShowModal,
                }}
              />
          </Card>
        ))}
      </div>
      <Dialog open={showModal}>
        <Card sx={{ p: 4 }}>
          <div className="delete-confirm">Are you sure you want to {modalMode} this {listStyle == "videos" ? "video" : "answer plan"}?</div>
          <div>
            <Button sx={{ width: 'calc(50% - 4px)', mr: 1 }} variant="outlined" onClick={() => {
              setCurrentModalID("");
              setCurrentS3Key("");
              setShowModal(false);
            }}>Cancel</Button>
            {listStyle == "videos" && <Button sx={{ width: 'calc(50% - 4px)' }} variant="contained" onClick={() => modalMode == "archive" ? handleArchiveVideo() : handleDeleteVideo()}>{modalMode === "archive" ? "Archive" : "Delete"}</Button>}
            {listStyle == "plans" && <Button sx={{ width: 'calc(50% - 4px)' }} variant="contained" onClick={() => modalMode == "archive" ? handleArchivePlan() : handleDeletePlan()}>{modalMode === "archive" ? "Archive" : "Delete"}</Button>}
          </div>
        </Card>
      </Dialog>
      <style jsx>{`
        .question {
          padding: 8px;
        }
        .delete-confirm {
          margin-bottom: 24px;
        }
        @media only screen and (max-width: 700px) {
          .cards-list {
            max-height: calc(30vh + 8px);
            overflow: scroll;
          }
        }
      `}</style>
      </>
    )
  }

export default Questions