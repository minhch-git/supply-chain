import {
	SIGNING,
	GET_TOKEN,
	GET_USER,
	SIGN_OUT,
	SET_ACCOUNT,
} from './auth-contants'

export const setAccount = payload => {
	return {
		type: SET_ACCOUNT,
		payload,
	}
}
export const signing = () => {
	return {
		type: SIGNING,
	}
}

export const getToken = payload => {
	return {
		type: GET_TOKEN,
		payload,
	}
}

export const getUser = payload => {
	return {
		type: GET_USER,
		payload,
	}
}

export const signOut = () => {
	return {
		type: SIGN_OUT,
	}
}
