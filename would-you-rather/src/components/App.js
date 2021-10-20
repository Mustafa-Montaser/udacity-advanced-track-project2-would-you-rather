import React, { useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { fetchInitialData } from "../redux/initial/initialActions";

import NavHeader from "./NavHeader";
import Home from './Home';
import Loading from "./Loading";
import NewQuestion from './NewQuestion';
import leaderboard from './leaderBoard';
import Vote from './Vote';
import NotFound from './NotFound';

const App = ({ isLoading, fetchInitialData}) => {
    useEffect(() => fetchInitialData(), [fetchInitialData]);
    return (
        <>
            {
                isLoading
                ? <Loading />
                : (
                    <>
                        <NavHeader />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/add" component={NewQuestion} />
                            <Route path="/leaderboard" component={leaderboard} />
                            <Route path="/question/:id" component={Vote} />
                            <Route path="/notFound" component={NotFound} />
                            <Redirect to="/notFound" />
                        </Switch>
                    </>
                )
            }
        </>
    );
};

const mapStateToProps = (state) => ({
    isLoading: state.initial.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    fetchInitialData: () => dispatch(fetchInitialData()),
}); 

export default connect(mapStateToProps, mapDispatchToProps)(App);
