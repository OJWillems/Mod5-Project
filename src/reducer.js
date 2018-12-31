const defaultState = {
  homeScreen: null,

  allBands: null,
  allListeners: null,
  allFavorites: null,
  allListenerFavorites: null,

  loggedInListener: null,
  loggedInListenerAPI: null,

  loggedInBand: null,
  loggedInBandAPI: null,

  selectedBand: null,

  allSelectedBandsAnsweredQuestions: null,

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
    case "SET_LOGGED_IN_LISTENER_API_URL":
      return {...state, loggedInListenerAPI:action.payload}

    // Log In Band:
    case "LOG_IN_BAND":
      return {
        ...state,
        loggedInBand: action.payload,
        selectedBand: action.payload,
        homeScreen: "band details page"
      }

    case "SET_LOGGED_IN_BAND_API_URL":
      return{...state, loggedInBandAPI: action.payload}

    // Get all of a band's questions
    case "GET_BANDS_QUESTIONS":
      return{...state, allBandsQuestions: action.payload}

    case "GET_ALL_SELECTED_BANDS_ANSWERED_QUESTIONS":
      return{...state, allSelectedBandsAnsweredQuestions: action.payload}

    //////////////////PAGE RENDER CASES//////////////////
    case "GO_BACK_TO_HOME_PAGE":
      return {...state, homeScreen: action.payload}
    case "GO_BACK_TO_BANDS_CONTAINER":
      return {...state, homeScreen: action.payload}
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

    // Band's questions pages:
    case "SHOW_QUESTIONS":
      return {...state, homeScreen: action.payload}

    // From a Band's Questions Container, go back to their Details Page:
    case "GO_BACK_TO_BAND_DETAILS":
      return {...state, homeScreen: action.payload}

    default:
      return state
  }
}

export default reducer;
