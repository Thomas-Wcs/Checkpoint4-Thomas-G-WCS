import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AdminPanel from "./components/adminPannel/AdminPanel";
import Header from "./components/Header/Header";
import ConnectionPage from "./components/User/ConnectionPage";
import Profile from "./components/User/Profile";
import Home from "./pages/Home";
import AuthContext from "./context/AuthContext";

function App() {
  const [success, setSuccess] = useState(true);

  return (
    <div className="App">
      <AuthContext.Provider value={{ success, setSuccess }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connexion" element={<ConnectionPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/adminPanel/*" element={<AdminPanel />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
