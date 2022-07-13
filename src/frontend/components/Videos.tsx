import { useTheme } from "@mui/material"
import { formattedDate, formattedRating } from "../scripts/formatting"

interface VideosProps {
  allRecords: Array<any>;
  activeRecords: Array<string>;
  setActiveRecords: Function;
  filterBy: string;
  handlers: {
    setModalMode: Function;
    setCurrentModalID: Function;
    setCurrentS3Key: Function;
    setShowModal: Function;
  }
}

function Videos({ allRecords, activeRecords, setActiveRecords, filterBy, handlers }: VideosProps) {
  const theme = useTheme();
  const { setModalMode, setCurrentModalID, setCurrentS3Key, setShowModal } = handlers;

  return (
    <>
      {allRecords.filter((v: any) => !v.attributes.title || v.attributes.title?.includes(filterBy) || v.attributes.question.data.attributes.question.includes(filterBy)).map((v: any, i: number) => (
        <div 
          key={v.attributes.s3key}
          className={activeRecords.includes(v.id) ? "video-active" : "video"}
          style={{ borderTop: i > 0 ? '1px solid #efefef' : 'none' }} 
          onClick={() => setActiveRecords(v.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={theme.palette.primary.main} viewBox="0 0 16 16">
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z"/>
          </svg>
          <div className="indent">
            {v.title && (<>{v.title}<br/></>)}
            {v.attributes.rating >= 0 && (<>{formattedRating(v.attributes.rating)}&nbsp;&nbsp;</>)} 
            <span className="date">{formattedDate(v.attributes.datetime)}</span><br />
          </div>
          <div className="action-options">
            <svg onClick={(e) => { e.stopPropagation(); setModalMode("archive"); setCurrentModalID(v.id); setShowModal(true) }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#666" viewBox="0 0 16 16">
                <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
              </svg>
              &nbsp;
            <svg onClick={(e) => { e.stopPropagation(); setModalMode("delete"); setCurrentModalID(v.id); setCurrentS3Key(v.attributes.s3key);  setShowModal(true) }}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#666" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
              </svg>
          </div>
          <style jsx>{`
            .date {
              font-size: small; 
              opacity: 0.5;
            }
            .action-options {
               flex-grow: 1; 
               margin: 0 8px; 
               display: flex; 
               flex-wrap: nowrap; 
               justify-content: flex-end;
            }
            .video, .video-active {
              cursor: pointer; 
              padding: 8px;
              display: flex; 
              align-items: center; 
              width: 100%;           
            }
            .video-active {
              background-color: rgba(0,255,0,0.2);
            }
            .indent {
               margin-left: 8px;
            }
          `}</style>
        </div>
      ))}
    </>)
}
export default Videos;