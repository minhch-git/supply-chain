import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { actions, useStore, useAuth } from '../store'
import { ToastContainer, toast } from 'react-toastify'

import {
	Button,
	Container,
	InputAdornment,
	Box,
	Typography,
} from '@mui/material'
import Input from '../components/Input'
import ButtonMain from '../components/ButtonMain'
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
		margin: '-4px !important',
		borderRadius: 4,
		background: 'linear-gradient(to right, #bb3bae, #5e47e8) !important',
		transition: 'all 4s',
	},
	'&:hover:before': {
		background: 'linear-gradient(to right, #5e47e8, #bb3bae) !important',
	},
}
const styleImagePreviewContainer = {
	marginTop: '4px',
	maxWidth: '544px',
	maxheight: '400px',
	objectFit: 'cover',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}
const NewProductForm = () => {
	const [prodObject, setProdObject] = useState({ name: '', price: '' })
	const inputImageRef = useRef()
	const [imageProduct, setImageProduct] = useState('')
	const [disableSubmit, setDisableSubmit] = useState(true)
	const navigate = useNavigate()
	const [authState, _] = useAuth()
	const [state, dispatch] = useStore()

	useEffect(() => {
		return () => {
			imageProduct && URL.revokeObjectURL(imageProduct.preview)
		}
	}, [imageProduct])

	const handleChangeInput = e => {
		let input = e.target
		setProdObject({ ...prodObject, [input.name]: input.value })

		prodObject.name.trim() &&
		prodObject.price &&
		prodObject.price >= 0 &&
		prodObject.price <= 100
			? setDisableSubmit(false)
			: setDisableSubmit(true)
	}
	const handleImageChange = () => {
		const file = inputImageRef.current.files[0]
		file.preview = URL.createObjectURL(file)
		setImageProduct(file)
	}

	const handelAddProduct = async () => {
		try {
			let productPrice = window.web3.utils.toWei(prodObject.price, 'ether')
			let productName = prodObject.name

			if (!imageProduct) {
				return toast.error(`Please add an image for the product!`, {
					position: toast.POSITION.BOTTOM_RIGHT,
				})
			}

			const productCreated = await state.marketplace.methods
				.createProduct(productName, productPrice)
				.send({ from: authState.account })

			const { name, index, price, product, step } =
				productCreated.events.ProductCreated.returnValues

			delete imageProduct.preview
			let formData = new FormData()
			formData.append('productImage', imageProduct)
			formData.append('name', name)
			formData.append('price', price)
			formData.append('user', authState.id)
			formData.append('address', product)
			const res = await axios.post(
				'http://localhost:8888/api/products/',
				formData,
				{
					headers: {
						'Context-Type': 'multipart/form-data',
						Authorization: `Bearer ${authState.token}`,
					},
					onUploadProgress: x => {
						if (x.total < 1024000)
							return toast.info('Uploading...', {
								position: toast.POSITION.TOP_RIGHT,
							})
					},
				}
			)
			const payload = {
				name,
				index,
				price,
				owner: res.data.user,
				address: product,
				step,
				openSale: res.data.openSale,
				image: res.data.image,
				createdAt: res.data.createdAt,
			}

			dispatch(actions.createProduct(payload))
			navigate('/dashboard')
		} catch (error) {
			console.log({ error: error.message })
			toast.error(`Create product failure !`, {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		}
	}
	return (
		<>
			<Container sx={{ ...styleCard, mt: 4 }} maxWidth='sm'>
				<Typography
					sx={{
						fontWeight: 600,
						color: '#5e47e8',
					}}
					variant='h4'
					align='center'
					component='h4'
					mt={4}
					mb={4}
				>
					New Product
				</Typography>

				<Input
					name='name'
					id='name'
					text='Name'
					value={prodObject.name}
					handleChange={handleChangeInput}
				/>

				<Input
					name='price'
					text='Price'
					id='price'
					value={prodObject.price}
					endAdornment={
						<InputAdornment position='end'>
							<Typography variant='span' sx={{ color: 'white' }}>
								ETH
							</Typography>
						</InputAdornment>
					}
					inputProps={{
						type: 'number',
					}}
					handleChange={handleChangeInput}
				/>

				{/* upload image */}
				<label htmlFor='contained-button-file'>
					<input
						accept='image/*'
						id='contained-button-file'
						multiple
						type='file'
						style={{ display: 'none' }}
						ref={inputImageRef}
						onChange={handleImageChange}
					/>
					<Button variant='contained' component='span'>
						Upload
					</Button>
				</label>

				{/* Preview image */}
				{imageProduct && (
					<Box sx={styleImagePreviewContainer}>
						<img
							style={{ maxWidth: '100%', maxHeight: '100%' }}
							src={imageProduct.preview}
							alt='File error'
						/>
					</Box>
				)}

				<ButtonMain
					text='Add Product'
					sx={{ my: 3 }}
					handelClick={handelAddProduct}
					isDisabled={disableSubmit}
				/>
			</Container>
			<ToastContainer autoClose={4000} />
		</>
	)
}

export default NewProductForm
