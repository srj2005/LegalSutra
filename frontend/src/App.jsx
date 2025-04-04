import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import DocumentUpload from "./pages/DocumentUpload";
import SummaryGeneration from "./pages/SummaryGenerator";
import RiskAnalysis from "./pages/RiskAnalysis";
import Profile from "./pages/Profile";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized"

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {user && <Navbar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />  {/* Add this route */}

          {/* Redirect unauthenticated users */}
          {user ? (
            <>
              <Route path="/" element={<Navigate to={`/home/${user.displayName}`} />} />
              <Route
                path="/home/:username"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload/:username"
                element={
                  <ProtectedRoute>
                    <DocumentUpload />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/summary/:username/:documentId"
                element={
                  <ProtectedRoute>
                    <SummaryGeneration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analysis/:username/:documentId"
                element={
                  <ProtectedRoute>
                    <RiskAnalysis />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/:username"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
