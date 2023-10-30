import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userHasLoggedIn } from "./actions/userAction";
import { Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import './App.css';

function App() {
  const dispatch = useDispatch()
  const { isUserLoggedIn } = useSelector((state) => state.user)
  const token = sessionStorage.getItem('auth_token')
  const user_info = JSON.parse(sessionStorage.getItem('user_info'))

  useEffect(() => {
    if (token) {
      dispatch(userHasLoggedIn(user_info.id))
    }
  }, [isUserLoggedIn])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
