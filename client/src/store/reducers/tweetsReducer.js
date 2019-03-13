import { FETCH_TRUMP_TWEETS, LATEST_TRUMP_TWEETS, FETCH_HILLARY_TWEETS, LATEST_HILLARY_TWEETS } from '../actions';

const initialState = {
  
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRUMP_TWEETS: 
      return {
        ...state,
        trumpTweets: action.payload
      }
    case LATEST_TRUMP_TWEETS: 
      return {
        ...state,
        trumpLatest: action.payload
      }
    case FETCH_HILLARY_TWEETS: 
      return {
        ...state,
        hillaryTweets: action.payload
      }
    case LATEST_HILLARY_TWEETS: 
      return {
        ...state,
        hillaryLatest: action.payload
      }
    default: 
      return state;
  }
}
