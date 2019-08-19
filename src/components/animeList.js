import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {getAnimeData} from '../actions/actions';
import Anime from './anime';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const AnimeList = props => {
  const animes = props.animes;
  const dispatch = useDispatch();
  const classes = useStyles();    

  return(
    <Grid container spacing={3} style={{width:'100%'}} >
    {animes &&
        animes.map(anime => {
      return(
          <Grid item xs style={{padding:'0'}}>
            <Anime key={anime.id} anime={anime} />
          </Grid>
        )
    })}
    </Grid>
  );
}

export default AnimeList;