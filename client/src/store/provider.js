import { useReducer, useState } from 'react'
import Context, { AuthContext } from './context'
import reducer, { initialState } from './reducer'

const Provider = ({ children }) => {
	const value = useReducer(reducer, initialState)
	return <Context.Provider value={value}>{children}</Context.Provider>
}

const AuthProvider = ({ children }) => {
	const value = useState('')
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export { AuthProvider }
export default Provider
