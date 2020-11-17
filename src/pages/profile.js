import { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";

import CardComponent from "../components/card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

function Profile() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      "http://localhost:3001/recipes/recipesByUser/5faffcf5b465d839548c1b24"
    )
      .then((res) => res.json())
      .then(
        (res) => {
          setItems(res.data);
          console.log(items);
          setLoaded(true);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [items]);

  return (
    <Grid container className="App" spacing={3}>
      <Grid item xs={12}>
        <p>This is a user profile</p>
      </Grid>
      <Grid item xs={12}>
        <p>Followers: 0</p>
      </Grid>
      <Grid item xs={12}>
        <p>User Description</p>
        <Divider />
      </Grid>
      <br />
      {loaded ? (
        items.map((i) => (
          <Grid item xs={3}>
            <CardComponent data={i} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <CircularProgress />
          <h2>Fetching Recipes...</h2>
        </Grid>
      )}
    </Grid>
  );
}

export default Profile;
