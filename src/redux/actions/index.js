import {
  USER_AUTH,
  POSTS
} from "../constants/action-types";

const userAuth = payload => {
  return {
    payload,
    type: USER_AUTH
  }
}

const posts = payload => {
  return {
    payload,
    type: POSTS
  }
}


export {
  userAuth,
  posts
}