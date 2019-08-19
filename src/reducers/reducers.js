import {FETCH_ANIME_DATA_START, FETCH_ANIME_DATA_SUCCESS, FETCH_ANIME_DATA_FAILURE} from '../actions/actions';

const initialState = {
  isLoading: false,
  pageInfo:{
    currentPage:null,
    hasNextPage:false,
    lastPage:null,
    perPage:null,
    total:null
  },
  status: '',
  animes: [{
    averageScore:null,
    coverImage:{
      large:''
    },
    episodes:null,
    format:'',
    genres:[''],
    id:null,
    nextAiringEpisode: {
      timeUntilAiring:null,
      episode:null
    },
    source:'',
    startDate:{
      year:null,
      month:null,
      day:null
    },
    studios:{
      nodes:[
       {
         name:''
       } 
      ]
    },
    title:{
      romaji:''
    }
  }],
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ANIME_DATA_START:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case FETCH_ANIME_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pageInfo: action.payload.pageInfo,
        animes: action.payload.media,
        error: ''
      };
      case FETCH_ANIME_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
      default:
        return state;
    }
  }

  export default reducer;