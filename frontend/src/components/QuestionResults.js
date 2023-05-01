import React from 'react';
import {Link} from 'react-router-dom';

function QuestionResults({question}) {
    const totalVotes = question.choices.reduce((acc, choice) => acc + choice.votes, 0);

    return (
        <div>
            <header className="text-center display-1 font-weight-bold title mt-5">Results</header>
            <div className="text-center mt-5">
                <ul className='list-unstyled'>
                    {question.choices.map(choice => (
                        <li key={choice.id}>
                            {choice.choice_text}: {choice.votes} vote{choice.votes !== 1 && 's'} ({((choice.votes / totalVotes) * 100).toFixed(2)}%)
                        </li>
                    ))}
                </ul>
                <a href="http://localhost:3000/" class="btn btn-dark btn-lg">Back to QuestionList</a>
            </div>
        </div>
    );
}

export default QuestionResults;