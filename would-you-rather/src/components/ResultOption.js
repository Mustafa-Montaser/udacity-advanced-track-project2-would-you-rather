import React from "react";
import "../style/resultOption.css";

const getOptionsText = (_initial, _qId) => ({
    optionOne: _initial.questions[_qId].optionOne.text,
    optionTwo: _initial.questions[_qId].optionTwo.text
});
const calcVotes = (_initial, _qId, _option) => parseInt(_initial.questions[_qId][_option].votes.length);
const calcRatio = (_initial, _qId, _option) => (
    (calcVotes(_initial, _qId, _option) / (calcVotes(_initial, _qId, "optionOne") + calcVotes(_initial, _qId, "optionTwo"))).toFixed(4)
);
const calcTextRatio = (_initial, _qId, _option) => (
    calcVotes(_initial, _qId, _option) + " of " + (calcVotes(_initial, _qId, "optionOne") + calcVotes(_initial, _qId, "optionTwo"))
);

// main component function
const ResultOption = ({ initial, qId, op, userAnswer }) => {
    return (
        <div className="result-option">
            <div className={userAnswer === op ? "selected active" : "selected"}>Your Choice</div>
            <p>{getOptionsText(initial, qId)[op]}</p>
            <div className="progress-container">
                <span>{100 * calcRatio(initial, qId, op)} %</span>
                <div className="progress" style={{width: 210 * calcRatio(initial, qId, op)}} ></div>
            </div>
            <p>{calcTextRatio(initial, qId, op)}</p>                                        
        </div>
    )
}

export default ResultOption;
