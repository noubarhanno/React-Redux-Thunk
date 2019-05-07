// export default (state = [], action) => {
//     if (action.type==='FETCH_POSTS'){
//         return action.payload;
//     }
//     return state;
// };

// The Code Above could be written as below (like the burger builder)

export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    default:
      return state;
  }
};