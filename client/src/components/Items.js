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

const Items = ({ items }) => {
	const createData = (address, name, price, _state) => {
		console.log({ _state })
		let state =
			(_state === '0' && 'Created') ||
			(_state === '1' && 'Paid') ||
			(_state === '2' && 'Delivered')
		return { address, name, price, state }
	}
	const rows = items.map(item =>
		createData(item._item, item._itemPrice, item._identifier, item._state)
	)

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
								Owner
							</TableCell>
							<TableCell sx={{ fontWeight: 600 }} align='center'>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{rows.map(row => (
							<TableRow key={row.address}>
								<TableCell align='center'>{row.name}</TableCell>
								<TableCell align='center'>{row.price}</TableCell>
								<TableCell align='center'>{row.state}</TableCell>
								<TableCell align='center'>{row.address}</TableCell>
								<TableCell align='center'>
									<Button size='small' variant='contained'>
										Buy
									</Button>
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
