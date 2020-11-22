import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import Chip from "@material-ui/core/Chip";

import { useHistory } from "react-router-dom";

const CardComponent = (props) => {
  let history = useHistory();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">{props.data.title}</Typography>
      </CardContent>
      <Typography variant="body1">{props.data.shortDescription} </Typography>

      <CardContent>
        <Button
          onClick={() => history.push("/recipe/" + props.data._id)}
          variant="contained"
        >
          Go To Recipe
        </Button>
      </CardContent>

      {props.data.tags.map((tag, index) => (
        <Chip color="primary" key={index} label={tag} style={{ margin: 5 }} />
      ))}
    </Card>
  );
};

export default CardComponent;
