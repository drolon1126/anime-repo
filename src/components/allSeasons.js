import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {getAnimeData} from '../actions/actions';
import {createPages} from './createPages';
import AnimeList from './animeList';


const AllSeasons = props => {
  const animes = useSelector(state=>state.animes);
  const pageInfo = useSelector(state=>state.pageInfo);
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getAnimeData({
      season: props.location.state.season,
      seasonYear: props.location.state.year,
      page: 1,
      perPage: 10,
      format: 'TV'
  }));
  },[]);

  const getAnime = pageNo =>{
    dispatch(
      getAnimeData({
        season: props.location.state.season,
        seasonYear: props.location.state.year,
        page: pageNo,
        perPage: 10,
        format: 'TV'
    }));
  } 
  console.log("Test", props); 

  return(
    <div className='anilist'>
      <h2>{`Anime From ${props.location.state.season} ${props.location.state.year}`}</h2>
    <div className='pageNav'>
      <div className='pageSelector' onClick={()=>{getAnime(pageInfo.currentPage - 1<1? 1:pageInfo.currentPage-1)}}>{'<'}</div>
      {createPages(pageInfo,getAnime)}
      <div className='pageSelector' onClick={()=>{getAnime(pageInfo.currentPage + 1>pageInfo.lastPage ? pageInfo.lastPage:pageInfo.currentPage+1)}}>{'>'}</div>
    </div>
      <AnimeList animes={animes} />
    </div>
  );
}

export default AllSeasons;