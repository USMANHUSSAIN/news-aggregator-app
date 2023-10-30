import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postUserLogin, postUserRegister } from '../actions/userAction';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';

const UserFormTooltip = () => {
  const dispatch = useDispatch()
  const [isRegister, setIsRegister] = useState(false);
  const [formPayload, setFormPayload] = useState({ email: '', password: '' })

  const { userLoading, showUserSuccess, showUserFailure } = useSelector((state) => state.user)

  const onUserRegister = () => {
    dispatch(postUserRegister(formPayload))
    setFormPayload({ email: '', password: '' })
  };

  const onUserLogin = () => {
    dispatch(postUserLogin(formPayload))
    setFormPayload({ email: '', password: '' })
  }

  return (
    <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
      <div className="py-4 px-6">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            placeholder='john.doe@mail.com'
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formPayload.email}
            onChange={(e) => setFormPayload({ ...formPayload, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formPayload.password}
            onChange={(e) => setFormPayload({ ...formPayload, password: e.target.value })}
          />
        </div>
        {isRegister ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  className="mr-2 px-4 py-2 text-sm text-white font-semibold bg-gray-500 hover:bg-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={userLoading}
                  onClick={onUserRegister}
                >
                  {userLoading ? (
                    <div className="flex items-center">
                      <AiOutlineLoading className="mr-2 animate-spin" /> Register
                    </div>
                  ) : (
                    'Register'
                  )}
                </button>
                {
                  showUserSuccess &&
                  <FaCheck className='ml-0 bg-green-500 rounded-lg text-white p-1' />
                }
                {
                  showUserFailure &&
                  <FaTimes className='ml-0 bg-red-500 rounded-lg text-white p-1' />
                }
              </div>

              <div
                className="text-sm text-gray-700 hover:underline cursor-pointer"
                onClick={() => setIsRegister(false)}
              >
                ← back to login
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  className="mr-2 px-4 py-2 text-sm text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={userLoading}
                  onClick={onUserLogin}
                >
                  {userLoading ? (
                    <div className="flex items-center">
                      <AiOutlineLoading className="mr-2 animate-spin" /> Login
                    </div>
                  ) : (
                    'Login'
                  )}
                </button>
                {
                  showUserSuccess &&
                  <FaCheck className='ml-0 bg-green-500 rounded-lg text-white p-1' />
                }
                {
                  showUserFailure &&
                  <FaTimes className='ml-0 bg-red-500 rounded-lg text-white p-1' />
                }
              </div>
              <div
                className="text-sm text-gray-700 hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                register →
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default UserFormTooltip