import React from "react";
import { connect } from "react-redux";

import { addNewQuestion } from "../redux/initial/initialActions";

import Login from "./Login";

import logo from "../images/logo.png";

import "../style/newQuestion.css";


const createNewQuestion = async (e, _addNewQuestion, _userId, _history) => {
    e.preventDefault();
    await _addNewQuestion({
        optionOneText: document.getElementById("textOp1").value,
        optionTwoText: document.getElementById("textOp2").value,
        author: _userId,
    });
    _history.push("/");
}

// main component function
const NewQuestion = ({ initial, addNewQuestion, userInfo, history }) => {
    return (
        <>
            {
                initial.isLogin
                ? (
                    <div className="new-question">
                        <p>Create New Question</p>
                        <img src={logo} alt="logo" />
                        <form onSubmit={(e) => createNewQuestion(e, addNewQuestion, userInfo.id, history)}>
                            <input type="text" id="textOp1" placeholder="Enter first question" />
                            <p>OR</p>
                            <input type="text" id="textOp2" placeholder="Enter second question" />
                            <button type="submit">Submit Your Questions</button>
                        </form>
                    </div>
                )
                : <Login />
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    initial: state.initial,
    userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
    addNewQuestion: (questioninfo) => dispatch(addNewQuestion(questioninfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
