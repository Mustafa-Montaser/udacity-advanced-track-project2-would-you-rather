import React from "react";
import { connect } from "react-redux";

import Login from "./Login";

import "../style/leaderBoard.css";

const gettingUsers = (initial) => {
    const users = Object.keys(initial.users).map(user => ({
        name: initial.users[user].name,
        numberOfAnswers: Object.keys(initial.users[user].answers).length,
        numberOfQuestions: Object.keys(initial.users[user].questions).length,
        score: Object.keys(initial.users[user].answers).length + Object.keys(initial.users[user].questions).length,
        avatar: initial.users[user].avatarURL
    })).sort((a, b) => {
        if(a.score > b.score) return -1;
        else if(a.score < b.score) return 1;
        else return 0;
    });
    return users;
}

// main component function
const leaderboard = ({ initial }) => {
    return (
        <>
            {
                initial.isLogin
                ? (
                    <div className="leaderBoard">
                        {
                            gettingUsers(initial).map(user => (
                                <div className="content" key={user.name}>
                                    <div>
                                        <img src={user.avatar} alt="avatar" />
                                    </div>
                                    <div>
                                        <p>{user.name}</p>
                                        <div>
                                            <span>Number of questions</span>
                                            <span>{user.numberOfQuestions}</span>
                                        </div>
                                        <div>
                                            <span>Number of answers</span>
                                            <span>{user.numberOfAnswers}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p>Score</p>
                                        <p>{user.score}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
                : <Login />
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    initial: state.initial,
});

export default connect(mapStateToProps, null)(leaderboard);
