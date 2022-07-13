import Slider from '@mui/material/Slider'

function CustomSlider({ name, label }: { name: string; label: string }) {
  return (
    <div className="feedback-row">
      <div className="feedback-row-label"><b>{label}</b></div>
      <Slider 
        min={0}
        max={10}
        name={name}
        defaultValue={5}
        step={1}
        valueLabelDisplay="off"
        className="feedback-row-slider"
        marks={[
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
          { value: 10, label: "Very much" }
        ]}
        
      />
      <style jsx>{`
      .feedback-row {
        width: 100%;
        max-width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        padding: 8px 0px;
        padding-right: 40px;
        border-top: 1px solid rgb(233, 232, 229)
      }
      .feedback-row-label {
        min-width: 20%;
      }
      .feedback-row-slider {
        min-width: calc(80% - 80px);
        margin: 0px 0px 32px 80px;
        font-size: 0.8rem;
      }
    `}</style>
    </div>

  )
}

export default function FeedbackSingle() {


  return (
    <div>
      <CustomSlider name="confident" label="Confident"/>
      <CustomSlider name="articulate" label="Articulate"/>
      <CustomSlider name="positive" label="Upbeat"/>
      <CustomSlider name="relatable" label="Relatable"/>
      <CustomSlider name="focused" label="Focused"/>
      <CustomSlider name="capable" label="Capable"/>
      <CustomSlider name="experienced" label="Experienced"/>
      <CustomSlider name="insightful" label="Insightful"/>
    </div>
  )
}