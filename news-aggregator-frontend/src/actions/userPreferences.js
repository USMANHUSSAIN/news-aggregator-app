import axios from "axios";
import {
  SET_FETCH_USER_PREFERRED_CATEGORIES,
  SET_POST_USER_PREFERRED_CATEGORIES,
  SET_DELETE_USER_PREFERRED_CATEGORIES,
  SET_FETCH_USER_PREFERRED_AUTHORS,
  SET_POST_USER_PREFERRED_AUTHORS,
  SET_DELETE_USER_PREFERRED_AUTHORS,
  SET_FETCH_USER_PREFERRED_SOURCES,
  SET_POST_USER_PREFERRED_SOURCES,
  SET_DELETE_USER_PREFERRED_SOURCES,
  UNMOUNT_USER_PREFERRED_SETTINGS,
  UNMOUNT_USER_PREFERED_NEWS,
  SET_NEWS_HEADLINE_ON_PREFERENCES,
} from "./actionTypes";

export const unmountUserPreferences = () => ({
  type: UNMOUNT_USER_PREFERRED_SETTINGS
})

export const unmountUserPreferedNews = () => ({
  type: UNMOUNT_USER_PREFERED_NEWS
})

export const fetchUserPreferredCategories = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-categories-preferences?user_id=${payload.user_id}`

  const { data: preferredCategories } = await axios.get(apiUrl)
  dispatch({
    type: SET_FETCH_USER_PREFERRED_CATEGORIES,
    payload: preferredCategories
  })
}

export const postUserPreferredCategories = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-categories-preferences`
  const { data: preferredCategories } = await axios.post(apiUrl, payload)

  dispatch({
    type: SET_POST_USER_PREFERRED_CATEGORIES,
    payload: {
      value: preferredCategories.value,
      label: preferredCategories.label
    }
  })
}

export const deleteUserPreferredCategories = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-categories-preferences?user_id=${payload.user_id}&value=${payload.value}`
  const { data: preferredCategories } = await axios.delete(apiUrl)

  dispatch({
    type: SET_DELETE_USER_PREFERRED_CATEGORIES,
    payload: preferredCategories.value
  })
}

export const fetchUserPreferredAuthors = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-authors-preferences?user_id=${payload.user_id}`

  const { data: preferredAuthors } = await axios.get(apiUrl)
  dispatch({
    type: SET_FETCH_USER_PREFERRED_AUTHORS,
    payload: preferredAuthors
  })
}

export const postUserPreferredAuthors = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-authors-preferences`
  const { data: preferredAuthors } = await axios.post(apiUrl, payload)

  dispatch({
    type: SET_POST_USER_PREFERRED_AUTHORS,
    payload: {
      value: preferredAuthors.value,
      label: preferredAuthors.label
    }
  })
}

export const deleteUserPreferredAuthors = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-authors-preferences?user_id=${payload.user_id}&value=${payload.value}`
  const { data: preferredAuthors } = await axios.delete(apiUrl)

  dispatch({
    type: SET_DELETE_USER_PREFERRED_AUTHORS,
    payload: preferredAuthors.value
  })
}

export const fetchUserPreferredSources = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-sources-preferences?user_id=${payload.user_id}`

  const { data: preferredSources } = await axios.get(apiUrl)
  dispatch({
    type: SET_FETCH_USER_PREFERRED_SOURCES,
    payload: preferredSources
  })
}

export const postUserPreferredSources = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-sources-preferences`
  const { data: preferredSources } = await axios.post(apiUrl, payload)

  dispatch({
    type: SET_POST_USER_PREFERRED_SOURCES,
    payload: {
      value: preferredSources.value,
      label: preferredSources.label
    }
  })
}

export const deleteUserPreferredSources = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-sources-preferences?user_id=${payload.user_id}&value=${payload.value}`
  const { data: preferredSources } = await axios.delete(apiUrl)

  dispatch({
    type: SET_DELETE_USER_PREFERRED_SOURCES,
    payload: preferredSources.value
  })
}

// Filter on User Preferences
export const filterOnUserPreferences = () => async (dispatch, getState) => {

  let sourceFiltered = []
  if (getState().userPreferences.preferredSources.length) {
    for (const { label } of getState().userPreferences.preferredSources) {
      const filtered = getState().news.headlines.filter(({ source }) => source === label);
      sourceFiltered.push(...filtered)
    }
  } else {
    sourceFiltered = getState().news.headlines
  }

  let categoryFiltered = [];
  if (getState().userPreferences.preferredCategories.length) {
    for (const { value } of getState().userPreferences.preferredCategories) {
      const filtered = sourceFiltered.filter(({ category }) => category === value);
      categoryFiltered.push(...filtered);
    }
  } else {
    categoryFiltered = sourceFiltered;
  }

  let authorFiltered = []
  if (getState().userPreferences.preferredAuthors.length) {
    for (const { label } of getState().userPreferences.preferredAuthors) {
      const filtered = categoryFiltered.filter(({ author }) => author === label);
      authorFiltered.push(...filtered);
    }
  } else {
    authorFiltered = categoryFiltered;
  }

  dispatch({
    type: SET_NEWS_HEADLINE_ON_PREFERENCES,
    payload: authorFiltered
  })
}