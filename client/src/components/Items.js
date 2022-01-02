import {
	Container,
	Table,
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
				sx={{
					fontWeight: 600,
				}}
				variant='h4'
				component='h4'
				mt={4}
				mb={4}
			>
				Items
			</Typography>

			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align='center'>Address</TableCell>
							<TableCell align='center'>Name</TableCell>
							<TableCell align='center'>Price(eth)</TableCell>
							<TableCell align='center'>State</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{rows.map(row => (
							<TableRow key={row.address}>
								<TableCell align='center'>{row.address}</TableCell>
								<TableCell align='center'>{row.name}</TableCell>
								<TableCell align='center'>{row.price}</TableCell>
								<TableCell align='center'>{row.state}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}

export default Items
