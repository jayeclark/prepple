import { useTheme } from '@mui/material'
import { formattedDate } from '../scripts/formatting'

interface PlansProps {
  allRecords: Array<any>;
  activeRecords: Array<any>;
  setActiveRecords: Function;
  filterBy: string;
  handlers: {
    setEditTitle: Function;
    setEditPlan: Function;
    setEditPrompts: Function;
    setPlanMode: Function;
    setModalMode: Function;
    setCurrentModalID: Function;
    setShowModal: Function;
  }
}
function Plans({ allRecords, activeRecords, filterBy, setActiveRecords, handlers }: PlansProps) {
  const theme = useTheme();
  const {
    setEditTitle,
    setEditPlan,
    setPlanMode,
    setEditPrompts,
    setModalMode,
    setCurrentModalID,
    setShowModal
  } = handlers  
  
  return (
    <>
      {allRecords?.filter((p: any) => !p.attributes.title || p.attributes.title?.includes(filterBy) || p.attributes.question.data.attributes.question.includes(filterBy)).map((p: any) => (
        <div 
          key={p.id.toString()} 
          className={activeRecords[0].id === p.id ? "video-active" : "video"}
          onClick={() => {
            setEditTitle(false);
            setEditPlan(false);
            setEditPrompts(false);
            setActiveRecords(p.id)
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={theme.palette.primary.main} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
          </svg>
          <span className='date-answers-lockup'>
            {p.attributes.title && (<>{p.attributes.title}<br/></>)}
            <span className='planned-date'>Planned {formattedDate(p.attributes.datetime_planned)}
              {p.attributes.videos?.data.length > 0 && (
                <>
                  {" | "}
                  {p.attributes.videos.data.length} answer{p.attributes.videos.data.length == 1 ? "" : "s"}
                </>
              )}
              </span>
          </span>
          <span className='actions-lockup'>
            <abbr title="Record an answer">
              <svg className='action-item' onClick={(e) => {
                e.stopPropagation();
                setEditTitle(false);
                setEditPlan(false);
                setEditPrompts(false);
                setActiveRecords(p);
                setPlanMode('record');
              }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#666" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
              </svg>
            </abbr>
            <abbr title="Archive Plan">
              <svg className='action-item' onClick={(e) => { e.stopPropagation(); setModalMode("archive"); setCurrentModalID(p.id); setShowModal(true) }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#666" viewBox="0 0 16 16">
                <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
              </svg>
            </abbr>
            <abbr title="">
              <svg className="action-item last" onClick={(e) => { e.stopPropagation(); setModalMode("delete"); setCurrentModalID(p.id);  setShowModal(true) }}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#666" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
              </svg>
            </abbr>
          </span>
          <style jsx>{`
          .video,
          .video-active {
            cursor: pointer;
            padding: 8px; 
            display: flex; 
            align-items: center;
          }
          .video-active {
            backgroundColor: rgba(0,255,0,0.2);
          }
          .date-answers-lockup {
            margin-left: 8px;
          }
          .actions-lockup {
            margin-left: 8px;
            flex-shrink: 0px;
            flex-grow: 1; 
            text-align: right; 
            cursor: pointer;
          }
          .planned-date {
            fontSize: small;
            opacity: 0.5;
          }
          .action-icon {
            margin: 4;
          }
          .action-icon.last {
            margin-right: 0!important;
          }
          `}</style>
        </div>
      ))}
    </>)
}
export default Plans;