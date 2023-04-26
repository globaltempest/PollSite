import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import QuestionResults from './QuestionResults';

function VoteQuestion() {
    const {id} = useParams();
    const [question, setQuestion] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/polls/questions/${id}/`)
        .then(res => {
            setQuestion(res.data);
        })
        .catch(err => { })
    }, [id]);

    const handleSubmit = e => {
        e.preventDefault();
        if (!selectedChoice) {
            return;
        }

        axios.post(`http://127.0.0.1:8000/polls/questions/${id}/vote/`, {choice: selectedChoice})
        .then(res => {
            setHasVoted(true);
        })
        .catch(err => {console.log(err)})
    };

    const handleChoiceChange = e => {
        setSelectedChoice(e.target.value);
    };

    if (!question) {
        return <div>Loading ...</div>
    }

    if (hasVoted) {
        return <QuestionResults question={question}/>
    }

    return (
        <div>
            <h2>{question.question_text}</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    {question.choices.map(choice => (
                        <li key = {choice.id}>
                            <label>
                                <input type='radio' name='choice' value={choice.id} onChange={handleChoiceChange}/>
                                {choice.choice_text}
                            </label>
                        </li>
                    ))}
                </ul>
                <button type='submit'>Vote</button>
            </form>
        </div>
    );
}
export default VoteQuestion;