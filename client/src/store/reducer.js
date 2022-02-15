import { CREATE_PRODUCT, GET_MARKET_DATA, PRODUCT_PURCHASED } from './contants'

const initialState = {
	marketplace: {},
	products: [],
}

const reducer = (state, action) => {
	switch (action.type) {
		case PRODUCT_PURCHASED:
			const prodPurchased = action.payload

			const prodIndex = state.products.findIndex(
				prod => prod.address === prodPurchased.address
			)

			state.products[prodIndex] = {
				...prodPurchased,
				owner: prodPurchased.owner,
			}
			console.log({ Prd2: state.products[prodIndex] })
			return {
				...state,
			}

		case CREATE_PRODUCT:
			const product = action.payload
			return { ...state, products: [product, ...state.products] }

		case GET_MARKET_DATA:
			const { marketplace, products } = action.payload
			return {
				...state,
				marketplace,
				products,
			}

		default:
			return state
	}
}

export { initialState }
export default reducer
