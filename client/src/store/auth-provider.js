import { useReducer } from 'react'
import AuthReducer, { initial_auth_state } from './auth-reducer'
import AuthContext from './auth-context'

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, initial_auth_state)
	return (
		<AuthContext.Provider value={[state, dispatch]}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
