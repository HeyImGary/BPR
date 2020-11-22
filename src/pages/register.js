import { useState } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";

function Register() {
  const [data, setData] = useState();
  const [error, setError] = useState(true);
  const [requestSent, setRequest] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    let data = {
      username: e.target.username.value,
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      password: e.target.password.value
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

    await fetch("http://localhost:3001/user/register", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setError(res.success);
        setData(res.data);
        setRequest(true);
      });
  };

  return (
    <div className="App">
      <Grid container justify="center" splacing={3}>
        <Grid item xs={12}>
          <h1>Register</h1>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={(e) => login(e)}>
            <TextField type="text" label="Username" name="username" />
            <br />
            <br />
            <TextField type="text" label="First Name" name="firstname" />
            <br />
            <br />
            <TextField type="text" label="Last Name" name="lastname" />
            <br />
            <br />
            <TextField type="password" label="Password" name="password" />
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
              {error ? "Logged in succesfully" : "error: " + data}
            </MuiAlert>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}

export default Register;
