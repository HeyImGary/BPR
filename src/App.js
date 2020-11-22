import React, { useState } from "react";
import "./index.css";

import Home from "./pages/home";
import Recipe from "./pages/recipe";
import AddPost from "./pages/addPost";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Register from "./pages/register";

import Container from "@material-ui/core/Container";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from "./contect/userContect";
import AppBarComponent from "./components/appBar";
import "./App.css";

function App() {
  const [user, setUser] = useState(undefined);

  return (
    <React.StrictMode>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <AppBarComponent />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />

              <Route path="/recipe/:recipeId" component={Recipe} />

              <Route path="/addPost" component={AddPost} />

              <Route path="/profile/:id" component={Profile} />

              <Route path="/login" component={Login} />

              <Route path="/register" component={Register} />
            </Switch>
          </Container>
        </UserContext.Provider>
      </Router>
    </React.StrictMode>
  );
}

export default App;
