import {
  SET_USER_REGISTER_REQUEST,
  SET_USER_REGISTER_SUCCESS,
  SET_USER_REGISTER_FAILURE,
  SET_USER_LOGIN_REQUEST,
  SET_USER_LOGIN_SUCCESS,
  SET_USER_LOGIN_FAILURE,
  SET_USER_LOGOUT,
  UNMOUNT_RESPONSE_STATUS_DISPLAY,
  SET_USER_HAS_LOGIN
} from "../actions/actionTypes";

const initialState = {
  userLoading: false,
  isUserLoggedIn: false,
  showUserSuccess: false,
  showUserFailure: false,
  user_id: 0
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_REGISTER_REQUEST:
      return {
        ...state,
        userLoading: true
      }

    case SET_USER_REGISTER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        showUserSuccess: true,
      }

    case SET_USER_REGISTER_FAILURE:
      return {
        ...state,
        userLoading: false,
        showUserFailure: true,
      }

    case SET_USER_LOGIN_REQUEST:
      return {
        ...state,
        userLoading: true
      }

    case SET_USER_LOGIN_SUCCESS:
      return {
        ...state,
        userLoading: false,
        showUserSuccess: true,
        isUserLoggedIn: true
      }

    case SET_USER_LOGIN_FAILURE:
      return {
        ...state,
        userLoading: false,
        showUserFailure: true,
      }

    case SET_USER_HAS_LOGIN:
      return {
        ...state,
        isUserLoggedIn: true,
        user_id: action.payload
      }

    case SET_USER_LOGOUT:
      return {
        ...state,
        isUserLoggedIn: false
      }

    case UNMOUNT_RESPONSE_STATUS_DISPLAY:
      return {
        ...state,
        showUserSuccess: false,
        showUserFailure: false
      }

    default:
      return state
  }
}

export default userReducer;
