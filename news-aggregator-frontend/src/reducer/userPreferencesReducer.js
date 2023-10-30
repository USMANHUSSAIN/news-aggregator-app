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
  UNMOUNT_USER_PREFERRED_SETTINGS
} from "../actions/actionTypes";

const initialState = {
  preferredCategories: [],
  preferredAuthors: [],
  preferredSources: [],
}

const userPreferencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCH_USER_PREFERRED_CATEGORIES:
      return {
        ...state,
        preferredCategories: action.payload
      }

    case SET_POST_USER_PREFERRED_CATEGORIES:
      return {
        ...state,
        preferredCategories: [...state.preferredCategories, action.payload]
      }

    case SET_DELETE_USER_PREFERRED_CATEGORIES:
      return {
        ...state,
        preferredCategories: state.preferredCategories.filter(({ value }) => value !== action.payload)
      }

    case SET_FETCH_USER_PREFERRED_AUTHORS:
      return {
        ...state,
        preferredAuthors: action.payload
      }

    case SET_POST_USER_PREFERRED_AUTHORS:
      return {
        ...state,
        preferredAuthors: [...state.preferredAuthors, action.payload]
      }

    case SET_DELETE_USER_PREFERRED_AUTHORS:
      return {
        ...state,
        preferredAuthors: state.preferredAuthors.filter(({ value }) => value !== action.payload)
      }

    case SET_FETCH_USER_PREFERRED_SOURCES:
      return {
        ...state,
        preferredSources: action.payload
      }

    case SET_POST_USER_PREFERRED_SOURCES:
      return {
        ...state,
        preferredSources: [...state.preferredSources, action.payload]
      }

    case SET_DELETE_USER_PREFERRED_SOURCES:
      return {
        ...state,
        preferredSources: state.preferredSources.filter(({ value }) => value !== action.payload)
      }

    case UNMOUNT_USER_PREFERRED_SETTINGS:
      return {
        ...state,
        preferredCategories: [],
        preferredAuthors: [],
        preferredSources: [],
      }

    default:
      return state;
  }
}

export default userPreferencesReducer;
