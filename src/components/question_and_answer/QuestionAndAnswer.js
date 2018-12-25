import React, {Component} from 'react';

class QuestionAndAnswer extends Component {

  state = {
    answerObject: null,
  }

  questionAnswerAPI = `http://localhost:4000/api/v1/questions/${this.props.questionObj.id}/answer`

  fetchAnswer = () => {
    fetch(this.questionAnswerAPI)
      .then(resp => resp.json())
      .then(answerResp => this.setState({answerObject: answerResp}, () => console.log("answer Object: ", this.state.answerObject)))
  }

  componentDidMount() {
    this.fetchAnswer()
  }

  renderAnswer = () => {
    if (this.state.answerObject != null) {
      console.log('answer OBJJJ : asdfasdf', this.state.answerObject)
      console.log(this.state.answerObject.answer.answer_response)
      return (
        <div>
          <p>{this.props.questionObj.question_response}</p>
          <p>{this.state.answerObject.answer.answer_response}</p>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        {this.renderAnswer()}
      </div>

    )
  }

}

export default QuestionAndAnswer;
