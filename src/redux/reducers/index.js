import {
  USER_AUTH,
  POSTS
} from "redux/constants/action-types";

const initialState = {
  userAuth: {
    isAuthenticated: false,
  },
  posts: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case USER_AUTH:
      return {
        ...state,
        userAuth: action.payload
      }
    case POSTS:
      return {
        ...state,
        posts: action.payload
      }
    default:
      break;
  }
  return state;
}

export default rootReducer; 