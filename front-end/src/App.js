import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from "./pages/LandingPage";
import { ChatPage } from './pages/ChatPage';
import { ChatPage2 } from './pages/ChatPage copy';
import {useState} from 'react'

import IMAGE from "./assets/LOGO.png"

function App() {

  const [userName, setUserName] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [toxicity, setToxicity] = useState(null)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/"  toxicity={toxicity} setToxicity={setToxicity} element={<LandingPage username={userName} setUsername={setUserName} userMood={selectedMood} setUserMood={setSelectedMood}/>} />
          <Route path="/chatroom" toxicity={toxicity} setToxicity={setToxicity}  element={<ChatPage username={userName} setUsername={setUserName} userMood={selectedMood} setUserMood={setSelectedMood} />} />
          <Route path="/chatroom2" element={<ChatPage2 username={userName} setUsername={setUserName} userMood={selectedMood} setUserMood={setSelectedMood} />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
