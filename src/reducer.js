const defaultState = {
  homeScreen: "start",
  something: true,
  bandUserName: null,
  bandPassword: null,
  bandName: null,
  bandBio: null,

}

const reducer = (state = defaultState, action) => {
 switch (action.type) {
   case "CHOOSE_BAND":
    return {...state, homeScreen: action.payload}
  case "NEW_BAND_HANDLER":
    return {...state, homeScreen: action.payload}
  case "CHOOSE_LISTENER":
    return {...state, homeScreen: action.payload}
  case "NEW_LISTENER_HANDLER":
    return {...state, homeScreen: action.payload}
  default:
    return state
 }
}

export default reducer;
