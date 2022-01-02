import {
	Button,
	Container,
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
} from '@mui/material'
import { useState } from 'react'

const Form = ({ createItem }) => {
	const [item, setItem] = useState({
		itemName: '',
		cost: '',
	})

	const [disableSubmit, setDisableSubmit] = useState(true)

	const handleCreateItem = () => createItem(item)
	return (
		<Container maxWidth='sm'>
			<Typography
				sx={{
					fontWeight: 600,
				}}
				variant='h4'
				component='h4'
				mt={4}
				mb={4}
			>
				Add Item
			</Typography>
			<FormControl fullWidth variant='outlined'>
				<InputLabel htmlFor='outlined-adornment-itemName'>Name</InputLabel>
				<OutlinedInput
					value={item.itemName}
					id='outlined-adornment-itemName'
					onChange={e => {
						e.target.value && item.cost
							? setDisableSubmit(false)
							: setDisableSubmit(true)
						setItem({ ...item, itemName: e.target.value })
					}}
					label='name'
				/>
			</FormControl>
			<FormControl sx={{ marginTop: '20px' }} fullWidth variant='outlined'>
				<InputLabel htmlFor='outlined-adornment-cost'>Price</InputLabel>
				<OutlinedInput
					id='outlined-adornment-cost'
					value={item.cost}
					onChange={e => {
						e.target.value && item.itemName
							? setDisableSubmit(false)
							: setDisableSubmit(true)
						setItem({ ...item, cost: e.target.value })
					}}
					endAdornment={<InputAdornment position='end'>Eth</InputAdornment>}
					label='cost'
					inputProps={{
						type: 'number',
					}}
				/>
			</FormControl>
			<Button
				sx={{ width: '100%', marginTop: '20px' }}
				size='small'
				variant='contained'
				disabled={disableSubmit}
				onClick={handleCreateItem}
			>
				add item
			</Button>
		</Container>
	)
}

export default Form
