import { useNavigate } from 'react-router-dom'
import { useAuth, useStore } from '../store'

import { Container, Typography, Button, Box } from '@mui/material'

// import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
// import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded'
import AddIcon from '@mui/icons-material/Add'
import ProductList from '../components/ProductList'
import ProductTable from '../components/ProductTable'

const styleButtonNewProduct = {
	color: 'white',
	border: '2px solid #5e47e8',

	'&:hover': {
		border: '2px solid #bb3bae',
	},
}

const Dashboard = () => {
	const navigateNewProduct = useNavigate()
	const [state, _] = useStore()
	const [authState, authDispatch] = useAuth()
	const products = state.products.filter(prod =>
		prod.owner.address
			? prod.owner.address === authState.account
			: prod.owner === authState.account
	)

	return (
		<>
			<Container>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography sx={{ my: 3 }} align='left' variant='h5' color='#fff'>
						Dashboard
					</Typography>
					<Button
						sx={styleButtonNewProduct}
						variant='outlined'
						startIcon={<AddIcon />}
						onClick={() => navigateNewProduct('/products/new')}
					>
						New
					</Button>
				</Box>
				<ProductTable products={products} />
				{products.length > 0 && (
					<>
						<Typography sx={{ my: 3 }} align='left' variant='h5' color='#fff'>
							Product Card
						</Typography>

						<ProductList products={products} />
					</>
				)}
			</Container>
		</>
	)
}

export default Dashboard
