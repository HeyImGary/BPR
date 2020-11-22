import "../App.css";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

function Recipe() {
  let { recipeId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState();
  let history = useHistory();

  useEffect(() => {
    async function FetchData() {
      const response = await fetch(
        `http://localhost:3001/recipes/recipes/${recipeId}`
      );
      const data = await response.json();

      setItem(data.data);
      setLoaded(true);
    }

    FetchData();
  }, [recipeId]);

  console.log(item);
  return (
    <div className="App">
      {loaded ? (
        <>
          <h1>{item.title}</h1> <br />
          <p>{item.recipe}</p> <br />
          <Button
            variant="contained"
            onClick={() => history.push(`/profile/${item.creator.id}`)}
          >
            {item.creator.username}
          </Button>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default Recipe;
