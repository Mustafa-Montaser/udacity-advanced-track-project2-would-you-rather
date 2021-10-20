import React from "react";
import { connect } from "react-redux";

import Login from "./Login";
import Question from "./Question"

import "../style/home.css";

const selectQuestionsType = (e) => {
    if(e.target.id === "UnansweredBtn") {
        document.getElementById("UnansweredBtn").classList.add("active");
        document.getElementById("answeredBtn").classList.remove("active");
        document.getElementById("unansweredQuestions").classList.add("active");
        document.getElementById("answeredQuestions").classList.remove("active");
    } else if(e.target.id === "answeredBtn") {
        document.getElementById("UnansweredBtn").classList.remove("active");
        document.getElementById("answeredBtn").classList.add("active");
        document.getElementById("unansweredQuestions").classList.remove("active");
        document.getElementById("answeredQuestions").classList.add("active");
    }

}

const compare = (a, b, initial) => {
    if(initial.questions[a].timestamp > initial.questions[b].timestamp) return -1;
    else if(initial.questions[a].timestamp < initial.questions[b].timestamp) return 1;
    else return 0;
}

const getQuestionsIds = (_initial, _userInfo) => {
    let answeredQuestionsIds = Object.keys(_userInfo.answers).sort((a, b) => compare(a, b, _initial));
    let unAnsweredQuestionsIds = Object.keys(_initial.questions).filter(question => !answeredQuestionsIds.includes(question)).sort((a, b) => compare(a, b, _initial));
    return ({ answeredQuestionsIds, unAnsweredQuestionsIds});
}

// main component function
const Home = ({ initial, userInfo }) => {
    return (
        <>
            {
                initial.isLogin
                ? (
                    <div className="home">
                        <div className="buttons">
                            <button id="UnansweredBtn" className="active" onClick={(e) => selectQuestionsType(e)}>Unanswered Questions</button>
                            <button id="answeredBtn" onClick={(e) => selectQuestionsType(e)}>Answered Questions</button>
                        </div>
                        <div className="questions active" id="unansweredQuestions">
                            {
                                getQuestionsIds(initial, userInfo).unAnsweredQuestionsIds.map(qId => 
                                    <Question 
                                        key={qId} 
                                        questionId={qId}
                                        author={initial.users[initial.questions[qId].author].name} 
                                        avatarURL={initial.users[initial.questions[qId].author].avatarURL}
                                        option={initial.questions[qId].optionOne.text}
                                        buttonText={"View And Vote"}
                                    />
                                )
                            }
                        </div>
                        <div className="questions" id="answeredQuestions">
                            {
                                getQuestionsIds(initial, userInfo).answeredQuestionsIds.map(qId => 
                                    <Question 
                                        key={qId} 
                                        questionId={qId}
                                        author={initial.users[initial.questions[qId].author].name} 
                                        avatarURL={initial.users[initial.questions[qId].author].avatarURL}
                                        option={initial.questions[qId][userInfo.answers[qId]].text}
                                        buttonText={"View Answer"}
                                    />
                                )
                            }
                        </div>
                    </div>
                )
                : <Login />
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    initial: state.initial,
    userInfo: state.user.userInfo,
});

export default connect(mapStateToProps, null)(Home);
