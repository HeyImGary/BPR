import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Home from "./pages/home";
import Blog from "./pages/blog";
import AddPost from "./pages/addPost";
import Profile from "./pages/profile";

import reportWebVitals from "./reportWebVitals";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./contect/userContect";
import AppBarComponent from "./components/appBar";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppBarComponent />
      <Container>
        <UserContext.Provider value="Hello from context">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/blog/:blogId">
              <Blog />
            </Route>
            <Route path="/addPost">
              <AddPost />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </UserContext.Provider>
      </Container>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
