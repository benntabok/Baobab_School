import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './Pages/Home';
import Dashboard from './pages/Dashboard';
import Lab from './pages/Lab';
import Navbar from './Components/Layout/Navbar';

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/lab" element={<Lab />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;