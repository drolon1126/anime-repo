import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAnimeData } from '../actions/actions';
import { createPages } from './createPages';
import AnimeList from './animeList';
import { Link } from 'react-router-dom';


const SeasonArchive = props => {

  const [selection, setSelection] = useState({ season: 'SUMMER', year: 2019 });

  const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
  const years = [2019, 2018, 2017, 2016, 2015, 2014, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2001, 2000];

  return (
    <div className='seasonlist'>
      {years.map(year => {
        return (
          <>
            <h2>{year}</h2>
            {seasons.map(season => {
              return (
                <>
                  <Link className='seasonLink' to={{
                    pathname: `/test/${season}${year}`,
                    state: {
                      season: season,
                      year: year
                    }
                  }}>{season}</Link>
                </>
              );
            })}
          </>
        );
      })}
    </div>
  );
}

export default SeasonArchive;