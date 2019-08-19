import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import AllAiring from './components/allAiring';
import WeeklySchedule from './components/weeklySchedule';

function App() {
  return (
    <div className="App">
      <h1 style={{marginTop:0}}>Currently Airing Animu!</h1>
      
      <Route exact path="/"	component = {WeeklySchedule}/>

    </div>
  );
}

export default App;
