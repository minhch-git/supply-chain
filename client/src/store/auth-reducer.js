import {
	SIGNING,
	GET_TOKEN,
	GET_USER,
	SIGN_OUT,
	SET_ACCOUNT,
} from './auth-contants'

const initial_auth_state = {
	user: {},
	account: '',
	isLoggedIn: false,
	token: '',
}

const AuthReducer = (state, action) => {
	switch (action.type) {
		case SET_ACCOUNT:
			return {
				...state,
				account: action.payload,
			}

		case SIGNING:
			return {
				...state,
				isLoggedIn: true,
			}
		case GET_TOKEN:
			return {
				...state,
				token: action.payload,
			}
		case GET_USER:
			return {
				...state,
				user: action.payload,
			}

		case SIGN_OUT:
			return {
				...state,
				isLoggedIn: false,
				token: '',
				user: {},
			}
		default:
			return state
	}
}

export { initial_auth_state }
export default AuthReducer
