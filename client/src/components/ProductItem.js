import { useNavigate } from 'react-router-dom'
import { useAuth, useStore, actions } from '../store'
import { convertWeiToEther } from '../helpers/helper'
import { ToastContainer, toast } from 'react-toastify'
import QRCode from 'react-qr-code'

import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	Box,
	Button,
} from '@mui/material'
import axios from 'axios'

const styleCard = {
	maxWidth: '100%',
	borderRadius: 4,
	position: 'relative',
	boxSizing: 'border-box',
	padding: '8px',
	overflow: 'visible',
	backgroundClip: 'padding-box',
	border: 'solid 4px transparent',
	transition: 'all 2s',
	backgroundColor: '#0e0d24',
	boxShadow: 3,
	'&:before': {
		content: '""',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		zIndex: -1,
		margin: '-4px !important',
		borderRadius: 4,
		background: 'linear-gradient(to right, #bb3bae, #5e47e8) !important',
		transition: 'all 4s',
	},
	'&:hover': {
		backgroundColor: '#1a1a2c',
	},
	'&:hover:before': {
		background: 'linear-gradient(to right, #5e47e8, #bb3bae) !important',
	},
}
const styleBoxContainerOwnerInfo = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	backgroundColor: '#07061e',
	p: '4px',
	borderRadius: '20px',
	position: 'absolute',
	bottom: '-20px',
	left: '50%',
	transform: 'translateX(-50%)',
	width: '140px',
}
const styleButtonAction = {
	fontSize: '14px',
	background: 'linear-gradient(to right, #bb3bae, #5e47e8) !important',
	transition: 'all 4s',

	'&:hover': {
		background: 'linear-gradient(to right, #5e47e8, #5e47e8) !important',
	},
}

const ProductItem = ({ product }) => {
	const [authState, authDispatch] = useAuth()
	const [state, dispatch] = useStore()
	const navigate = useNavigate()
	const isOwner = product.owner.address
		? authState.account === product.owner.address
		: authState.account === product.owner

	const handleBuy = async () => {
		try {
			let productPurchased = await state.marketplace.methods
				.purchaseProduct(product.index)
				.send({ from: authState.account, value: product.price })

			const {
				index,
				name,
				owner,
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
				openSale: res.data.openSale,
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
	const handleView = () => {
		navigate(`/products/${product.address}`)
	}
	return (
		<>
			<ToastContainer autoClose={4000} />

			<Card sx={styleCard}>
				{/* Image */}
				<Box
					sx={{
						position: 'relative',
					}}
				>
					{/* Product image */}
					<CardMedia
						sx={{
							borderRadius: 4,
							objectFit: 'cover',
							color: 'white',
						}}
						component='img'
						height='280'
						image={product.image}
						alt={product.name}
						onClick={handleView}
					/>
					{/* Owner info */}
					<Box sx={styleBoxContainerOwnerInfo}>
						<Avatar
							sx={{
								width: 28,
								height: 28,
								fontSize: '12px',
								backgroundColor: '#411683',
							}}
							src='Profile picture owner '
						>
							{product.owner.name
								? product.owner.name.split('')[0]
								: product.owner.split('')[0]}
						</Avatar>
						<Typography sx={{ mr: '4px' }} variant='body2' color='white'>
							{product.owner.name
								? product.owner.name.length < 9
									? product.owner.name
									: `${product.owner.name.slice(0, 9)}..`
								: `${product.owner.slice(0, 9)}..`}
						</Typography>
					</Box>
				</Box>
				{/* Product description */}
				<CardContent sx={{ px: '4px', mt: 2 }}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Box>
							<Typography
								sx={{
									fontWeight: '500',
								}}
								color='white'
							>
								{product.name}
							</Typography>

							<Typography
								sx={{
									color: '#ebebeb',
									fontSize: '14px',
								}}
							>
								Price: &nbsp;
								<Typography
									sx={{
										color: '#8d89a2',
										fontSize: '14px',
										display: 'inline-block',
									}}
									component='span'
								>
									{convertWeiToEther(product.price)} ETH
								</Typography>
							</Typography>
						</Box>
						<QRCode value={product.address} level='M' size={40} />
					</Box>
				</CardContent>
				<CardActions>
					<Button
						sx={styleButtonAction}
						fullWidth
						variant='contained'
						onClick={isOwner ? handleView : handleBuy}
					>
						{isOwner ? 'View' : 'Buy'}
					</Button>
				</CardActions>
			</Card>
		</>
	)
}

export default ProductItem
