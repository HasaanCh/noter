import './App.css';
import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Navbar from "./components/navbar.component";
import NoteList from "./components/notes.component";
function App() {
  return (
    <Router>
<Navbar/>
    <Route path="/" exact component={NoteList}/>


  
</Router>
  );
}

export default App;
