import "../App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

function Blog() {
  let { blogId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState();

  useEffect(() => {
    async function FetchData() {
      const response = await fetch(
        `http://localhost:3001/recipes/recipes/${blogId}`
      );
      const data = await response.json();

      setItem(data.data);
      setLoaded(true);
      console.log(data.data);
    }

    FetchData();
  }, [blogId]);

  return (
    <div className="App">
      {loaded ? (
        <>
          <h1>{item.title}</h1> <br />
          <p>{item.recipe}</p>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default Blog;
