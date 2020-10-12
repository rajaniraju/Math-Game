import React from "react";

import "./App.css";
import Number from "./Number";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className="App">
          <h1 className="operand">Math Game</h1>
          <br />
          <Number
            secondNumber={0}
            operator={0}
            firstNumber={0}
            answer={0}
            value={0}
            totalPoints={0}
            questionNo={0}
            arr={[]}
            symbol={""}
          ></Number>
        </div>
      </div>
    );
  }
}
