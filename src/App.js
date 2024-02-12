import logo from "./logo.svg";
import "./App.css";

// import { app } from "./Firebase.js";
import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import DataTest from "./DataTest";
import UIDProfilePage from "./UIDProfilePage";

import UIDContextProvider from "./ContextProvider";
import DummyDataTest from "./DummyDataTest";
function App() {
  return (
    <UIDContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/WelcomeScreen" element={<WelcomeScreen />}></Route>

          <Route path="/UIDProfilePage" element={<UIDProfilePage />}></Route>
          {/* <Route path="/Maps" element={<Maps></Maps>}></Route> */}

          {/* <Route
            path="/UIDProfilePage/*"
            element={<UIDProfilePage></UIDProfilePage>}
          ></Route> */}
          <Route
            path="/DummyDataTest"
            element={<DummyDataTest></DummyDataTest>}
          />
        </Routes>
      </Router>
    </UIDContextProvider>
  );
}

export default App;
