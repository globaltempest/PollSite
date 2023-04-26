import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class QuestionList extends React.Component {
    state = {questions: [],}

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/polls/questions/')
        .then(res => {
          console.log(res); // log the response object to the console
          const questions = res.data;
          this.setState({ questions });
        })
        .catch(err => {console.log(err)})
      }
    
      render() {
        return (
          <div>
            <h2>Questions</h2>
            <ul>
              {this.state.questions.map(question =>
                <li key={question.id}>
                    <Link to={`/questions/${question.id}`}>{question.question_text}</Link>
                </li>
              )}
            </ul>
          </div>
        );
      }
}
export default QuestionList;