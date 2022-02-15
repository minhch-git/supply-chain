import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import {
	AppBar,
	Box,
	Container,
	Toolbar,
	Typography,
	IconButton,
	Button,
	Menu,
	Avatar,
	Tooltip,
	MenuItem,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import BackgroundLetterAvatar from './BackgroundLetterAvatar'
import { authActions, useAuth } from '../store'
import { deepPurple } from '@mui/material/colors'

const pages = [
	{
		text: 'Home',
		link: '/',
	},
	{
		text: 'Pricing',
		link: '/pricing',
	},
]
const settings = [
	{
		text: 'Account',
		link: 'account',
	},
	{
		text: 'Dashboard',
		link: 'dashboard',
	},
]

const Navbar = ({ name }) => {
	const [anchorElUser, setAnchorElUser] = useState(null)
	let navigate = useNavigate()
	const [authState, authDispatch] = useAuth()

	const handleSwitchPage = async e => {
		navigate(`${e.currentTarget.value}`)
	}
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = event => {
		setAnchorElUser(null)
	}

	const handleLogout = async () => {
		try {
			const _appSignging = localStorage.getItem('_appSignging')
			if (_appSignging && authState.token) {
				await axios.get('http://localhost:8888/api/auth/signout', {
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${authState.token}`,
					},
				})
				localStorage.removeItem('_appSignging')
				authDispatch(authActions.signOut())
				navigate(`/`)
			}
		} catch (err) {
			return toast.error(err.response.data.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		}
	}
	return (
		<>
			<AppBar sx={{ backgroundColor: 'transparent' }} position='static'>
				<Container>
					<Toolbar disableGutters>
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								color: '#1dd6e9',
								fontWeight: 600,
							}}
						>
							MARKET-PLACE
						</Typography>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'none', md: 'flex' },
								justifyContent: 'center',
								marginLeft: '-172.812px',
							}}
						>
							{pages.map(page => (
								<Button
									key={page.text}
									value={page.link}
									onClick={handleSwitchPage}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page.text}
								</Button>
							))}
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							{name && (
								<Tooltip title='Open settings'>
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar sx={{ bgcolor: deepPurple[500] }}>
											{name.split('')[0]}
										</Avatar>
									</IconButton>
								</Tooltip>
							)}
							<Menu
								sx={{ mt: '45px' }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map(setting => (
									<Link
										key={setting.text}
										to={`${setting.link}`}
										style={{ textDecoration: 'none' }}
										onClick={handleCloseUserMenu}
									>
										<MenuItem>
											<Typography textAlign='center'>{setting.text}</Typography>
										</MenuItem>
									</Link>
								))}

								<MenuItem>
									<Typography textAlign='center' onClick={handleLogout}>
										Logout
									</Typography>
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<ToastContainer />
		</>
	)
}

export default Navbar
