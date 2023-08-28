import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateGamePage from '../Pages/CreateGame/CreatGame';
import WaitingPage from '../Pages/Lobby/WaitingPage';
import Container from '../Pages/GamePlay/Container';
import Header from '../Component/Header';
import Footer from '../Component/Footer';

const RoutesComponont = () => {
  return (
    <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<CreateGamePage />} />
        <Route path="/waiting" element={<WaitingPage />} />
        <Route path="/Container" element={<Container />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  )
}

export default RoutesComponont