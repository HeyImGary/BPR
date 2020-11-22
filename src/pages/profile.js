import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import CardComponent from "../components/card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import UserContext from "../contect/userContect";

function Profile() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [items, setItems] = useState([undefined]);
  const [loaded, setLoaded] = useState(false);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [userData, setUserData] = useState(undefined);

  console.log(id);
  useEffect(() => {
    //fetching recipes by the user
    fetch("http://localhost:3001/recipes/recipesByUser/" + id)
      .then((res) => res.json())
      .then(
        (res) => {
          setItems(res.data);
          setLoaded(true);
          console.log("here", items);
        },
        (error) => {
          console.log(error);
        }
      );

    //fetching user info
    fetch(`http://localhost:3001/user/getUser/${id}`)
      .then((res) => res.json())
      .then(
        (res) => {
          setUserData(res.data);
          //Checking if user is logged in and if the profile belongs to the user
          user
            ? user._id === id
              ? setIsLoggedInUser(true)
              : setIsLoggedInUser(false)
            : setIsLoggedInUser(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const followUser = async () => {
    let data = {
      userId: user._id,
      id: id
    };
    console.log("hi");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

    await fetch("http://localhost:3001/user/follow", requestOptions).then(
      (res) => res.json(),
      (error) => {
        console.log("Error: ", error);
      }
    );
  };
  console.log(items, loaded);
  // Add user api call

  return (
    <Grid container className="App" spacing={3}>
      {userData ? (
        <>
          <Grid item xs={12}>
            {isLoggedInUser ? (
              <>
                <br />
                <Button variant="contained">Edit Profile</Button>
              </>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <br />
            <Typography variant="h3">{userData.username}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">
              Followers: {userData.followers.length}
            </Typography>
            {user
              ? (console.log("hi"),
                isLoggedInUser ? null : (
                  <Button variant="contained" onClick={() => followUser()}>
                    Follow
                  </Button>
                ))
              : null}
          </Grid>

          {userData.description ? (
            <Grid item xs={12}>
              <Typography variant="body1">User Description</Typography>
              <br />
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Divider />
            <br />
          </Grid>

          {loaded && items ? (
            items.map((i) => (
              <Grid item xs={3}>
                <CardComponent data={i} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <h2>Fetching Recipes...</h2>
            </Grid>
          )}
        </>
      ) : (
        <Grid item xs={12}>
          <CircularProgress />
          <h2>Fetching User Data...</h2>
        </Grid>
      )}
    </Grid>
  );
}

export default Profile;
