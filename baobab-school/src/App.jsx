import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Lab from './Pages/Lab';
import Login from './Pages/Login'; // You'll create this next
import CoursePageWrapper from './Pages/CoursePageWrapper';

// Components
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/Auth/ProtectedRoute'; // The Gatekeeper

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes: Locked behind the Gatekeeper */}
          <Route 
            path="/dashboard/:id" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/lab" 
            element={
              <ProtectedRoute>
                <Lab />
              </ProtectedRoute>
            } 
          />

          <Route path="/course/:courseId" element={<CoursePageWrapper />} />

          {/* Fallbacks & Redirects */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/amos-01" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;