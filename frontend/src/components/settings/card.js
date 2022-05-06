import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function MediaCard(props) {
  return (
    <Card sx={{ width: 300, height: 300 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.imageHeader}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.header}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={props.handleChange} size="small">Tvarkyti</Button>
        {props.download ? <Button size="small"><a href={props.download} download>Atsisiųsti šabloną</a></Button> : null}
      </CardActions>
    </Card>
  );
}