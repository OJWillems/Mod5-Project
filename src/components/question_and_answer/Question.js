import React, {Component} from 'react';

import AnswerForm from './AnswerForm'

class Question extends Component {

  state = {
    questionAsked: false,
    questionAnswered: 0
  }

  questionAnsweredHandler = () => {
    this.setState({
      questionAnswered: this.state.questionAnswered + 1
    })
  }

  handleQuestionAskedState = () => {
    this.setState({questionAsked: true})
  }

  returnQuestions = () => {
    if (this.state.questionAnswered < 1) {
      return (
        <div>
          {this.props.questionObj.question_response}
          <br/>
          <button name="answer question" onClick={() => this.handleQuestionAskedState()} >Answer Question</button>
          <AnswerForm questionAsked={this.state.questionAsked} questionObj={this.props.questionObj} questionAnsweredHandler={this.questionAnsweredHandler}/>
          <button name="delete question" >Delete Question</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.returnQuestions()}
      </div>
    )
  }

}

export default Question;
