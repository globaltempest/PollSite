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
          <div className='container-fluid mt-4 row justify-content-center'>
            <header className="text-center display-1 font-weight-bold title ">Questions</header>
            <table class="table table-hover table-responsive caption-top text-center w-50 mt-5">
              <caption className='text-center'><h1>Polls</h1></caption>
              <tbody className='table-group-divider '>
                {this.state.questions.map(question =>
                  <tr key={question.id}>
                    <td>
                      <Link to={`/${question.id}/vote/`}>{question.question_text}</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      }
}
export default QuestionList;

/*
<ul>
    {this.state.questions.map(question =>
      <li key={question.id}>
        <Link to={`/${question.id}/vote/`}>{question.question_text}</Link>
      </li>
    )}
              </ul>
*/