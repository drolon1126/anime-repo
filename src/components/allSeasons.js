import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {getAnimeData} from '../actions/actions';
import {createPages} from './createPages';
import AnimeList from './animeList';


const AllSeasons = props => {
  const animes = useSelector(state=>state.animes);
  const pageInfo = useSelector(state=>state.pageInfo);
  const dispatch = useDispatch();

  const getAnime = pageNo =>{
    dispatch(
      getAnimeData({
        season: props.season,
        seasonYear: props.year,
        page: pageNo,
        perPage: 8,
        format: 'TV'
    }));
  }

  return(
    <div className='anilist'>
      <h2>{`Anime From ${props.season} ${props.year}`}</h2>
    <div className='pageNav'>
      <div className='pageSelector' onClick={()=>{getAnime(pageInfo.currentPage - 1<1? 1:pageInfo.currentPage-1)}}>{'<'}</div>
      {createPages(pageInfo,getAnime)}
      <div className='pageSelector' onClick={()=>{getAnime(pageInfo.currentPage + 1>pageInfo.lastPage ? pageInfo.lastPage:pageInfo.currentPage+1)}}>{'>'}</div>
    </div>
      {(animes[0].title.romaji!='') ? (
        <AnimeList animes={animes} />
      ) : (
        <></>
      )}
      
    </div>
  );
}

export default AllSeasons;