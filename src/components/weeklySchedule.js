import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {getAnimeData} from '../actions/actions';

import AnimeList from './animeList';

const WeeklySchedule = props => {
  const animes = useSelector(state=>state.animes);
  const pageInfo = useSelector(state=>state.pageInfo);
  const [loaded,setLoaded] = useState(0);
  const [sun,setSun] = useState([]);
  const [mon,setMon] = useState([]);
  const [tues,setTues] = useState([]);
  const [wed,setWed] = useState([]);
  const [thurs,setThurs] = useState([]);
  const [fri,setFri] = useState([]);
  const [sat,setSat] = useState([]);
  const [page,setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAnimeData({
      status: 'RELEASING',
      page: 1,
      perPage: 50,
      format: 'TV'
    }));
    setLoaded(1);
  },[]);

  const getAnime = (pageNo) =>{
    dispatch(
      getAnimeData({
        status: 'RELEASING',
        page: pageNo,
        perPage: 50,
        format: 'TV'
    }));
  }

  useEffect(()=>{
    if(animes && loaded){
      const now = new Date().getTime();
      /*let tmp = animes.filter(anime => {
        if(anime.nextAiringEpisode===null){
          return false;
        } else{
          let airDay = new Date(now + (anime.nextAiringEpisode.timeUntilAiring*1000)).getDay();
          return airDay === 1;
        }
      })*/
      const tmp = animes.filter(anime=>anime.nextAiringEpisode!==null);
      const tmpSun = tmp.filter(anime=>new Date(now + (anime.nextAiringEpisode.timeUntilAiring*1000)).getDay()===0);
      const tmpMon = tmp.filter(anime=>new Date(now + (anime.nextAiringEpisode.timeUntilAiring*1000)).getDay()===1);
      const tmpTues = tmp.filter(anime=>new Date(now + (anime.nextAiringEpisode.timeUntilAiring*1000)).getDay()===2);
      const tmpWed = tmp.filter(anime=>new Date(now + (anime.nextAiringEpisode.timeUntilAiring*1000)).getDay()===3);
      const tmpThurs = tmp.filter(anime=>new Date(now + (anime.nextAiringEpisode.timeUntilAiring*1000)).getDay()===4);
      const tmpFri = tmp.filter(anime=>new Date(now + (anime.nextAiringEpisode.timeUntilAiring*1000)).getDay()===5);
      const tmpSat = tmp.filter(anime=>new Date(now + (anime.nextAiringEpisode.timeUntilAiring*1000)).getDay()===6);

      setSun([...sun,...tmpSun]);
      setMon([...mon,...tmpMon]);
      setTues([...tues,...tmpTues]);
      setWed([...wed,...tmpWed]);
      setThurs([...thurs,...tmpThurs]);
      setFri([...fri,...tmpFri]);
      setSat([...sat,...tmpSat]);

      if(pageInfo.lastPage>1 && page !== pageInfo.lastPage){
        getAnime(page+1);
        setPage(page+1);
      }
    }
  },[animes]);

    
  return(
    <div>
      <div>
        <h2>Sunday</h2>
        <AnimeList animes={sun} />
      </div>
      <div>
        <h2>Monday</h2>
        <AnimeList animes={mon} />
      </div>
      <div>
        <h2>Tuesday</h2>
        <AnimeList animes={tues} />
      </div>
      <div>
        <h2>Wednesday</h2>
        <AnimeList animes={wed} />
      </div>
      <div>
        <h2>Thursday</h2>
        <AnimeList animes={thurs} />
      </div>
      <div>
        <h2>Friday</h2>
        <AnimeList animes={fri} />
      </div>
      <div>
        <h2>Saturday</h2>
        <AnimeList animes={sat} />
      </div>
    </div>
  );
}

export default WeeklySchedule;