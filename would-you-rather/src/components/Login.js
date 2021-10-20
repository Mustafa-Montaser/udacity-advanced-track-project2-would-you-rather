import React from "react";
import { connect } from "react-redux";

import { changeLoginState } from "../redux/initial/initialActions";
import { getUserInfo } from "../redux/user/userActions";

import "../style/login.css";

const submit = (e, _changeLoginState, _getUserInfo, _users) => {
    e.preventDefault();
    const userName = document.getElementById("user").value;
    const usersOptions = Array.from(document.getElementById("users").children);
    for(const userElement of usersOptions) {
        if(userName === userElement.value) {
            _changeLoginState(true);
            Object.keys(_users).map(user => _users[user].name === userName ? _getUserInfo(_users[user]) : null);
            return;
        } 
    }
    _changeLoginState(false);
    document.getElementById("error").style.display = "block";
}

const clearError = () => document.getElementById("error").style.display = "none";

// main component function
const Login = ({ users, changeLoginState, getUserInfo }) => {
    return (
        <div className="login">
            <form method="POST" onSubmit={(e) => submit(e, changeLoginState, getUserInfo, users)}>
                <div>
                    <p>Welcome to (Would You Rather) Game</p>
                    <p>Please sign in to continue</p>
                </div>
                <p>Sign In</p>
                <p>Choose your user name from below</p>
                <input list="users" id="user" name="users" onClick={clearError} />
                <datalist id="users">
                    {Object.keys(users).map(user => <option key={users[user].id} value={users[user].name} />)}
                </datalist>
                <p id="error">Please enter a valid username</p>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isLogin: state.initial.isLogin,
    users: state.initial.users
});

const mapDispatchToProps = (dispatch) => ({
    changeLoginState: (isLogin) => dispatch(changeLoginState(isLogin)),
    getUserInfo: (info) => dispatch(getUserInfo(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

