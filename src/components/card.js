import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
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
        <Typography
          variant="h5"
          onClick={() => history.push("/blog/" + props.data._id)}
        >
          {props.data.title}
        </Typography>
      </CardContent>
      <Typography variant="p">{props.data.shortDescription} </Typography>

      <CardContent>
        <Button variant="primary">Go To Recipy</Button>
      </CardContent>

      {props.data.tags.map((tag) => (
        <Chip label={tag} style={{ margin: 5 }} />
      ))}
    </Card>
  );
};

export default CardComponent;
