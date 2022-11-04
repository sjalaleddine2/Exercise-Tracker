import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import {useState} from 'react'
import Navigation from './components/Navigation'

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <header>
            <h1>
              Exercises
            </h1>
            <p>
              Full Stack MERN App
            </p>
          </header>
          <Navigation></Navigation>
          <Route path="/" exact>
            <HomePage setExerciseToEdit = {setExerciseToEdit}  />
          </Route>
          <Route path="/add-exercise">
            <AddExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit = {exerciseToEdit} />
          </Route>
          </div>
      </Router>
      <p></p>
      <footer>
          © 2022 Salim Jalaleddine
          </footer>
    </div>
    
  );
}

export default App;