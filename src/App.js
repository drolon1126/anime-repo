import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/navBar';
import AllSeasons from './components/allSeasons';
import WeeklySchedule from './components/weeklySchedule';
import SeasonArchive from './components/seasonArchive';

function App() {
  return (
    <div className="App">
      <NavBar/>

      <Route exact path="/"	component = {WeeklySchedule}/>
      <Route path="/archive"	component = {SeasonArchive}/>
      <Route path="/test/:selection"	component = {AllSeasons}/>

    </div>
  );
}

export default App;
