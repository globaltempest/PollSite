import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import QuestionList from './components/QuestionList';
import QuestionDetail from './components/QuestionDetail';
import VoteQuestion from './components/VoteQuestion';

function App() {
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route exact path='/' Component={QuestionList}/>
          <Route exact path='/questions/:id' Component={QuestionDetail}/>
          <Route exact path='/questions/:id/vote/' Component={VoteQuestion}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;