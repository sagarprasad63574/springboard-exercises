import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage.js";
import CompanyList from "../companies/CompanyList.js";
import JobList from "../jobs/JobList.js";
import CompanyDetail from "../companies/CompanyDetail.js";
import LoginForm from "../auth/LoginForm.js";
import ProfileForm from "../profiles/ProfileForm.js";
import SignupForm from "../auth/SignupForm.js";
import PrivateRoute from "./PrivateRoute.js";

function Routes({ login, signup }) {
    return (
        <div className="pt-5">
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>
                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route>
                <PrivateRoute exact path="/companies">
                    <CompanyList />
                </PrivateRoute>
                <PrivateRoute exact path="/jobs">
                    <JobList />
                </PrivateRoute>
                <PrivateRoute exact path="/companies/:handle">
                    <CompanyDetail />
                </PrivateRoute>
                <PrivateRoute path="/profile">
                    <ProfileForm />
                </PrivateRoute>
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default Routes;
