import { _, useStore } from '../store'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import Contact from '../components/Contact'
import { Typography, Button, Box, Container } from '@mui/material'

const Main = () => {
	const [state, _] = useStore()
	const products = state.products.filter(prod => prod.step !== '1')
	return (
		<>
			<Header />

			<Container>
				<Typography sx={{ m: 3 }} align='center' variant='h5' color='white'>
					Popular Product
				</Typography>
				<ProductList products={products} />

				<Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
					<Button color='primary' variant='outlined'>
						Show More
					</Button>
				</Box>
			</Container>

			<Contact />
		</>
	)
}

export default Main
