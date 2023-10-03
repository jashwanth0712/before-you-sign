/* global chrome */
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import AuthSuccess from './pages/AuthSuccess';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './component/Navbar';
import { useEffect } from 'react';
import Highlighter from './pages/Highlighter';
import Search from './pages/search';
function App() {
  useEffect(() => {
    console.log('App mounted');
    console.log(localStorage.getItem('base64img'));
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/highlighter/:id" element={<Highlighter />} />
          {/* <Route path="/AuthSuccess" element={<AuthSuccess />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
