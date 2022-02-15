import { useState } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import { ToastContainer, toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import ButtonMain from '../components/ButtonMain'
import Input from '../components/Input'
import { authActions, useAuth } from '../store'

export default function SignInSide() {
	const [authState, authDispatch] = useAuth()
	const [dataSignIn, setDataSignIn] = useState({
		address: authState.account.toString(),
		password: '',
	})
	const [dataSignUp, setDataSignUp] = useState({
		name: '',
		address: authState.account.toString(),
		password: '',
	})
	const [isLoginPage, setIsLoginPage] = useState(true)

	const handleChange = e => {
		isLoginPage &&
			setDataSignIn({
				...dataSignIn,
				[e.target.name]: e.target.value.toString(),
			})
		!isLoginPage &&
			setDataSignUp({
				...dataSignUp,
				[e.target.name]: e.target.value.toString(),
			})
	}
	const handleTogglePage = () => {
		setIsLoginPage(!isLoginPage)
	}

	const signIn = async () => {
		if (
			!dataSignIn.address ||
			!dataSignIn.password ||
			!dataSignIn.password.length > 6
		)
			return toast.error(`Please fill in all fields!`, {
				position: toast.POSITION.BOTTOM_RIGHT,
			})

		try {
			await axios.post('http://localhost:8888/api/auth/signing', dataSignIn, {
				withCredentials: true,
			})
			localStorage.setItem('_appSignging', true)
			authDispatch(authActions.signing())
		} catch (err) {
			console.log(err.response)
			const message = Array.isArray(err.response.data.error)
				? err.response.data.error[0]
				: err.response.data.message
			return toast.error(message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		}
	}

	const signUp = async () => {
		if (
			!dataSignUp.name ||
			!dataSignUp.address ||
			!dataSignUp.password ||
			!dataSignUp.password.length > 6
		)
			return toast.error(`Please fill in all fields!`, {
				position: toast.POSITION.BOTTOM_RIGHT,
			})

		try {
			const res = await axios.post(
				'http://localhost:8888/api/auth/signup',
				dataSignUp
			)
			setIsLoginPage(true)
			return toast.info(res.data.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		} catch (err) {
			console.log(err.response)
			const message = Array.isArray(err.response.data.error)
				? err.response.data.error[0]
				: err.response.data.message
			return toast.error(message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		}
	}

	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<ToastContainer autoClose={2000} />

			{isLoginPage && (
				<Grid item xs={12} sm={8} md={5}>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography
							component='h1'
							variant='h5'
							sx={{ color: 'white', mb: 2 }}
						>
							Sign In
						</Typography>
						<Box sx={{ mt: 1 }}>
							<Input
								name='address'
								id='address'
								text='Address'
								value={dataSignIn.address}
								handleChange={handleChange}
							/>
							<Input
								name='password'
								id='password'
								text='Password'
								inputProps={{
									type: 'password',
								}}
								value={dataSignIn.password}
								handleChange={handleChange}
							/>

							<ButtonMain
								handelClick={signIn}
								text='Sign in'
								sx={{ mt: 1, mb: 2 }}
							/>
							<Grid container>
								<Grid item xs>
									<Box
										sx={{ cursor: 'pointer', color: '#aa9bab' }}
										component='span'
										variant='body2'
									>
										Forgot password?
									</Box>
								</Grid>
								<Grid item>
									<Box
										sx={{ cursor: 'pointer', color: '#aa9bab' }}
										variant='body2'
										onClick={handleTogglePage}
									>
										{"Don't have an account? Sign Up"}
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			)}

			{!isLoginPage && (
				<Grid item xs={12} sm={8} md={5}>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography
							component='h1'
							variant='h5'
							sx={{ color: 'white', mb: 2 }}
						>
							Sign Up
						</Typography>
						<Box sx={{ mt: 1 }}>
							<Input
								name='name'
								id='name'
								text='Full Name'
								value={dataSignUp.name}
								handleChange={handleChange}
							/>
							<Input
								name='address'
								id='address'
								text='Address'
								value={dataSignUp.address}
								handleChange={handleChange}
							/>
							<Input
								name='password'
								id='password'
								text='Password'
								value={dataSignUp.password}
								inputProps={{
									type: 'password',
								}}
								handleChange={handleChange}
							/>

							<ButtonMain
								handelClick={signUp}
								text='Sign up'
								sx={{ mt: 1, mb: 2 }}
							/>
							<Grid container justifyContent='flex-end'>
								<Grid item align='right'>
									<Box
										component='span'
										variant='body2'
										onClick={handleTogglePage}
										sx={{ cursor: 'pointer', color: '#aa9bab' }}
									>
										{'Already have an account? Login'}
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			)}
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: 'url("/images/loginImage.png")',
					backgroundRepeat: 'no-repeat',
					backgroundColor: t =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
		</Grid>
	)
}
