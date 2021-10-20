import React from "react";
import { connect } from "react-redux";

import Login from './Login';

const NotFound = ({ isLogin }) => {
    return (
        <>
            {
                isLogin
                ? (
                    <h1>error 404 not found</h1>
                )
                : <Login />
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    isLogin: state.initial.isLogin,
});

export default connect(mapStateToProps, null)(NotFound);
