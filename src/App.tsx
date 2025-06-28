import { CssBaseline, ThemeProvider } from "@mui/material"
import { ColorModeContext, useMode } from "./theme"
import Approutes from "./routes/Approutes";

function App() {
  const { theme, colorMode } = useMode();    

  return (
     <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <div className="app">
              <main className="context">
                <Approutes />
              </main>
            </div>
            </ThemeProvider>
      </ColorModeContext.Provider>
  )
}

export default App
