import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPreferredAuthors, fetchUserPreferredCategories, fetchUserPreferredSources } from "../actions/userPreferences";
import HeaderNav from "../components/HeaderNav";
import NewsCard from "../components/NewsCard"
import FilterInputComponent from "../components/FilterInputComponent";

const HomePage = () => {
  const dispatch = useDispatch()

  const { isUserLoggedIn, user_id } = useSelector((state) => state.user)

  useEffect(() => {
    if (isUserLoggedIn && user_id !== 0) {
      dispatch(fetchUserPreferredSources({ user_id }))
      dispatch(fetchUserPreferredCategories({ user_id }))
      dispatch(fetchUserPreferredAuthors({ user_id }))
    }
  }, [isUserLoggedIn, user_id])

  return (
    <>
      <HeaderNav />
      <FilterInputComponent />
      <NewsCard />
    </>
  );
}

export default HomePage