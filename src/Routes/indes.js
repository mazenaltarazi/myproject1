import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateGamePage from '../Pages/CreateGame/CreatGame';
import WaitingPage from '../Pages/Lobby/WaitingPage';
import Container from '../Pages/GamePlay/Container';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { ListGame } from '../Pages/ListGame';

import WinnerPage from '../Pages/Endgame';


const RoutesComponont = () => {
  return (
    <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ListGame />} />
        <Route path="/Create" element={<CreateGamePage />} />

        <Route path="/Winner/:id" element={<WinnerPage />} />
        <Route path="/waiting/:id" element={<WaitingPage />} />
        
        
        <Route path="/Container/:id" element={<Container />} />
        <Route path="/Container/:id/:Creator" element={<Container />} />

      </Routes>
      <Footer />
    </div>
  </Router>
  )
}

export default RoutesComponont