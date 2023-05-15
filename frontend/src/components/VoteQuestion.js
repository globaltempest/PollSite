import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import QuestionResults from './QuestionResults';

function VoteQuestion() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
  
    useEffect(() => {
      const startTime = Date.now();
      axios.get(`http://127.0.0.1:8000/polls/questions/${id}/`)
        .then(res => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          console.log(`Response time: ${responseTime}ms`);
          setQuestion(res.data);
        })
        .catch(err => { })
    }, [id]);
  
    const handleSubmit = useCallback((e) => {
      e.preventDefault();
      if (!selectedChoice) {
        return;
      }
  
      const startTime = Date.now();
      axios.post(`http://127.0.0.1:8000/polls/questions/${id}/vote/`, { choice: selectedChoice })
        .then(res => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          console.log(`Response time: ${responseTime}ms`);
          setHasVoted(true);
          setQuestion(res.data);
        })
        .catch(err => { console.log(err) })
    }, [id, selectedChoice]);
  
    const handleChoiceChange = useCallback(e => {
        setSelectedChoice(e.target.value);
    }, []);
  
    const memoizedComponent = useMemo(() => {
      if (!question) {
        return <div>Loading ...</div>
      }
  
      if (hasVoted) {
        return <QuestionResults question={question} />
      }
  
      return (
        <div>
          <header className="text-center display-1 font-weight-bold title mt-5">{question.question_text}</header>
          <div className="d-flex align-items-center justify-content-center mt-5">
            <form onSubmit={handleSubmit}>
              <ul className='list-unstyled'>
                {question.choices.map(choice => (
                  <li key={choice.id}>
                    <label>
                      <input type='radio' name='choice' value={choice.id} onChange={handleChoiceChange} />
                      <span style={{ marginLeft: '10px', font: '1.2rem' }}>{choice.choice_text}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <button type='submit' className='btn btn-dark btn-lg'>Vote</button>
            </form>
          </div>
        </div>
      );
    }, [question, hasVoted, handleSubmit, handleChoiceChange]);
  
    return memoizedComponent;
  }
  
  export default VoteQuestion;