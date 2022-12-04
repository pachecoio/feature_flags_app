import Layout from "./layout/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FeatureFlagsPage from "./pages/FeatureFlagsPage";
import EnvironmentsPage from "./pages/EnvironmentsPage";
import FeatureFlagPage from "./pages/FeatureFlagPage";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import AddFeatureFlagPage from "./pages/AddFeatureFlagPage";
import AddEnvironmentPage from "./pages/AddEnvironment";
import {AlertProvider} from "./AlertProvider";
import EnvironmentPage from "./pages/EnvironmentPage";
import AddEnvironmentFeatureFlagPage from "./pages/AddEnvironmentFeatureFlagPage";
import SupportPage from "./pages/SupportPage";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <AlertProvider>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={"/"} element={<FeatureFlagsPage />} />
            <Route path={"/:id"} element={<FeatureFlagPage />} />
            <Route path={"/add"} element={<AddFeatureFlagPage />} />
            <Route path={"/environments"} element={<EnvironmentsPage />} />
            <Route path={"/environments/:id/flags/add"} element={<AddEnvironmentFeatureFlagPage />} />
            <Route path={"/environments/:id"} element={<EnvironmentPage />} />
            <Route path={"/environments/add"} element={<AddEnvironmentPage />} />
            <Route path={"/support"} element={<SupportPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
    </AlertProvider>
  )
}

export default App
