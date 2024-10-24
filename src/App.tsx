import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestOperations from "./pages/Test";
import { TenantProvider } from "./context/TenantProvider";
import { ProjectProvider } from "./context/ProjectProvider";
import SignupPage from "./components/Signup";
import LoginPage from "./components/Login";

function App() {
  return (
    <TenantProvider>
      <ProjectProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={
                <Home />
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/dashboard"
                element={
                  <div>dashboard</div>
                }
              />
              <Route
                path="/project/:id"
                element={
                  <div>project</div>
                }
              />
              <Route
                path="/test"
                element={
                  <TestOperations />
                }
              />
            </Routes>
          </div>
        </Router>
      </ProjectProvider>
    </TenantProvider>
  );
}

export default App;
