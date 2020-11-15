import { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";

import Grid from "@material-ui/core/Grid";

import CardComponent from "../components/card";
import CircularProgress from "@material-ui/core/CircularProgress";

import Divider from "@material-ui/core/Divider";

import "../App.css";

function Home() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const postRequest = (e) => {
    e.preventDefault();
    let data = {
      title: e.target.title.value,
      shortDescription: e.target.description.value,
      tags: e.target.tags.value.split(","),
      cookTime: e.target.time.value
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

    fetch("http://localhost:3001/api/createRecipes", requestOptions)
      .then((res) => res.json())
      .then((res) => (data._id = res.id))
      .then(
        console.log(data),
        setItems((items) => [...items, data]),
        (error) => {
          console.log("you fucked up", error);
        }
      );
  };

  function filterItems(key) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2>{key} Meals</h2>
          <br />
          <Divider />
        </Grid>
        {loaded ? (
          items
            .filter((f) => f.tags.includes(`${key}`))
            .map((i) => (
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

  useEffect(() => {
    fetch("http://localhost:3001/api/recipes")
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
  }, []);

  return (
    <div className="App">
      <h1>Blue Pear Food Network</h1>
      <Grid container spacing={3}>
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

      {filterItems("Protein")}
      {filterItems("Vegan")}
      {filterItems("Healthy")}

      <br />
      <form onSubmit={(e) => postRequest(e)}>
        <TextField label="Title" name="title" />
        <br />
        <TextField label="Description" type="textarea" name="description" />
        <br />
        <TextField label="Time" type="number" name="time" />
        <br />
        <TextField
          label="Tags"
          name="tags"
          helperText="Separate Tags by ',' "
        />
        <br />
        <br />
        <Button color="primary" type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <br />

      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message="Success"
        onClose={handleClose}
      ></Snackbar>
    </div>
  );
}

export default Home;
