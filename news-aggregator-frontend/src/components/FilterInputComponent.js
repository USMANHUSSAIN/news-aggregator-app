import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredNewYorkTimesApi, fetchFilteredNewsApi, fetchFilteredNewsRequest, fetchFilteredTheGuardianApi, unmountFilteredNews } from '../actions/newsActions';
import { FaSearch } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import Utils from '../utils';

import 'react-datepicker/dist/react-datepicker.css';
import { filterOnUserPreferences } from '../actions/userPreferences';

const SearchAndFilter = () => {
  const dispatch = useDispatch()

  const { isHeadlineLoading, isSearchLoading, categories, isSearchedNews } = useSelector((state) => state.news)

  const { monthAgoDate, todaysDate } = Utils.getDefaultSearchDate()

  const [keyword, setKeyword] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState({ value: '', label: '' });
  const [filterSource, setFilterSource] = useState({ value: '', label: '' });

  useEffect(() => {
    if (!keyword) {
      dispatch(unmountFilteredNews())
      setFilterDate('')
      setFilterCategory({ value: '', label: '' })
      setFilterSource({ value: '', label: '' })
    }
  }, [keyword]);

  const onKeywordSearch = (e) => {
    if (e.key === 'Enter') {

      if (filterSource?.value) {
        switch (filterSource?.value) {
          case 'news-api':
            dispatch(fetchFilteredNewsRequest())
            dispatch(fetchFilteredNewsApi({
              keyword,
              selectedDate: filterDate && Utils.getFormattedDate(filterDate)
            }))
            break;

          case 'guardian':
            dispatch(fetchFilteredNewsRequest())
            dispatch(fetchFilteredTheGuardianApi({
              keyword,
              section: filterCategory?.value,
              selectedDate: filterDate && Utils.getFormattedDate(filterDate)
            }))
            break;

          case 'nyt':
            dispatch(fetchFilteredNewsRequest())
            dispatch(fetchFilteredNewYorkTimesApi({
              keyword,
              section: filterCategory?.value,
              selectedDate: filterDate && Utils.getFormattedDate(filterDate)
            }))
            break;

          default:
            break;
        }
      } else {
        dispatch(fetchFilteredNewsRequest())
        dispatch(fetchFilteredNewsApi({
          keyword,
          selectedDate: filterDate && Utils.getFormattedDate(filterDate)
        }))
        dispatch(fetchFilteredTheGuardianApi({
          keyword,
          section: filterCategory?.value,
          selectedDate: filterDate && Utils.getFormattedDate(filterDate)
        }))
        dispatch(fetchFilteredNewYorkTimesApi({
          keyword,
          section: filterCategory?.value,
          selectedDate: filterDate && Utils.getFormattedDate(filterDate)
        }))
      }
    }
  };

  const onCategoryFilter = (selected) => {
    setFilterCategory(selected)

    if (filterSource?.value) {
      switch (filterSource?.value) {
        case 'guardian':
          dispatch(fetchFilteredNewsRequest())
          dispatch(fetchFilteredTheGuardianApi({
            keyword,
            section: selected?.value,
            selectedDate: filterDate && Utils.getFormattedDate(filterDate)
          }))
          break;

        case 'nyt':
          dispatch(fetchFilteredNewsRequest())
          dispatch(fetchFilteredNewYorkTimesApi({
            keyword,
            section: selected?.value,
            selectedDate: filterDate && Utils.getFormattedDate(filterDate)
          }))
          break;

        default:
          break;
      }
    } else {
      dispatch(fetchFilteredNewsRequest())
      dispatch(fetchFilteredTheGuardianApi({
        keyword,
        section: selected?.value,
        selectedDate: filterDate && Utils.getFormattedDate(filterDate)
      }))
      dispatch(fetchFilteredNewYorkTimesApi({
        keyword,
        section: selected?.value,
        selectedDate: filterDate && Utils.getFormattedDate(filterDate)
      }))
    }
  }

  const onDateFilter = (date) => {
    const formattedDate = Utils.getFormattedDate(date)
    setFilterDate(date)

    if (filterSource?.value) {
      switch (filterSource?.value) {
        case 'news-api':
          dispatch(fetchFilteredNewsRequest())
          dispatch(fetchFilteredNewsApi({
            keyword,
            selectedDate: formattedDate
          }))
          break;

        case 'guardian':
          dispatch(fetchFilteredNewsRequest())
          dispatch(fetchFilteredTheGuardianApi({
            keyword,
            section: filterCategory?.value,
            selectedDate: formattedDate
          }))
          break;

        case 'nyt':
          dispatch(fetchFilteredNewsRequest())
          dispatch(fetchFilteredNewYorkTimesApi({
            keyword,
            section: filterCategory?.value,
            selectedDate: formattedDate
          }))
          break;

        default:
          break;
      }
    } else {
      dispatch(fetchFilteredNewsRequest())
      dispatch(fetchFilteredNewsApi({
        keyword,
        selectedDate: formattedDate
      }))
      dispatch(fetchFilteredTheGuardianApi({
        keyword,
        section: filterCategory?.value,
        selectedDate: formattedDate
      }))
      dispatch(fetchFilteredNewYorkTimesApi({
        keyword,
        section: filterCategory?.value,
        selectedDate: formattedDate
      }))
    }
  }

  const onSourceFilter = (source) => {
    setFilterSource(source)

    switch (source?.value) {
      case 'news-api':
        dispatch(fetchFilteredNewsRequest())
        dispatch(fetchFilteredNewsApi({
          keyword,
          selectedDate: filterDate && Utils.getFormattedDate(filterDate)
        }))
        setFilterCategory({ value: '', label: '' })
        break;

      case 'guardian':
        dispatch(fetchFilteredNewsRequest())
        dispatch(fetchFilteredTheGuardianApi({
          keyword,
          section: filterCategory?.value,
          selectedDate: filterDate && Utils.getFormattedDate(filterDate)
        }))
        break;

      case 'nyt':
        dispatch(fetchFilteredNewsRequest())
        dispatch(fetchFilteredNewYorkTimesApi({
          keyword,
          section: filterCategory?.value,
          selectedDate: filterDate && Utils.getFormattedDate(filterDate)
        }))
        break;

      default:
        break;
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-4 w-full">
      <div className="relative">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={onKeywordSearch}
          placeholder="Search by keyword..."
          className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10 w-full ${(isHeadlineLoading || isSearchLoading) && 'bg-gray-200'}`}
          disabled={isSearchLoading || isHeadlineLoading}
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600" />
      </div>
      {isSearchedNews && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <DatePicker
              selected={filterDate}
              onChange={(date) => onDateFilter(date)}
              placeholderText="Filter by Date"
              className={`mt-4 w-full rounded-md ${isSearchLoading || isHeadlineLoading ? 'bg-gray-200' : ''}`}
              minDate={new Date(monthAgoDate)}
              maxDate={new Date(todaysDate)}
              wrapperClassName='w-full'
              disabled={isSearchLoading || isHeadlineLoading}
            />
          </div>
          <div className="col-span-1">
            <Select
              value={filterCategory?.value ? filterCategory : ''}
              onChange={(selectedOption) => onCategoryFilter(selectedOption)}
              options={categories}
              placeholder="Filter by Category"
              className="mt-4 w-full"
              isDisabled={isHeadlineLoading || isSearchLoading || filterSource?.value === 'news-api'}
              isClearable
            />
          </div>
          <div className="col-span-1">
            <Select
              value={filterSource?.value ? filterSource : ''}
              onChange={(selectedOption) => onSourceFilter(selectedOption)}
              options={Utils.sourceFilterOptions()}
              placeholder="Filter by Source"
              className="mt-4 w-full"
              isDisabled={isHeadlineLoading || isSearchLoading}
              isClearable
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
