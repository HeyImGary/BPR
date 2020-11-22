import { useState, useContext } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import UserContext from "../contect/userContect";

function Login() {
  const [error, setError] = useState(true);
  const [requestSent, setRequest] = useState(false);

  const { setUser } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    let data = {
      username: e.target.username.value,
      password: e.target.password.value
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

    await fetch("http://localhost:3001/user/login", requestOptions)
      .then((res) => res.json())

      //.then((res) => setData(res.data))
      .then((res) => {
        setError(res.success);
        setRequest(true);
        setUser(res.data);
      });
  };

  return (
    <div className="App">
      <Grid container justify="center" splacing={3}>
        <Grid item xs={12}>
          <h1>Login</h1>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={(e) => login(e)}>
            <TextField type="text" label="Username" name="username" />
            <br />
            <br />
            <TextField type="password" label="password" name="password" />
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
        </Grid>
        <Grid item xs={3}>
          <br />
          <br />
          {requestSent ? (
            <MuiAlert
              elevation={6}
              variant="filled"
              severity={error ? "success" : "error"}
            >
              {error ? "Logged in succesfully" : "error: "}
            </MuiAlert>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
