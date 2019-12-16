import axios from 'axios';

export const FETCH_ANIME_DATA_START = 'FETCH_ANIME_DATA_START';
export const FETCH_ANIME_DATA_SUCCESS = 'FETCH_ANIME_DATA_SUCCESS';
export const FETCH_ANIME_DATA_FAILURE = 'FETCH_ANIME_DATA_FAILURE';
export const CLEAR_STATE = 'CLEAR_STATE';

export const clearState = () => {
  return dispatch => {
    dispatch({ type: CLEAR_STATE });
  }
}

export const getAnimeData = (vars) => {
  let query = `
  query ($id: Int, $page: Int, $perPage: Int, $status: MediaStatus, $search: String, $format: MediaFormat, $season: MediaSeason, $seasonYear: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, status:$status, search: $search, type: ANIME, sort:TITLE_ROMAJI, format:$format, season:$season, seasonYear:$seasonYear) {
        format
        coverImage{
          large
        }
        title {
          romaji
        }
        episodes
        source
        description
        genres
        averageScore
        id
        startDate {
          year
          month
          day
        }
        nextAiringEpisode{
          timeUntilAiring
          episode
        }
        status
        studios(isMain: true){
          nodes {
            name
          }
        }
      }
    }
  }
  `;

  let variables = vars;

  return dispatch => {
    dispatch({ type: FETCH_ANIME_DATA_START });
    axios
      .post(`https://graphql.anilist.co`,{
        query: query,
        variables: variables,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      .then(res => {
        console.log('The deets: ',res.data.data.Page);
        dispatch({ type: FETCH_ANIME_DATA_SUCCESS, payload: res.data.data.Page });
      })
      .catch(err => {
        console.log('Error: ',err);
        dispatch({ type: FETCH_ANIME_DATA_FAILURE, payload: err.response });
      });
  };
};