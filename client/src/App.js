import React, { Fragment } from "react";
// import logo from './logo.svg';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


//component
import Login from "./components/login";

function App() {
  return (
    <Fragment>
      <div className="container">
        <Login />
      </div>
    </Fragment>
  );
}

export default App;
