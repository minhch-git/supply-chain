import { createContext } from 'react'
import { initial_auth_state } from './auth-reducer'
const AuthContext = createContext(initial_auth_state)
export default AuthContext
