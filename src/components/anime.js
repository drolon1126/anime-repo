import React from 'react';
import ReactHtmlParser from 'react-html-parser'; 
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles({
  card: {
    width: 400,
    height: 300,
    margin: '10px auto',
    display: 'flex',
    flexDirection:'column',
    backgroundColor: 'rgb(235, 250, 255)'
  },
  content:{
    display: 'flex',
    alignItems: 'flex-start',
    height:'100%',
  },
  media: {
    width: 175,
    height: 300,
    zIndex: -999,
  },
  title: {
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white'
  },
  cardInfo: {
    backgroundColor: 'white',
    padding: 0, 
    paddingRight: 17,
    margin: 0,  
    height: '75%', 
    width: 208, 
    overflowY: 'hidden',
    '&:hover': {
      width:225,
      padding: 0,
      overflowY:'scroll'
    }
  },
  genres: {
    padding: 0,
    height: '25%', 
    width:'90%', 
    display:'flex', 
    overflowX:'auto',
    overflowY:'hidden',
  },
  genresP: {
    margin: '0 5px 5px 0',
    paddingBottom: 17,
  }
});


const Anime = props => {
  const classes = useStyles();

  const episodes = props.anime.episodes ?
    <span>{props.anime.episodes}</span> :
    <span>Unknown</span>;

  const curEpisode = props.anime.nextAiringEpisode ?
    <span>Ep {props.anime.nextAiringEpisode.episode} of</span> :
    <span>Ep 0 of</span>;

  const secs = props.anime.nextAiringEpisode ?
    Number(props.anime.nextAiringEpisode.timeUntilAiring) :
    0;
  const days = Math.floor(secs / (3600 * 24));
  const hours = Math.floor(secs % (3600 * 24) / 3600);

  const studio = props.anime.studios.nodes[0] ?
    <p style={{margin:'0'}}>{props.anime.studios.nodes[0].name}</p> :
    <p></p>;

    const airingInfo = props.anime.status === 'RELEASING' ?
    <>
      <h5>{curEpisode} {episodes} airing in</h5>
      <h4>{days} days, {hours} hours</h4> 
    </> :
    <>
      <h5>{episodes} episodes</h5>
      <h4>Completed</h4>
    </>;

  return (
    <Card className={classes.card}>
      <div className={classes.content}>
      <div className={classes.left}>
        <CardMedia
          className={classes.media}
          image={props.anime.coverImage.large}
          title={``}
        ><div className={classes.title}>
          <p style={{margin:'0'}}>{props.anime.title.romaji}</p>
          {studio}
        </div>
        </CardMedia>
      </div>
      <div className={classes.center} style={{ height: '100%', width:'225px' }}>
        <div style={{ height: '10%', backgroundColor: 'white'}}>Score: {props.anime.averageScore}</div>
        <CardContent className={classes.cardInfo} style={{ }}>
          <p style={{margin:'0'}}>{props.anime.format}</p>
          {airingInfo}
          <h6>Source: {props.anime.source}</h6>
          <p>{ReactHtmlParser (props.anime.description)}</p>
        </CardContent>
        <CardActions className={classes.genres}>
          {props.anime.genres.map(genre=>{return(<p className={classes.genresP}>{genre}</p>);})}
        </CardActions>
      </div>
      </div>
    </Card>
  );
};

export default Anime;