import { Box, Container, Typography } from '@mui/material'
const Header = () => {
	return (
		<Container>
			<Box
				sx={{
					minHeight: '80vh',
					background: 'url(images/header.jpg)',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: '80vh',
					}}
				>
					<Typography
						sx={{ fontWeight: 'bold', fontFamily: 'cursive', color: '#f8bbd0' }}
						variant='h2'
					>
						Find Your New Favorite
					</Typography>
					<Typography
						sx={{ fontWeight: 'bold', fontFamily: 'cursive', color: '#f8bbd0' }}
						variant='h3'
					>
						Collection at Winter
					</Typography>
					<Typography
						sx={{ fontWeight: 'bold', fontFamily: 'cursive', color: '#f8bbd0' }}
						variant='h6'
					>
						Sale 2022
					</Typography>
				</Box>
			</Box>
		</Container>
	)
}

export default Header
