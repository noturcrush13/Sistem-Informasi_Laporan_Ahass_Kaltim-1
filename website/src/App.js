import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import LandingPage from './pages/Landing-Page';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from './pages/Login-Page';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
