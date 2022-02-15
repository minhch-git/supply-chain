import { Button } from '@mui/material'

const ButtonMain = ({ text, sx, handelClick, isDisabled }) => {
	return (
		<Button
			sx={{
				background: 'linear-gradient(to right, #bb3bae, #5e47e8) !important',
				transition: 'all 4s',

				'&:hover': {
					background: 'linear-gradient(to right, #5e47e8, #bb3bae) !important',
				},

				'&[disabled]': {
					background: '#230e8d!important',
					color: '#8d8d8d',
				},
				...sx,
			}}
			fullWidth
			size='large'
			variant='contained'
			onClick={handelClick}
			disabled={isDisabled}
		>
			{text}
		</Button>
	)
}

export default ButtonMain
