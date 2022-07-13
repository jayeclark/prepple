import { useState, useContext } from 'react'
import { TextField, Card, Dialog, Button, useTheme } from '@mui/material'
import axios from 'axios'
import Videos from './Videos'
import Plans from './Plans'
import { UserContext } from '../scripts/context'
import { API_URL } from '../pages'

const plus = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg>)

interface QuestionsProps {
  catalog: Array<any>;
  style: "plans" | "videos";
  activeRecords: Array<string>;
  setActiveRecords: Function;
  setCatalog: Function;
  planHandlers?: any;
}

function Questions({ catalog, setCatalog, style, activeRecords, setActiveRecords, planHandlers }: QuestionsProps) {
  const { user } = useContext(UserContext)
  const theme = useTheme()
  const [filterBy, setFilterBy] = useState('')
  const [modalMode, setModalMode] = useState("delete")
  const [currentModalID, setCurrentModalID] = useState(-1)
  const [currentS3Key, setCurrentS3Key] = useState("")
  const [showModal, setShowModal] = useState(false)
  
  const { setEditTitle, setEditPlan, setEditPrompts, setPlanMode } = planHandlers || {};
  
  const handleSetModalMode = (mode: string) => {
    setModalMode(mode);
  }

  const handleSetCurrentModalID = (id: number) => {
    setCurrentModalID(id);
  }

  const handleSetCurrentS3Key = (key: string) => {
    setCurrentS3Key(key);
  }

  const handleSetShowModal = (bool: boolean) => {
    setShowModal(bool);
  }

  interface Question {
    records: Array<any>;
    qid: number;
    question: string;
  }
  const removeFromCatalog = (id: string) => {
    const newCatalog = catalog.map((question: Question) => {
          question.records = question.records.filter(x => x.id !== id)
          return question;
      })
      .filter((q) => q.records.length > 0);
    setCatalog(newCatalog); 
    if (activeRecords[0] == id) {
      setActiveRecords('')
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
    axios.put(`${API_URL}/api/videos/${currentModalID}`, body, {headers}).then(res => {
      removeFromCatalog(currentModalID.toString());
      setShowModal(false);
      setCurrentModalID(-1);
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
    axios.put(`${API_URL}/api/answers/${currentModalID}`, body, {headers}).then(res => {
      removeFromCatalog(currentModalID.toString());
      setShowModal(false);
      setCurrentModalID(-1);
    })
  }

  const handleDeleteVideo = async () => {
    const headers = {
      Authorization: `Bearer ${user.jwt}`
    }
    axios.delete(`${API_URL}/api/videos/${currentModalID}`, { headers }).then(async (res) => {
      const response = await fetch(`/api/delete-s3?key=${currentS3Key}`, {
        method: "POST",
        headers
      })
      removeFromCatalog(currentModalID.toString());
      setShowModal(false);
      setCurrentModalID(-1);
      setCurrentS3Key("");
    })
  }
  
  const handleDeletePlan = async () => {
    const headers = {
      Authorization: `Bearer ${user.jwt}`
    }
    axios.delete(`${API_URL}/api/answers/${currentModalID}`, { headers }).then(async (res) => {
      removeFromCatalog(currentModalID.toString());
      setShowModal(false);
      setCurrentModalID(-1);
    })
  }

  const filterInputStyle = { backgroundColor: theme.palette.background.paper,  width: "100%", marginBottom: 16 }

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
      {catalog.filter((q: any) => {
        const question = q.question as string; 
        const records = q.records;
        return (question && question.toLowerCase().match(filterBy)) || records.some((v: any) => v.attributes.title?.toLowerCase().match(filterBy))
      })
        .map((q: any) => (
        <Card sx={{ p: 1, mb: 2 }} key={q.qid}>
          <div className="question"><b>{q.question}</b></div>
            {style == 'videos' && (
              <Videos
                allRecords={q.records}
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
            )}
            {style == 'plans' && (
              <Plans
                allRecords={q.records}
                activeRecords={activeRecords}
                setActiveRecords={setActiveRecords}
                filterBy={filterBy}
                handlers={{
                  setModalMode: handleSetModalMode,
                  setCurrentModalID: handleSetCurrentModalID,
                  setShowModal: handleSetShowModal,
                  setEditTitle,
                  setEditPlan,
                  setEditPrompts,
                  setPlanMode
                }}
              />
            )}
        </Card>
        ))}
      </div>
      <Dialog open={showModal}>
        <Card sx={{ p: 4 }}>
          <div className="delete-confirm">Are you sure you want to {modalMode} this {style == "videos" ? "video" : "answer plan"}?</div>
          <div>
            <Button sx={{ width: 'calc(50% - 4px)', mr: 1 }} variant="outlined" onClick={() => {
              setCurrentModalID(-1);
              setCurrentS3Key("");
              setShowModal(false);
            }}>Cancel</Button>
            {style == "videos" && <Button sx={{ width: 'calc(50% - 4px)' }} variant="contained" onClick={() => modalMode == "archive" ? handleArchiveVideo() : handleDeleteVideo()}>{modalMode === "archive" ? "Archive" : "Delete"}</Button>}
            {style == "plans" && <Button sx={{ width: 'calc(50% - 4px)' }} variant="contained" onClick={() => modalMode == "archive" ? handleArchivePlan() : handleDeletePlan()}>{modalMode === "archive" ? "Archive" : "Delete"}</Button>}
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