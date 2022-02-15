import { Box, Container, Typography } from '@mui/material'

function Contact() {
	return (
		<Container sx={{ my: 4 }}>
			<Box
				sx={{
					minHeight: '40vh',
					background:
						'linear-gradient(to bottom, rgba(46, 46, 46, 0.6), rgba(95, 71, 231, 0.8)), url("images/map.png")',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					sx={{ borderBottom: '2px solid orange' }}
					variant='h5'
					component='p'
					color='white'
				>
					Contact Us
				</Typography>
			</Box>
		</Container>
	)
}
export default Contact
