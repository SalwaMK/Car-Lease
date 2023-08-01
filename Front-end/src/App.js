import "./App.css";
//import axios from 'axios';
//import { UNSAFE_useRouteId } from 'react-router-dom';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Maison from "./components/Maison";
import Profile from "./components/Profile";
import Reservation from "./components/Reservation";
import Sign from "./components/Sign";
import SignIn from "./components/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Maison />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/reservation/:id" element={<Reservation />} />
      </Routes>
    </Router>
  );
}

export default App;
