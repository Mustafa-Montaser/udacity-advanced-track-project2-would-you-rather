import React from "react";
import { Link } from "react-router-dom"

import "../style/question.css";

const Question = ({ author, avatarURL, option, buttonText, questionId }) => {
    return(
        <div className="question">
            <p>{author + " > asks"}</p>
            <div className="content">
                <img src={avatarURL} alt="avatar" />
                <div>
                    <p>Would You Rather</p>
                    <p>{option}</p>
                    <Link className="button" to={`/question/${questionId}`} >{buttonText}</Link>                    
                </div>
            </div>
        </div>
    )
}

export default Question;