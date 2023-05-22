import React, { useEffect, useState, memo, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cacheQuestions, getCachedQuestions } from './CacheAccess';

function QuestionList() {
  // state variable to hold questionlist
  const [questions, setQuestions] = useState([]);

  // memoized questionlist to reduce rendering, when questions array changes -> memoized value updated
  const memoizedQuestions = useMemo(() => {
    return questions.map(question => (
      <QuestionRow key={question.id} question={question} />
    ))
  }, [questions]);

  useEffect(() => {
    // gets cached questions
    const cachedQuestions = getCachedQuestions();
    // set questionlist if questions exists, else make api call to get and cache questions 
    if (cachedQuestions) {
      setQuestions(cachedQuestions);
    } else {
      // GET request for question list
      axios.get('http://127.0.0.1:8000/polls/questions/')
        .then(res => {
          const questions = res.data;
          cacheQuestions(questions);
          setQuestions(questions);
        })
        .catch(err => { console.log(err) })
    }
  }, []);

  // displays the question list with links to get to each question
  return (
    <div className='container-fluid mt-4 row justify-content-center'>
      <header className="text-center display-1 font-weight-bold title ">Questions</header>
      <table className="table table-hover table-responsive caption-top text-center w-50 mt-5">
        <caption className='text-center'><h1>Polls</h1></caption>
        <tbody className='table-group-divider '>
          {memoizedQuestions}
        </tbody>
      </table>
    </div>
  );
}

// link each memoized question from list, if props change -> re-render
const QuestionRow = memo(({ question }) => {
  return (
    <tr>
      <td>
        <Link to={`/${question.id}/vote/`}>{question.question_text}</Link>
      </td>
    </tr>
  );
});

export default QuestionList;