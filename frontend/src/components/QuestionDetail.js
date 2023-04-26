import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function QuestionDetail() {
    const {id} = useParams();
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/polls/questions/${id}/`)
        .then(res => {
            console.log(res.data)
            setQuestion(res.data);
        })
        .catch(err => {console.log(err)});
    }, [id]);

    if (!question) {
        return <div> Loading ...</div>
    }

    return (
        <div>
            <h2>{question.question_text}</h2>
            <ul>
                {question.choices.map(choice => (
                    <li key={choice.id}>{choice.choice_text}</li>
                ))}
            </ul>
        </div>
    )
}
export default QuestionDetail;