import { useState, useEffect } from 'react'
import { fetchNewYorkTimesApiHeadline, fetchNewsApiHeadline, fetchTheGuardianApiHeadline, unmountFilteredNews } from "../actions/newsActions"
import { useDispatch, useSelector } from 'react-redux';
import { filterOnUserPreferences, unmountUserPreferedNews } from '../actions/userPreferences';
import NewsSkeleton from './NewsSkeleton';

const NewsCard = () => {
  const [news, setNews] = useState([])

  const { isHeadlineLoading, isSearchLoading, isSearchedNews, isPreferredNews, headlines, filteredNews } = useSelector((state) => state.news)
  const { preferredCategories, preferredAuthors, preferredSources } = useSelector((state) => state.userPreferences)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNewsApiHeadline())
    dispatch(fetchTheGuardianApiHeadline())
    dispatch(fetchNewYorkTimesApiHeadline())
  }, [])

  useEffect(() => {
    if (preferredCategories.length || preferredAuthors.length || preferredSources.length) {
      dispatch(unmountFilteredNews())
      dispatch(filterOnUserPreferences())
    } else {
      dispatch(unmountFilteredNews())
      dispatch(unmountUserPreferedNews())
    }
  }, [preferredCategories, preferredAuthors, preferredSources])

  useEffect(() => {
    if (headlines.length) {
      setNews(headlines)
    }
  }, [headlines])

  const NewsLoadingTemplate = () => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <NewsSkeleton key={index} />
        ))}
      </div>
    </div>
  )

  const NewsCardTemplate = ({ contents }) => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {contents.map((item, index) => (
          <div key={index} className="card flex flex-col shadow-box shadow-xl select-none">
            <div className="rounded-t-lg overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-56 object-cover" />
            </div>
            <div className="card-content flex-grow p-6 flex flex-col justify-between gap-7 rounded-b-lg bg-white">
              <div className="text-justify mb-auto">
                <h2 className="text-xl font-semibold mb-2 cursor-pointer link-primary link-hover" onClick={() => window.open(item.url)}>{item.title}</h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className="text-left">
                <p className="text-gray-500">
                  <span className="font-bold text-blue-600">{item.source}</span> - <span className="font-semibold">{item.author}</span>
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">{new Date(item.createdDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  if (isHeadlineLoading || isSearchLoading) {
    return <NewsLoadingTemplate />
  } else {
    if (filteredNews.length) {
      return <NewsCardTemplate contents={filteredNews} />
    }

    if ((isPreferredNews || isSearchedNews) && !filteredNews.length) {
      return (
        <div className="flex items-center justify-center h-full mt-10">
          <h2 className="text-3xl font-bold text-gray-500">No Results Found</h2>
        </div>
      );
    }

    if (news.length) {
      return <NewsCardTemplate contents={news} />
    }
  }
};

export default NewsCard