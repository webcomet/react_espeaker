
export default store => next => action  => {
  if (action.type) {
    console.log(action);
  }
  return next(action);
}
