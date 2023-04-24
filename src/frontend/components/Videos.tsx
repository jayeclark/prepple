import { useTheme } from "@mui/material"
import { formattedDate, formattedRating } from "../scripts/formatting"
import { GraphQLQueryResponseData } from '../scripts/queries';
import { ReactElement, ReactNode, SVGProps, SyntheticEvent, useCallback } from "react";

interface VideosProps {
  allRecords: Array<GraphQLQueryResponseData>;
  activeRecords: Array<GraphQLQueryResponseData>;
  setActiveRecords: Function;
  filterBy: string;
  handlers: {
    setModalMode: (s: string) => void;
    setCurrentModalID: (s: string) => void;
    setCurrentS3Key: (s: string) => void;
    setShowModal: (b: boolean) => void;
  }
}

function Videos({ allRecords, activeRecords, setActiveRecords, filterBy, handlers }: VideosProps) {
  const theme = useTheme();
  const { setModalMode, setCurrentModalID, setCurrentS3Key, setShowModal } = handlers;

  const handleSetActiveRecords = useCallback(
    (e: SyntheticEvent) => {
      const id = (e.target as HTMLDivElement).id;
      setActiveRecords(id);
    },
    [setActiveRecords])
  
  const handleShowArchiveModal = useCallback(
    (e: SyntheticEvent) => {
      const id = (e.target as HTMLElement).id
      e.stopPropagation();
      setModalMode("archive");
      setCurrentModalID(id);
      setShowModal(true);
    },
    [setCurrentModalID, setShowModal, setModalMode]
  )

  const handleShowDeleteModal = useCallback(
    (e: SyntheticEvent) => {
      const id = (e.target as HTMLElement).id;
      const s3key = (e.target as SVGProps<SVGSVGElement>)?.name;
      e.stopPropagation();
      setModalMode("delete");
      setCurrentModalID(id);
      setCurrentS3Key(s3key || "1");
      setShowModal(true)
    },
    [setCurrentModalID, setModalMode, setCurrentS3Key, setShowModal]
  )

  return (
    <>
      {allRecords.filter((v: GraphQLQueryResponseData) => !v.attributes.title || v.attributes.title?.includes(filterBy) || (v.attributes.question?.data as GraphQLQueryResponseData).attributes.question?.includes(filterBy)).map((v: GraphQLQueryResponseData, i: number) => {
        
        return (
          <div
            key={v.attributes.s3key}
            id={v.id}
            className={activeRecords.map((a: GraphQLQueryResponseData) => a.id).includes(v.id.toString()) ? "video-active" : "video"}
            style={{ borderTop: i > 0 ? '1px solid #efefef' : 'none' }}
            onClick={handleSetActiveRecords}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={theme.palette.primary.main} viewBox="0 0 16 16">
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z" />
            </svg>
            <div className="indent">
              {v.attributes.title && (<>{v.attributes.title}<br /></>)}
              {v.attributes.rating && v.attributes.rating >= 0 && (<>{formattedRating(v.attributes.rating)}&nbsp;&nbsp;</>)}
              <span className="date">{formattedDate(v.attributes.datetime as number)}</span><br />
            </div>
            <div className="action-options">
              <svg onClick={handleShowArchiveModal} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#666" viewBox="0 0 16 16">
                <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
              </svg>
              &nbsp;
              <svg id={v.id} name={v.attributes.s3key} onClick={handleShowDeleteModal} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#666" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
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
        )
      }
      )}
    </>)
}
export default Videos;