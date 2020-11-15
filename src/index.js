import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/home";
import Blog from "./pages/blog";
import reportWebVitals from "./reportWebVitals";

import Container from "@material-ui/core/Container";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Container>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/blog/:blogId">
            <Blog />
          </Route>
        </Switch>
      </Container>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
