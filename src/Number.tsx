import React from "react";
//import ReactDOM from 'react-dom';
import "./App.css";
//import { timeStamp } from "console";
type Props = {
  secondNumber: number;
  firstNumber: number;
  arr: any;
  symbol: any;
  operator: any;
  answer: number;
  value: number;
  totalPoints: number;
  questionNo: number;
};
type State = {
  secondNumber: number;
  firstNumber: number;
  arr: any;
  symbol: any;
  operator: any;
  answer: number;
  value: number;
  totalPoints: number;
  questionNo: number;
  question: String;
  gameOver: boolean;
  submit: boolean;
};

export default class Number extends React.Component<Props, State> {
  MAX_QN_COUNT: number = 10;
  constructor(props: any) {
    super(props);
    this.state = {
      secondNumber: 0,
      firstNumber: 0,
      arr: ["+", "-", "/", "*"],
      symbol: "",
      operator: "",
      answer: 0,
      value: 0,
      totalPoints: 0,
      questionNo: 0,
      question: "",
      gameOver: false,
      submit: false,
    };
    //console.log(this.state);
  }
  //setting question for one time;
  componentDidMount() {
    this.setNextQuestion();
  }

  //setting question each time;
  setNextQuestion() {
    let questionIndex = Math.floor(Math.random() * 3);
    let secondNumber = Math.floor(Math.random() * 1000);
    let firstNumber = Math.floor(Math.random() * 1000);
    let operator = this.state.arr[questionIndex];
    this.setState(
      {
        secondNumber: secondNumber,
        firstNumber: firstNumber,
        operator: operator,
        answer: 0,
        value: 0,
        submit: true,
        questionNo: this.state.questionNo + 1,
        question: this.getFormattedQuestion(
          firstNumber,
          operator,
          secondNumber
        ),
      },
      () => {}
    );
  }

  getFormattedQuestion = (lhs: number, operator: string, rhs: number) => {
    return `${lhs} ${operator} ${rhs}`;
  };

  //When Next button is clicked;
  onNextClicked = () => {
    if (this.state.questionNo < this.MAX_QN_COUNT) {
      // Game still continues.
      this.setNextQuestion();
    } else {
      // Game over
      this.setState({
        gameOver: true,
      });
    }
  };
  //when submit button is clicked;
  onSubmit = () => {
    if (this.state.submit) {
      this.checkAnswer();
    } else {
      this.onNextClicked();
    }
  };

  test1 = () => {
    this.setState(
      {
        secondNumber: 2,
        firstNumber: 3,
        operator: "+",
        answer: 0,
        value: 0,
      },
      () => {
        let answer = this.checkAnswer();
        let formattedQuestion = this.getFormattedQuestion(
          this.state.firstNumber,
          this.state.operator,
          this.state.secondNumber
        );
        console.log("test1:", formattedQuestion, answer);
        if (answer != 5) console.error("test1 failed");
        else console.log("test1 success");
      }
    );
  };
  test2 = () => {
    this.setState(
      {
        secondNumber: 3,
        firstNumber: 6,
        operator: "-",
        answer: 0,
        value: 0,
      },
      () => {
        let answer = this.checkAnswer();
        let formattedQuestion = this.getFormattedQuestion(
          this.state.firstNumber,
          this.state.operator,
          this.state.secondNumber
        );
        console.log("test2:", formattedQuestion, answer);
        if (answer != 3) console.error("test2 failed");
        else console.log("test2 success");
      }
    );
  };

  checkAnswer = () => {
    let answer = 0;
    if (this.state.operator === "+") {
      answer = this.state.firstNumber + this.state.secondNumber;
      console.log("operator" + this.state.operator, "answer" + answer);
    }
    if (this.state.operator === "-") {
      answer = this.state.firstNumber - this.state.secondNumber;
      console.log("operator" + this.state.operator, "answer" + answer);
    }
    if (this.state.operator === "*") {
      answer = this.state.firstNumber * this.state.secondNumber;
      console.log("operator" + this.state.operator, "answer" + answer);
    }
    if (this.state.operator === "/") {
      answer = this.state.firstNumber / this.state.secondNumber;
      console.log("operator" + this.state.operator, "answer" + answer);
    }
    // Calculate score
    let totalPoints = 0;

    if (this.state.value == answer) {
      totalPoints = this.state.totalPoints + 1;
    }

    this.setState({
      answer: answer,
      submit: false,
      totalPoints: totalPoints,
    });

    return answer;
  };

  //To get the value of text area when user enters something;
  onAnswerChanged = (event: any): void => {
    this.setState({ value: event.target.value });
  };

  onTestClicked = async () => {
    await this.test1();
    await this.test2();
    
    
  };

  // textarea:  bind to state;
  render() {
    return (
      <>
        {" "}
        <h2 className="question">
          Question:{this.state.questionNo} of {this.MAX_QN_COUNT}
        </h2>
        <h3 className="TotalPoints">
          {this.state.gameOver && (
            <div>Your Total Point is: {this.state.totalPoints}</div>
          )}
        </h3>
        <h1>{this.state.question}</h1>
       
        <br />
        <div>--------------------</div>
        <br />
        <textarea
          value={this.state.value}
          onChange={this.onAnswerChanged}
        ></textarea>
        <br />
        <br />
        <br />
        <button onClick={this.onSubmit} className="AnswerCheck">
          {this.state.submit ? "Submit" : "Next"}
        </button>
        <br />
        <br />
        <div className="CorrectAnswer">
          Correct Answer is:{this.state.answer}
        </div>
        {this.state.gameOver && (
          <div>Your Game is Over. Refresh for next Game.</div>
        )}
        <br />
        <div>
          <button onClick={this.onTestClicked}>Test</button>
        </div>
      </>
    );
  }
}
