import * as type from "./initialTypes";
import { _getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion } from "../../_DATA";

export const changeLoginState = (loginState = false) => ({
    type: type.LOGIN_STATE,
    payload: loginState,
});

export const getUsers = (users) => ({
    type: type.GET_USERS,
    payload: users,
});

export const getQestions = (questions) => ({
    type: type.GET_QUESTIONS,
    payload: questions,
});

export const changeLoadingState = (isLoading) => ({
    type: type.LOADING_STATE,
    payload: isLoading,
});

export const fetchInitialData = () => {
    return (dispatch) => {
        dispatch(changeLoadingState(true));
        _getUsers().then(res => dispatch(getUsers(res))); 
        _getQuestions().then(res => {
            dispatch(getQestions(res));
            dispatch(changeLoadingState(false));
        });       
    }
}

export const saveSubmitVote = ({ authedUser, qid, answer }) => {
    return (dispatch) => {
        dispatch(changeLoadingState(true));
        _saveQuestionAnswer({ authedUser, qid, answer }).then(res => {
            _getUsers().then(res => dispatch(getUsers(res))); 
            _getQuestions().then(res => {
            dispatch(getQestions(res));
            dispatch(changeLoadingState(false));
            });  
        });
    }
}

export const addNewQuestion = (questionInfo) => {
    return (dispatch) => {
        dispatch(changeLoadingState(true));
        _saveQuestion(questionInfo).then(res => {
            _getUsers().then(res => dispatch(getUsers(res))); 
            _getQuestions().then(res => {
            dispatch(getQestions(res));
            dispatch(changeLoadingState(false));
            });  
        })
    }
}
