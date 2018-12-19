const defaultState = {
  // FIX THIS HARD CODE
  // homeScreen: "listener home page",
  homeScreen: null,
  // hardCodedListener: null,
  // FIX THIS HARD CODE

  allBands: null,
  allListeners: null,
  allFavorites: null,
  allListenerFavorites: null,

  loggedInListener: null,
  loggedInBand: null,

  selectedBand: null,

}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_ALL_BANDS":
      return {...state, allBands: action.payload}
    case "GET_ALL_LISTENERS":
      return {...state, allListeners: action.payload}
    case "GET_ALL_FAVORITES":
      return {...state, allFavorites: action.payload}
    case "GET_ALL_LISTENER_FAVORITES":
      return {...state, allListenerFavorites: action.payload}

    // Log In Listener:
    case "LOG_IN_LISTENER":
      return {
        ...state,
        loggedInListener: action.payload,
        homeScreen: "listener home page"
      }

    // Log In Band:
    case "LOG_IN_BAND":
      return{
        ...state,
        loggedInBand: action.payload,
        selectedBand: action.payload,
        homeScreen: "band details page"
      }



    //////////////////PAGE RENDER CASES//////////////////
    // OnClick Listener Page Band Selector
    case "SELECT_BAND":
      return {
        ...state,
        selectedBand: action.payload,
        homeScreen: "band details page"
      }
    // Band Login Screen:
    case "CHOOSE_BAND":
      return {...state, homeScreen: action.payload}
    // Band Signup Screen:
    case "NEW_BAND_HANDLER":
      return {...state, homeScreen: action.payload}

    // Listener Login Screen:
    case "CHOOSE_LISTENER":
      return {...state, homeScreen: action.payload}
    // Listener Signup Screen:
    case "NEW_LISTENER_HANDLER":
      return {...state, homeScreen: action.payload}



    default:
      return state
  }
}

export default reducer;
