import axios from "axios";
import {
  SET_USER_REGISTER_REQUEST,
  SET_USER_REGISTER_SUCCESS,
  SET_USER_REGISTER_FAILURE,
  SET_USER_LOGIN_REQUEST,
  SET_USER_LOGIN_SUCCESS,
  SET_USER_LOGIN_FAILURE,
  SET_USER_HAS_LOGIN,
  SET_USER_LOGOUT,
  UNMOUNT_RESPONSE_STATUS_DISPLAY
} from './actionTypes'
import { unmountUserPreferedNews, unmountUserPreferences } from "./userPreferences";

// Action Creators
export const postUserRegisterRequest = () => ({
  type: SET_USER_REGISTER_REQUEST
})

export const postUserRegisterSuccess = () => ({
  type: SET_USER_REGISTER_SUCCESS
})

export const postUserRegisterFailure = () => ({
  type: SET_USER_REGISTER_FAILURE
})

export const postUserLoginRequest = () => ({
  type: SET_USER_LOGIN_REQUEST
})

export const postUserLoginSuccess = () => ({
  type: SET_USER_LOGIN_SUCCESS
})

export const postUserLoginFailure = () => ({
  type: SET_USER_LOGIN_FAILURE
})

export const unmountResponseStatusDisplay = () => ({
  type: UNMOUNT_RESPONSE_STATUS_DISPLAY
})

export const postUserRegister = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/register';
  dispatch(postUserRegisterRequest())

  try {
    await axios.post(apiUrl, payload)

    dispatch(postUserRegisterSuccess())
  } catch (err) {
    dispatch(postUserRegisterFailure())
  } finally {
    setTimeout(() => {
      dispatch(unmountResponseStatusDisplay())
    }, 2000)
  }
}

export const postUserLogin = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/login';
  dispatch(postUserLoginRequest())

  try {
    const { data } = await axios.post(apiUrl, payload)

    sessionStorage.setItem('auth_token', data.token)
    sessionStorage.setItem('user_info', JSON.stringify({
      id: data.user.id,
      email: data.user.email
    }))

    dispatch(postUserLoginSuccess())
  } catch (err) {
    dispatch(postUserLoginFailure())
  } finally {
    setTimeout(() => {
      dispatch(unmountResponseStatusDisplay())
    }, 2000)
  }
}

export const userHasLoggedIn = (payload) => ({
  type: SET_USER_HAS_LOGIN,
  payload
})

export const postUserLogout = () => async (dispatch) => {
  sessionStorage.clear()
  dispatch({
    type: SET_USER_LOGOUT
  })
  dispatch(unmountUserPreferences())
  dispatch(unmountUserPreferedNews())
}