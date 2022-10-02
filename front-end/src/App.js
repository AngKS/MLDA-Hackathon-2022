import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from "./pages/LandingPage";
import { ChatPage } from './pages/ChatPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chatroom" element={<ChatPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
