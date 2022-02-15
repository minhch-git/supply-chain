import { useContext } from 'react'
import Context from './context'
import AuthContext from './auth-context'

export const useStore = () => {
	const value = useContext(Context)
	return value
}

export const useAuth = () => {
	const [authState, authDispatch] = useContext(AuthContext)
	return [authState, authDispatch]
}
