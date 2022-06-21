import { createContext, useContext, useReducer, useEffect } from 'react'

import PropTypes from 'prop-types'

const UserContext = createContext()

export const useUserStore = () => useContext(UserContext)

const initialState = {
  id: '',
  name: '',
}

function init() {
  const localData = localStorage.getItem('user')
  return localData ? JSON.parse(localData) : initialState
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_USER':
      return {
        id: action.id,
        name: action.name,
      }
    case 'REMOVE_USER':
      return {
        id: '',
        name: '',
      }
    default:
      return state
  }
}

function UserContextProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, initialState, init)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <UserContext.Provider value={{ user, dispatch }}>{children}</UserContext.Provider>
}

export default UserContextProvider

UserContextProvider.propTypes = {
  children: PropTypes.node,
}
