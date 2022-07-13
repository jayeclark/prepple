import Slider from '@mui/material/Slider'

const customMarks = [
                      { value: 0, label: "Not at all" },
                      { value: 1, label: "" },
                      { value: 2, label: "" },
                      { value: 3, label: "" },
                      { value: 4, label: "" },
                      { value: 5, label: "Somewhat" },
                      { value: 6, label: "" },
                      { value: 7, label: "" },
                      { value: 8, label: "" },
                      { value: 9, label: "" },
                      { value: 10, label: "Very much" },
                    ]

function CustomSlider({ name, label }: { name: string; label: string }) {

  return (
    <div className="feedback-row">
            <Slider 
        min={0}
        max={10}
        name={`${name}-1`}
        defaultValue={5}
        step={1}
        valueLabelDisplay="off"
        className="feedback-video-column left"
        marks={customMarks}
      />
      <div className='feedback-row-label'><b>{label}</b></div>
      <Slider 
        min={0}
        max={10}
        name={`${name}-2`}
        defaultValue={5}
        step={1}
        valueLabelDisplay="off"
        className="feedback-video-column right"
        marks={customMarks}
        
      />
      <style jsx>{`
      .feedback-row {
        width: 100%;
        max-width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        padding: 8px 40px;
        border-top: 1px solid rgb(233, 232, 229)
      }
      .feedback-row-label {
        min-width: 20%; 
        text-align: center;
      }
      .feedback-video-column {
        min-width: calc(40% - 60px);
        font-size: 0.8rem;
        margin-bottom: 32px;
      }
      .feedback-video.column.left {
        margin-right: 60px
      }
      .feedback-video.column.right {
        margin-left: 60px
      }
    `}</style>
    </div>

  )
}

export default function FeedbackDouble() {
  const videoLabelStyle = {

  }
  return (
    <div>
      <div className="title-row">
        <div className="title-video-column left">
          Video A
        </div>
        <div  className="title-row-label">

        </div>
        <div className="title-video-column right">
          Video B
        </div>
      </div>
      <CustomSlider name="confident" label="Confident" />
      <CustomSlider name="articulate" label="Articulate" />
      <CustomSlider name="positive" label="Upbeat" />
      <CustomSlider name="relatable" label="Relatable" />
      <CustomSlider name="focused" label="Focused" />
      <CustomSlider name="capable" label="Capable" />
      <CustomSlider name="experienced" label="Experienced" />
      <CustomSlider name="insightful" label="Insightful" />
      <style jsx>{`
        .title-row {
          width: 100%;
          max-width: 100%;
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          padding: 8px 40px;
        }
        .title-video-column {
          min-width: calc(40% - 60px);
          text-align: center;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .title-video-column.right {
          margin-left: 60px;
        }
        .title-video-column.left {
          margin-right: 60px;
        }
        .title-row-label {
          min-width: 20%; 
          text-align: center;
        }
      `}</style>
    </div>
  )
}