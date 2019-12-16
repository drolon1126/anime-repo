import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAnimeData } from '../actions/actions';

import AnimeList from './animeList';

const WeeklySchedule = props => {
  const animes = useSelector(state => state.animes);
  const pageInfo = useSelector(state => state.pageInfo);
  const [initiated, setinit] = useState(0);
  const [loading, setLoading] = useState(1);
  const [sun, setSun] = useState([]);
  const [mon, setMon] = useState([]);
  const [tues, setTues] = useState([]);
  const [wed, setWed] = useState([]);
  const [thurs, setThurs] = useState([]);
  const [fri, setFri] = useState([]);
  const [sat, setSat] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const getAnime = (pageNo) => {
    dispatch(
      getAnimeData({
        status: 'RELEASING',
        page: pageNo,
        perPage: 50,
        format: 'TV'
      }));
  }

  const populateWeeks = () =>{
    const now = new Date().getTime();
      
      const tmp = animes.filter(anime => anime.nextAiringEpisode !== null);
      let weekArray = [];

      for (let i=0;i<7;i++){
        weekArray[i] = tmp.filter(anime => new Date(now + (anime.nextAiringEpisode.timeUntilAiring * 1000)).getDay() === i);
      }

      setSun([...sun, ...weekArray[0]]);
      setMon([...mon, ...weekArray[1]]);
      setTues([...tues, ...weekArray[2]]);
      setWed([...wed, ...weekArray[3]]);
      setThurs([...thurs, ...weekArray[4]]);
      setFri([...fri, ...weekArray[5]]);
      setSat([...sat, ...weekArray[6]]);


      if (pageInfo.lastPage > 1 && page !== pageInfo.lastPage) {
        getAnime(page + 1);
        setPage(page + 1);
      } else {
        setLoading(0);
      }
  }

  useEffect(() => {
    if (animes && initiated) {
      populateWeeks();
    } else {
      getAnime(1);
      setinit(1);
    }
  }, [animes]);
  

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Currently Airing Anime</h1>
      {loading ? (
        <>
        </>
      ) : (
        <>
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
      </>
      )}
    </div>
  );
}

export default WeeklySchedule;