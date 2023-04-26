import React from 'react';
import {Link} from 'react-router-dom';

function QuestionResults({question}) {
    const totalVotes = question.choices.reduce((acc, choice) => acc + choice.votes, 0);

    return (
        <div>
            <h2>{question.question_text}</h2>
            <ul>
                {question.choices.map(choice => (
                    <li key={choice.id}>
                        {choice.choice_text}: {choice.votes} vote{choice.votes !== 1 && 's'} ({((choice.votes / totalVotes) * 100).toFixed(2)}%)
                    </li>
                ))}
            </ul>
            <Link to='/questions'>Back to question list</Link>
        </div>
    );
}

export default QuestionResults;