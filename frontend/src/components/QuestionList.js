import React, { useEffect, useState, memo, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  const memoizedQuestions = useMemo(() => {
    return questions.map(question => (
      <QuestionRow key={question.id} question={question} />
    ))
  }, [questions]);

  useEffect(() => {
    const cachedQuestions = localStorage.getItem('cachedQuestions');
    if (cachedQuestions) {
      setQuestions(JSON.parse(cachedQuestions));
    } else {
      const startTime = Date.now();
      axios.get('http://127.0.0.1:8000/polls/questions/')
        .then(res => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          console.log(`Response time: ${responseTime}ms`);
          const questions = res.data;
          localStorage.setItem('cachedQuestions', JSON.stringify(questions));
          setQuestions(questions);
        })
        .catch(err => { console.log(err) })
    }
  }, []);

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