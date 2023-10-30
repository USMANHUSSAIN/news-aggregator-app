import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Utils from '../utils';
import { deleteUserPreferredAuthors, deleteUserPreferredCategories, deleteUserPreferredSources, postUserPreferredAuthors, postUserPreferredCategories, postUserPreferredSources } from '../actions/userPreferences';

const UserPreferencesModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()

  const previousSelectedCategoriesRef = useRef([]);
  const previousSelectedAuthorsRef = useRef([]);
  const previousSelectedSourcesRef = useRef([]);

  const { user_id } = useSelector((state) => state.user)
  const { categories, authors } = useSelector((state) => state.news);
  const { preferredCategories, preferredAuthors, preferredSources } = useSelector((state) => state.userPreferences)

  const [selectedCategories, setSelectedCategories] = useState(preferredCategories);
  const [selectedAuthors, setSelectedAuthors] = useState(preferredAuthors);
  const [selectedSources, setSelectedSources] = useState(preferredSources);

  useEffect(() => {
    if (preferredCategories.length) {
      setSelectedCategories(preferredCategories)
    }
    if (preferredAuthors.length) {
      setSelectedAuthors(preferredAuthors)
    }
    if (preferredSources.length) {
      setSelectedSources(preferredSources)
    }
  },
    [preferredCategories, preferredAuthors, preferredSources]
  )

  useEffect(() => {
    previousSelectedCategoriesRef.current = selectedCategories;
    previousSelectedAuthorsRef.current = selectedAuthors;
    previousSelectedSourcesRef.current = selectedSources;
  });

  const onCategoryChange = (selectedOptions) => {
    const previousSelectedCategories = previousSelectedCategoriesRef.current;
    const selectedValues = selectedOptions.map((option) => option.value);

    const deletedCategories = previousSelectedCategories.filter(
      (category) => !selectedValues.includes(category.value)
    );

    const addedCategories = selectedOptions.filter(
      (option) => !previousSelectedCategories.find((category) => category.value === option.value)
    );

    setSelectedCategories(selectedOptions);

    if (addedCategories.length) {
      dispatch(postUserPreferredCategories({
        user_id,
        value: addedCategories[0].value,
        label: addedCategories[0].label
      }))
    } else if (deletedCategories.length) {
      dispatch(deleteUserPreferredCategories({
        user_id,
        value: deletedCategories[0].value
      }))
    }
  };

  const onAuthorChange = (selectedOptions) => {
    const previousSelectedAuthors = previousSelectedAuthorsRef.current;
    const selectedValues = selectedOptions.map((option) => option.value);

    const deletedAuthors = previousSelectedAuthors.filter(
      (author) => !selectedValues.includes(author.value)
    );

    const addedAuthors = selectedOptions.filter(
      (option) => !previousSelectedAuthors.find((author) => author.value === option.value)
    );

    setSelectedAuthors(selectedOptions);


    if (addedAuthors.length) {
      dispatch(postUserPreferredAuthors({
        user_id,
        value: addedAuthors[0].value,
        label: addedAuthors[0].label
      }))
    } else if (deletedAuthors.length) {
      dispatch(deleteUserPreferredAuthors({
        user_id,
        value: deletedAuthors[0].value
      }))
    }
  };

  const onSourceChange = (selectedOptions) => {
    const previousSelectedSources = previousSelectedSourcesRef.current;
    const selectedValues = selectedOptions.map((option) => option.value);

    const deletedSources = previousSelectedSources.filter(
      (source) => !selectedValues.includes(source.value)
    );

    const addedSources = selectedOptions.filter(
      (option) => !previousSelectedSources.find((source) => source.value === option.value)
    );

    setSelectedSources(selectedOptions);

    if (addedSources.length) {
      dispatch(postUserPreferredSources({
        user_id,
        value: addedSources[0].value,
        label: addedSources[0].label
      }))
    } else if (deletedSources.length) {
      dispatch(deleteUserPreferredSources({
        user_id,
        value: deletedSources[0].value
      }))
    }
  };


  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="modal modal-open">
        <div className="modal-box">
          <div className="modal-content">
            <div className="modal-header flex justify-between items-center mb-8">
              <div></div>
              <h3 className="modal-title text-end font-bold text-2xl">User Preferences</h3>
              <button className="modal-close" onClick={onClose}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-6">
                <label htmlFor="categories" className="block font-medium mb-1">
                  Categories
                </label>
                <Select
                  id="categories"
                  placeholder="Select by Categories..."
                  options={categories}
                  value={selectedCategories}
                  isClearable={false}
                  isMulti
                  onChange={onCategoryChange}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="authors" className="block font-medium mb-1">
                  Authors
                </label>
                <Select
                  id="authors"
                  placeholder="Select by Authors..."
                  options={authors}
                  value={selectedAuthors}
                  isClearable={false}
                  isMulti
                  onChange={onAuthorChange}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="sources" className="block font-medium mb-1">
                  Sources
                </label>
                <Select
                  id="sources"
                  placeholder="Select by Sources..."
                  options={Utils.sourceFilterOptions()}
                  value={selectedSources}
                  isClearable={false}
                  isMulti
                  onChange={onSourceChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesModal;
