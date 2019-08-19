import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {getAnimeData} from '../actions/actions';

import { makeStyles } from '@material-ui/core/styles';
import AnimeList from './animeList';

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

const AllAiring = props => {
  const animes = useSelector(state=>state.animes);
  const pageInfo = useSelector(state=>state.pageInfo);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(()=>{
    dispatch(getAnimeData({
      status: 'RELEASING',
      page: 1,
      perPage: 10,
      format: 'TV'
  }));
  },[]);

  const getAnime = pageNo =>{
    dispatch(
      getAnimeData({
        status: 'RELEASING',
        page: pageNo,
        perPage: 10,
        format: 'TV'
    }));
  }

  const createPages = ()=>{
    let pages = [];
    let loopCount = pageInfo.lastPage>=10 ? 10:pageInfo.lastPage;
    let startPos = pageInfo.currentPage>6 ? pageInfo.currentPage - 5 : 1;

    for(let i= startPos; i<startPos+loopCount; i++){
      if(i===pageInfo.currentPage){
        pages.push(<div className='pageSelector selected' onClick={()=>{getAnime(i)}}>{i}</div>);
      }else{
        pages.push(<div className='pageSelector' onClick={()=>{getAnime(i)}}>{i}</div>);
      }
    }

    return pages;
  } 
    

  return(
    <div className='anilist'>
    <div className='pageNav'>
      <div className='pageSelector' onClick={()=>{getAnime(pageInfo.currentPage - 1<1? 1:pageInfo.currentPage-1)}}>{'<'}</div>
      {createPages()}
      <div className='pageSelector' onClick={()=>{getAnime(pageInfo.currentPage + 1>pageInfo.lastPage ? pageInfo.lastPage:pageInfo.currentPage+1)}}>{'>'}</div>
    </div>
      <AnimeList animes={animes} />
    </div>
  );
}

export default AllAiring;