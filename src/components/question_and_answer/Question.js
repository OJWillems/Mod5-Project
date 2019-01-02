import React, {Component} from 'react';

import AnswerForm from './AnswerForm'

import {Button} from 'semantic-ui-react';


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
          <h3>{this.props.questionObj.question_response}</h3>
          <Button color="blue" size="mini" name="answer question" onClick={() => this.handleQuestionAskedState()} >Answer Question</Button>
          <Button color="red" size="mini" name="delete question" >Delete Question</Button>
          <AnswerForm questionAsked={this.state.questionAsked} questionObj={this.props.questionObj} questionAnsweredHandler={this.questionAnsweredHandler}/>
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
