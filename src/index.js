import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import BPMPage from "./operationPage/BPMPage";
import logo from "./Assests/logo.jpg";
import "./Fonts/Lato/Lato-Regular.ttf";

const NavBar = () => { //TODO:delete the "" from the logo
  return (
    <>
      <div className="topnav">
        <img className="logo" src={logo} alt="" width="70" height="81" /> 
        <h2>Pais BPM Administrator</h2>
      </div>
    </>
  );
};

ReactDOM.render(
  <div className="main">
    <NavBar></NavBar>
    <Router>
      <Switch>
        <Route exact path="/" component={BPMPage}></Route>
        <Route exact path="/bp" component={BPMPage}></Route>
      </Switch>
    </Router>
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
