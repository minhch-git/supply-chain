import {
	Container,
	Table,
	Button,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'

const Items = ({ items, triggerPayment, triggerDelivery }) => {
	const convertStepToState = state => {
		return (
			(state === '0' && 'Created') ||
			(state === '1' && 'Paid') ||
			(state === '2' && 'Delivered')
		)
	}

	const convertWeiToEther = number => {
		return window.web3.utils.fromWei(number, 'ether')
	}

	const handlePurchase = e => {
		triggerPayment(e.target.name, e.target.value)
	}

	const handleDelivery = e => {
		triggerDelivery(e.target.name, e.target.value)
	}

	return (
		<Container>
			<Typography
				sx={{ flex: '1 1 100%', fontWeight: 500 }}
				variant='h6'
				id='tableTitle'
				component='div'
			>
				Items
			</Typography>
			<TableContainer>
				<Table>
					<TableHead sx={{ background: '#c2c2db' }}>
						<TableRow>
							<TableCell sx={{ fontWeight: 600 }} align='center'>
								Name
							</TableCell>
							<TableCell sx={{ fontWeight: 600 }} align='center'>
								Price(eth)
							</TableCell>
							<TableCell sx={{ fontWeight: 600 }} align='center'>
								State
							</TableCell>
							<TableCell sx={{ fontWeight: 600 }} align='center'>
								Address Item
							</TableCell>
							<TableCell sx={{ fontWeight: 600 }} align='center'>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{items.map(item => (
							<TableRow key={item.index}>
								<TableCell align='center'>{item.identifier}</TableCell>
								<TableCell align='center'>
									{convertWeiToEther(item.price)}
								</TableCell>
								<TableCell align='center'>
									{convertStepToState(item.step)}
								</TableCell>
								<TableCell align='center'>{item.address}</TableCell>
								<TableCell align='center'>

									{
										item.step === '2' ?
										<Button
										value={item.price}
										name={item.index}
										size='small'
										variant='contained'
										disabled='true'
										>
											Done
										</Button>
										 :
										<Button
										value={item.price}
										name={item.index}
										size='small'
										variant='contained'
										onClick={item.step === '0' ? handlePurchase : handleDelivery }
										>
											{item.step === '0' ? 'Buy' : 'Delivery'}
										</Button>
									}
							
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}

export default Items
