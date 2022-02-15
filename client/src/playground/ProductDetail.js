import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth, useStore, actions } from '../store'
import { convertWeiToEther } from '../helpers/helper'

import {
	Box,
	Grid,
	Typography,
	Container,
	Button,
	IconButton,
} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import AddIcon from '@mui/icons-material/Add'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import TwitterIcon from '@mui/icons-material/Twitter'
import PinterestIcon from '@mui/icons-material/Pinterest'
import RemoveIcon from '@mui/icons-material/Remove'
import GppGoodSharpIcon from '@mui/icons-material/GppGoodSharp'
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket'
import ProductList from '../components/ProductList'
import axios from 'axios'
const styleCard = {
	maxWidth: '100%',
	borderRadius: 4,
	position: 'relative',
	boxSizing: 'border-box',
	padding: '20px',
	overflow: 'visible',
	backgroundClip: 'padding-box',
	border: 'solid 4px transparent',
	transition: 'all 2s',
	backgroundColor: '#07061e',
	boxShadow: 3,
	'&:before': {
		content: '""',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		zIndex: -1,
		margin: '-2px !important',
		borderRadius: 4,
		background: 'linear-gradient(to right, #bb3bae, #5e47e8) !important',
		transition: 'all 4s',
	},
	'&:hover:before': {
		background: 'linear-gradient(to right, #5e47e8, #bb3bae) !important',
	},
}

const ProductDetail = () => {
	const [amount, setAmount] = useState(1)
	const [state, dispatch] = useStore()
	const { address } = useParams()
	const navigate = useNavigate()
	const [authState, _] = useAuth()

	const productDetail = state.products.find(prod => prod.address === address)
	const products = state.products.filter(
		prod => prod.address !== address && prod.step !== '1'
	)

	const handleBuy = async () => {
		try {
			let productPurchased = await state.marketplace.methods
				.purchaseProduct(productDetail.index)
				.send({ from: authState.account, value: productDetail.price })
			const {
				index,
				name,
				price,
				product: address,
				step,
			} = productPurchased.events.ProductPurchased.returnValues

			const res = await axios.patch(
				`http://localhost:8888/api/products/address/${address}`,
				{ user: authState.user.id, openSale: false },
				{ headers: { Authorization: `Bearer ${authState.token}` } }
			)
			const payload = {
				index,
				name,
				owner: res.data.user,
				image: res.data.image,
				createdAt: res.data.updatedAt,
				price,
				address,
				step,
			}
			dispatch(actions.productPurchased(payload))

			navigate('/dashboard')
		} catch (error) {
			console.log({ error: error.message })
			toast.error(`Failed product purchase !`, {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		}
	}

	return (
		<>
			<ToastContainer />
			<Container sx={{ mt: 4 }}>
				<Grid container spacing={4}>
					<Grid item xs={3}>
						<Box
							sx={{
								borderRadius: 4,
								color: 'white',
								height: '450px',
								mt: 1,
							}}
						>
							<Box
								sx={{
									borderRadius: 2,
									objectFit: 'cover',
									maxWidth: '100%',
									height: '100%',
								}}
								component='img'
								src='/images/header.jpg'
								alt='Product image'
							/>
						</Box>
					</Grid>
					<Grid item xs={9}>
						<Box sx={styleCard}>
							<Grid container spacing={4}>
								{/* Image */}
								<Grid item xs={5}>
									<Box
										sx={{
											borderRadius: 4,
											color: 'white',
											height: '380px',
										}}
									>
										<Box
											sx={{
												objectFit: 'cover',
												maxWidth: '100%',
												height: '100%',
											}}
											component='img'
											src={productDetail.image}
											alt='Product image'
										/>
									</Box>
								</Grid>
								<Grid item xs={7}>
									{/* Name */}
									<Typography
										sx={{ color: '#f5f5f5' }}
										component='h6'
										variant='h4'
									>
										{productDetail.name}
									</Typography>

									{/* created by */}
									<Typography sx={{ color: '#c7c4c4', mt: 1 }}>
										by{' '}
										<span style={{ fontWeight: 600, color: '#f50467' }}>
											{productDetail.owner.name}
										</span>
									</Typography>

									{/* Price */}
									<Box sx={{ mt: 2, borderBottom: '1px solid #9b99d3' }}>
										<Typography
											sx={{ color: '#c7c4c4', fontSize: '10px' }}
											component='span'
										>
											Price
										</Typography>
										<Typography sx={{ color: '#7ccdf2', fontSize: '22px' }}>
											{convertWeiToEther(productDetail.price)} Ether
										</Typography>
									</Box>

									{/* Amount */}
									<Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
										<Typography
											sx={{ color: '#c7c4c4', mr: 1, fontSize: '14px' }}
											component='span'
										>
											Số lượng:
										</Typography>
										<IconButton
											sx={{ color: '#b3acac', '&:hover': { color: '#fa42d4' } }}
											size='small'
											aria-label='delete'
											onClick={() =>
												setAmount(amount > 1 ? amount - 1 : amount)
											}
										>
											<RemoveIcon fontSize='small' />
										</IconButton>
										<Typography
											sx={{ color: '#f5f5f5', mx: 1 }}
											component='span'
										>
											{amount}
										</Typography>
										<IconButton
											sx={{ color: '#b3acac', '&:hover': { color: '#fa42d4' } }}
											size='small'
											aria-label='add'
											onClick={() => setAmount(amount + 1)}
										>
											<AddIcon fontSize='small' />
										</IconButton>
									</Box>

									{/* Buy button */}
									<Button
										sx={{
											my: 3,
											background:
												'linear-gradient(to right, #bb3bae, #5e47e8) !important',
											transition: 'all 4s',

											'&:hover': {
												background:
													'linear-gradient(to right, #5e47e8, #bb3bae) !important',
											},

											'&[disabled]': {
												background: '#230e8d!important',
												color: '#8d8d8d',
											},
										}}
										fullWidth
										size='large'
										variant='contained'
										onClick={handleBuy}
										disabled={
											productDetail.owner.address === authState.account
												? true
												: false
										}
									>
										Buy
									</Button>

									{/* Share icons */}
									<Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
										<Typography
											sx={{ color: '#c7c4c4', mr: 1, fontSize: '14px' }}
											component='span'
										>
											Chia sẻ:
										</Typography>
										<IconButton
											sx={{ color: '#b3acac', '&:hover': { color: '#fa42d4' } }}
											size='small'
										>
											<FacebookRoundedIcon fontSize='small' />
										</IconButton>
										<IconButton
											sx={{ color: '#b3acac', '&:hover': { color: '#fa42d4' } }}
											size='small'
										>
											<TwitterIcon fontSize='small' />
										</IconButton>
										<IconButton
											sx={{ color: '#b3acac', '&:hover': { color: '#fa42d4' } }}
											size='small'
										>
											<PinterestIcon fontSize='small' />
										</IconButton>
									</Box>

									{/* Protect info */}
									<Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
										<IconButton
											sx={{ color: '#b3acac', '&:hover': { color: '#fa42d4' } }}
											size='small'
										>
											<GppGoodSharpIcon fontSize='small' />
										</IconButton>
										<Typography
											sx={{ color: '#f5f5f5', mx: 1, fontSize: '14px' }}
											component='span'
										>
											Chính sách bảo mật (SSL thông tin sẽ được bảo mật)
										</Typography>
									</Box>
									<Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
										<IconButton
											sx={{ color: '#b3acac', '&:hover': { color: '#fa42d4' } }}
											size='small'
										>
											<AirplaneTicketIcon fontSize='small' />
										</IconButton>
										<Typography
											sx={{ color: '#f5f5f5', mx: 1, fontSize: '14px' }}
											component='span'
										>
											Chính sách giao hàng (đảm bảo giao hàng đúng hẹn)
										</Typography>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Container>

			{products.length && (
				<Container>
					<Typography
						sx={{ mt: 5, mb: 2 }}
						align='left'
						variant='h5'
						color='white'
					>
						Orther Product
					</Typography>
					<ProductList products={products} />
					<Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
						<Button color='primary' variant='outlined'>
							Show More
						</Button>
					</Box>
				</Container>
			)}
		</>
	)
}

export default ProductDetail
