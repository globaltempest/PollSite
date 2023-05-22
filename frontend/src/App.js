import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import QuestionList from './components/QuestionList';
import VoteQuestion from './components/VoteQuestion';

//routes for the application
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' Component={QuestionList}/>
          <Route exact path='/:id/vote/' Component={VoteQuestion}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;