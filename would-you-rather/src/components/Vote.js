import React, { useEffect } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import "../style/vote.css";
import ResultOption from "./ResultOption";
import { Redirect } from "react-router-dom";
import { saveSubmitVote, fetchInitialData } from "../redux/initial/initialActions";
import { getUserInfo } from "../redux/user/userActions";

const getName = (_initial, _qId) => _initial.users[_initial.questions[_qId].author].name;
const getAvatar = (_initial, _qId) => _initial.users[_initial.questions[_qId].author].avatarURL;
const getOptionsText = (_initial, _qId) => ({
    optionOne: _initial.questions[_qId].optionOne.text,
    optionTwo: _initial.questions[_qId].optionTwo.text
});

const submitVote = async (e, _saveSubmitVote, _userInfo, _qId) => {
    e.preventDefault();
    const answer = document.querySelector('input[name="options"]:checked').id;
    await _saveSubmitVote({
        authedUser: _userInfo.id,
        qid: _qId,
        answer: answer
    });
}

// main component function
const Vote = ({ match, initial, userInfo, saveSubmitVote, fetchInitialData, getUserInfo }) => {
    useEffect(() => 
        initial.isLogin ? getUserInfo(initial.users[userInfo.id]) : null, 
        [getUserInfo, initial.users, userInfo.id, initial.isLogin]
    );
    const qId = match.params.id;
    const isQuestionExists = qId in initial.questions;
    let isQuestionAnswered, userAnswer;
    if(initial.isLogin) {
        isQuestionAnswered = Object.keys(userInfo.answers).includes(qId);
        userAnswer = initial.users[userInfo.id].answers[qId];
    }
    return (
        <>
            {
                initial.isLogin 
                ? isQuestionExists
                ? !isQuestionAnswered
                ? (
                    <form className="vote" onSubmit={(e) => submitVote(e, saveSubmitVote, userInfo, qId, initial, fetchInitialData, getUserInfo)}>
                        <p>{getName(initial, qId)} asks ... </p>
                        <div>
                            <img src={getAvatar(initial, qId)} alt="avatar" />
                            <div>
                                <p>Would You Rather</p>
                                <div>
                                    <input type="radio" id="optionOne" name="options" value={getOptionsText(initial, qId).optionOne} defaultChecked />
                                    <label htmlFor="optionOne">{getOptionsText(initial, qId).optionOne}</label>
                                </div>
                                <div>
                                    <input type="radio" id="optionTwo" name="options" value={getOptionsText(initial, qId).optionTwo} />
                                    <label htmlFor="optionTwo">{getOptionsText(initial, qId).optionTwo}</label>
                                </div>
                                <button type="submit">Submit Vote</button>
                            </div>
                        </div>
                    </form>
                )
                : (
                    <div className="voted">
                        <p>{getName(initial, qId)}</p>
                        <div>
                            <img src={getAvatar(initial, qId)} alt="avatar" />
                            <div className="content">
                                <p>Result</p>
                                <ResultOption initial={initial} qId={qId} op="optionOne" userAnswer={userAnswer} />
                                <ResultOption initial={initial} qId={qId} op="optionTwo" userAnswer={userAnswer} />
                            </div>
                        </div>
                    </div>
                )
                : <Redirect to="/notFound" />
                : <Login />
            }
        </>
        
    )
}

const mapStateToProps = (state) => ({
    initial: state.initial,
    userInfo: state.user.userInfo
});

const mapDispatchToProps = (dispatch) => ({
    saveSubmitVote: (ansInfo) => dispatch(saveSubmitVote(ansInfo)),
    fetchInitialData: () => dispatch(fetchInitialData()),
    getUserInfo: (info) => dispatch(getUserInfo(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
