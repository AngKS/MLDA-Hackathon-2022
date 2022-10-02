import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from "./pages/LandingPage";
import { ChatPage } from './pages/ChatPage';
import {useState} from 'react'

function App() {

  const [userName, setUserName] = useState('')
  const [selectedMood, setSelectedMood] = useState('')

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage username={userName} setUsername={setUserName} userMood={selectedMood} setUserMood={setSelectedMood}/>} />
          <Route path="/chatroom" element={<ChatPage username={userName} setUsername={setUserName} userMood={selectedMood} setUserMood={setSelectedMood} />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
