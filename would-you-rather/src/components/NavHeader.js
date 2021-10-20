import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faQuestionCircle, faTrophy } from "@fortawesome/free-solid-svg-icons";

import user from "../images/user.png";

import { changeLoginState } from "../redux/initial/initialActions";

import "../style/navHeader.css";

const setActive = (e) => {
    Array.from(document.getElementsByTagName("li")).map(li => li.children[0].classList.remove("active"));
    e.target.classList.add("active");
}

const pathName = window.location.pathname.slice(1);

const NavHeader = ({ isLogin, changeLoginState, userInfo }) => {
    return (
        <header>
            <div className="logo">Would You Rather</div>
            <ul>
                <li>
                    <Link className={pathName === "" || pathName.includes("question") ? "link active" : "link"} to="/" onClick={(e) => setActive(e)}>
                        <FontAwesomeIcon className="home-icon" icon={faHome} /> Home
                    </Link>
                </li>
                <li>
                    <Link className={pathName === "add" ? "link active" : "link"} to="/add" onClick={(e) => setActive(e)} >
                        <FontAwesomeIcon icon={faQuestionCircle} /> New Question
                    </Link>
                </li>
                <li>
                    <Link className={pathName === "leaderboard" ? "link active" : "link"} to="/leaderboard" onClick={(e) => setActive(e)} >
                        <FontAwesomeIcon icon={faTrophy} /> Leader Board
                    </Link>
                </li>
            </ul>
            <div className="user">
                <span id="userName">{isLogin ? userInfo.name : "hello, user"}</span>
                <img id="userImg" src={isLogin ? userInfo.avatarURL : user} alt="avatar"/>
                {isLogin ? <button onClick={() => changeLoginState(false)}>Logout</button> : null}
            </div>
        </header>
    );
}

const mapStateToProps = (state) => ({
    isLogin: state.initial.isLogin,
    userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
    changeLoginState: (isLogin) => dispatch(changeLoginState(isLogin)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);

