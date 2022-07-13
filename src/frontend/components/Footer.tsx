import { useTheme } from "@mui/material"

export default function Footer() {
  const theme = useTheme()

  return (
      <footer className="styled-footer">
        <div><a
          href="https://github.com/jayeclark"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; 2022 Jay Clark
        </a> | Terms &amp; Conditions | Privacy</div>
      <style jsx>{`
        .styled-footer {
          font-size: 0.8rem; 
          color: rgb(0,0,0,0.6); 
          background-color: ${theme.palette.background.default};
          display: flex; 
          flex: 1; 
          padding: 1rem 0; 
          border-top: 1px solid #eaeaea;
          justify-content: center; 
          align-items: center;
        }
      `}</style>
      </footer>
  )
}