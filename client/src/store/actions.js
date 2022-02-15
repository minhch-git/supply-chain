import { CREATE_PRODUCT, GET_MARKET_DATA, PRODUCT_PURCHASED } from './contants'

export const createProduct = payload => {
	return {
		type: CREATE_PRODUCT,
		payload,
	}
}
export const getMarketData = payload => {
	return {
		type: GET_MARKET_DATA,
		payload,
	}
}
export const productPurchased = payload => {
	return {
		type: PRODUCT_PURCHASED,
		payload,
	}
}
