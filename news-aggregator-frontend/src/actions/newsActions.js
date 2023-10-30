import axios from "axios";
import {
  SET_NEWS_HEADLINE,
  SET_NEWS_HEADLINE_REQUEST,
  SET_NEWS_HEADLINE_SUCCESS,
  SET_NEWS_HEADLINE_FAILURE,
  SET_NEWS_CATEGORIES_HEADLINE,
  SET_NEWS_AUTHORS_HEADLINE,
  SET_FILTERED_NEWS,
  SET_FILTERED_NEWS_REQUEST,
  SET_FILTERED_NEWS_SUCCESS,
  SET_FILTERED_NEWS_FAILURE,
  UNMOUNT_FILTERED_NEWS,
} from "../actions/actionTypes";
import Utils from "../utils";

// Action Creators
export const fetchNewsHeadlineRequest = () => ({
  type: SET_NEWS_HEADLINE_REQUEST,
});

export const fetchNewsHeadlineSuccess = () => ({
  type: SET_NEWS_HEADLINE_SUCCESS,
});

export const fetchNewsHeadlineFailure = () => ({
  type: SET_NEWS_HEADLINE_FAILURE,
});

export const fetchFilteredNewsRequest = () => ({
  type: SET_FILTERED_NEWS_REQUEST,
});

export const fetchFilteredNewsSuccess = () => ({
  type: SET_FILTERED_NEWS_SUCCESS,
});

export const fetchFilteredNewsFailure = () => ({
  type: SET_FILTERED_NEWS_FAILURE,
});

export const unmountFilteredNews = () => ({
  type: UNMOUNT_FILTERED_NEWS
})

// Thunk Action Creator
export const fetchNewsApiHeadline = () => async (dispatch, getState) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/news-api-headline';
  dispatch(fetchNewsHeadlineRequest())

  try {
    const { data: news } = await axios.get(apiUrl)

    const authors = news.map(({ author }) => ({
      value: author,
      label: author
    }))
    const uniqueAuthors = Utils.getUniqueAuthors(authors, getState().news.authors)

    dispatch({
      type: SET_NEWS_HEADLINE,
      payload: news
    })
    dispatch({
      type: SET_NEWS_AUTHORS_HEADLINE,
      payload: uniqueAuthors
    })
    dispatch(fetchNewsHeadlineSuccess());
  } catch (err) {
    dispatch(fetchNewsHeadlineFailure());
  }
};

export const fetchTheGuardianApiHeadline = () => async (dispatch, getState) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/guardian-home';
  dispatch(fetchNewsHeadlineRequest())

  try {
    const { data: news } = await axios.get(apiUrl)

    const categories = news.map(({ category }) => ({
      value: category,
      label: Utils.capitalizeFirstLetter(category)
    }))
    const uniqueCategories = Utils.getUniqueCategories(categories, getState().news.categories);

    dispatch({
      type: SET_NEWS_HEADLINE,
      payload: news
    })
    dispatch({
      type: SET_NEWS_CATEGORIES_HEADLINE,
      payload: uniqueCategories
    })
    dispatch(fetchNewsHeadlineSuccess());
  } catch (err) {
    dispatch(fetchNewsHeadlineFailure());
  }
};

export const fetchNewYorkTimesApiHeadline = () => async (dispatch, getState) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/nyt-home';
  dispatch(fetchNewsHeadlineRequest())

  try {
    const { data: news } = await axios.get(apiUrl)

    const categories = news.map(({ category }) => ({
      value: category,
      label: Utils.capitalizeFirstLetter(category)
    }))
    const uniqueCategories = Utils.getUniqueCategories(categories, getState().news.categories);

    dispatch({
      type: SET_NEWS_HEADLINE,
      payload: news
    })
    dispatch({
      type: SET_NEWS_CATEGORIES_HEADLINE,
      payload: uniqueCategories
    })
    dispatch(fetchNewsHeadlineSuccess());
  } catch (err) {
    dispatch(fetchNewsHeadlineFailure());
  }
};

export const fetchFilteredNewsApi = (payload) => async (dispatch, getState) => {
  const { monthAgoDate, todaysDate } = Utils.getDefaultSearchDate()
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/news-api-filter?q=${payload.keyword}&from=${payload.selectedDate || monthAgoDate}&to=${payload.selectedDate || todaysDate}`;

  try {
    let news;

    if (payload.selectedDate) {
      const { data } = await axios.get(apiUrl)
      news = [...getState().news.filteredNews, ...data]
    } else {
      const stateFiltered = getState().news.headlines.filter(({ source, title, category }) => {
        return (
          source === 'News API' &&
          title.toLowerCase().includes(payload.keyword.toLowerCase()) &&
          (!payload.section || category === payload.section)
        )
      })

      news = [...getState().news.filteredNews, ...stateFiltered]
    }

    dispatch({
      type: SET_FILTERED_NEWS,
      payload: news
    })
    dispatch(fetchFilteredNewsSuccess());
  } catch (err) {
    dispatch(fetchFilteredNewsFailure());
  }
}

export const fetchFilteredTheGuardianApi = (payload) => async (dispatch, getState) => {
  const { monthAgoDate, todaysDate } = Utils.getDefaultSearchDate()
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/guardian-filter?q=${payload.keyword}&section=${payload.section || ""}&from-date=${payload.selectedDate || monthAgoDate}&to-date=${payload.selectedDate || todaysDate}`;

  try {
    let news;

    if (payload.selectedDate) {
      const { data } = await axios.get(apiUrl)
      news = [...getState().news.filteredNews, ...data]
    } else {
      const stateFiltered = getState().news.headlines.filter(({ source, title, category }) => {
        return (
          source === 'The Guardian' &&
          title.toLowerCase().includes(payload.keyword.toLowerCase()) &&
          (!payload.section || category === payload.section)
        )
      })

      news = [...getState().news.filteredNews, ...stateFiltered]
    }

    dispatch({
      type: SET_FILTERED_NEWS,
      payload: news
    })
    dispatch(fetchFilteredNewsSuccess());
  } catch (err) {
    dispatch(fetchFilteredNewsFailure());
  }
};

export const fetchFilteredNewYorkTimesApi = (payload) => async (dispatch, getState) => {
  const { monthAgoDate, todaysDate } = Utils.getDefaultSearchDate()
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/nyt-filter?q=${payload.keyword}&section=${payload.section || ""}&from-date=${payload.selectedDate || monthAgoDate}&to-date=${payload.selectedDate || todaysDate}`;

  try {
    let news;

    if (payload.selectedDate) {
      const { data } = await axios.get(apiUrl)
      news = [...getState().news.filteredNews, ...data]
    } else {
      const stateFiltered = getState().news.headlines.filter(({ source, title, category }) => {
        return (
          source === 'The New York Times' &&
          title.toLowerCase().includes(payload.keyword.toLowerCase()) &&
          (!payload.section || category === payload.section)
        )
      })

      news = [...getState().news.filteredNews, ...stateFiltered]
    }

    dispatch({
      type: SET_FILTERED_NEWS,
      payload: news
    })
    dispatch(fetchFilteredNewsSuccess());
  } catch (err) {
    dispatch(fetchFilteredNewsFailure());
  }
}