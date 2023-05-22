import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import QuestionResults from './QuestionResults';

function VoteQuestion() {
    const { id } = useParams(); //extract id from url 
    const [question, setQuestion] = useState(null); // state for storing question
    const [selectedChoice, setSelectedChoice] = useState(null); // state for storing selected choice
    const [hasVoted, setHasVoted] = useState(false); // state for checking if user voted
  
    useEffect(() => {
      //GET request for singluar question when id param changes
      axios.get(`http://127.0.0.1:8000/polls/questions/${id}/`)
        .then(res => {
          setQuestion(res.data);
        })
        .catch(err => { })
    }, [id]);
  
    // function to handle submission
    const handleSubmit = useCallback((e) => {
      e.preventDefault();
      // if no selected choice, do nothing
      if (!selectedChoice) {
        return;
      }
  
      //POST request to update vote count on selected choice for singular question
      axios.post(`http://127.0.0.1:8000/polls/questions/${id}/vote/`, { choice: selectedChoice })
        .then(res => {
          // update states after user voted
          setHasVoted(true); 
          setQuestion(res.data);
        })
        .catch(err => { console.log(err) })
    }, [id, selectedChoice]);
  
    // function to handle change event of choice input
    const handleChoiceChange = useCallback(e => {
        setSelectedChoice(e.target.value);
    }, []);
  
    // memoized rendering based on dependencies 
    const memoizedComponent = useMemo(() => {
      
      // if question doesnt exist
      if (!question) {
        return <div>Loading ...</div>
      }
  
      // if the choice has been voted on
      if (hasVoted) {
        return <QuestionResults question={question} />
      }
  
      // displays choices to input
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