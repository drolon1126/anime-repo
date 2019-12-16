import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getAnimeData, clearState } from '../actions/actions';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import AllSeasons from './allSeasons';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
}));

const SeasonArchive = props => {
  const classes = useStyles();
  const [selection, setSelection] = useState({ season: 'SUMMER', year: 2019 });
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    dispatch(
      clearState()
    );
  }, []);

  const handleChange = name => event => {
    setSelection({
      ...selection,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    dispatch(
      getAnimeData({
        season: selection.season,
        seasonYear: selection.year,
        page: 1,
        perPage: 8,
        format: 'TV'
      }));
  }, [selection]);

  const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
  const years = [2019, 2018, 2017, 2016, 2015, 2014, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2001, 2000];

  return (
    <div>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="yearSelect">Year</InputLabel>
          <Select
            native
            value={selection.year}
            onChange={handleChange('year')}
            inputProps={{
              name: 'year',
              id: 'yearSelect',
            }}
            labelWidth={labelWidth}
          >
            {years.map((y, i) => <option key={i} value={y}>{y}</option>)}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="seasonSelect">Season</InputLabel>
          <Select
            native
            value={selection.season}
            onChange={handleChange('season')}
            inputProps={{
              name: 'season',
              id: 'seasonSelect',
            }}
            labelWidth={labelWidth}
          >
            {seasons.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </Select>
        </FormControl>
      </div>
            <AllSeasons season={selection.season} year={selection.year} /> 
      <div>

      </div>
    </div>
  );

}

export default SeasonArchive;