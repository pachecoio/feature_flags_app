import Layout from "./layout/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FeatureFlagsPage from "./pages/FeatureFlagsPage";
import Environments from "./pages/Environments";
import FeatureFlagPage from "./pages/FeatureFlagPage";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={"/"} element={<FeatureFlagsPage />} />
            <Route path={"/:id"} element={<FeatureFlagPage />} />
            <Route path={"/environments"} element={<Environments />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
