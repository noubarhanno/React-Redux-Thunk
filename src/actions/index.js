// import jsonPlaceholder from '../apis/jsonPlaceholder';

// export const fetchPosts =  () => {
//     // Bad Approach because it's breaking the rules of redux in buiding the action creators
//     const promise = jsonPlaceholder.get('/posts');
//     return {
//         type: 'FETCH_POSTS',
//         payload: promise
//     };
// };

// The Code below could be end up as the next code block
// import jsonPlaceholder from "../apis/jsonPlaceholder";

// export const fetchPosts = () => {
//   return async function(dispatch, getState) {
//     const response = await jsonPlaceholder.get("/posts");

//     dispatch({type: 'FETCH_POSTS', payload: response})

//   };
// };

import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  //this is original
  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach(id => dispatch(fetchUser(id)));
  //below is optional
  _.chain(getState().posts)
  .map('userId')
  .uniq()
  .forEach(id => dispatch(fetchUser(id)))
  .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};


export const fetchUser = id => async dispatch =>{
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({type:'FETCH_USER', payload:response.data});

  // dispatch({ type:'FETCH_USER', payload:response.data});
};

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch)

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({type: "FETCH_USER", payload: response.data});
// });

