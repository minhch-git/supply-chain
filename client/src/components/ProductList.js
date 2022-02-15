import ProductItem from './ProductItem'
import { Grid } from '@mui/material'

const ProductList = ({ products }) => {
	return (
		<Grid container spacing={3}>
			{products.map(product => (
				<Grid key={product.address} item xs={3}>
					<ProductItem product={product} />
				</Grid>
			))}
		</Grid>
	)
}

export default ProductList
