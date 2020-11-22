import { useContext } from "react";

import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import UserContext from "../contect/userContect";

import { useHistory } from "react-router-dom";

function AppBarComponent() {
  const { user, setUser } = useContext(UserContext);

  let history = useHistory();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            BluePear Food Network
          </Typography>
          <Button color="inherit" onClick={() => history.push("/")}>
            Home
          </Button>

          {/* Show different nav bar for logged in user */}
          {user ? (
            <>
              <Button
                color="inherit"
                onClick={() => history.push("/profile/" + user._id)}
              >
                Profile
              </Button>

              <Button onClick={() => setUser(undefined)}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => history.push("/register")}>
                Register
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => history.push("/Login")}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppBarComponent;
