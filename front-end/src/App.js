import './App.css';

import IMAGE from "./assets/LOGO.png"
import { LandingPage } from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <img src={IMAGE} alt="LOGO" className="logo"/>
      <LandingPage />

    </div>
  );
}

export default App;
