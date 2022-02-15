import { convertStepToState, convertWeiToEther } from '../helpers/helper'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
} from '@mui/material'

const styleTableContainer = {
	maxWidth: '100%',
	borderRadius: 4,
	position: 'relative',
	boxSizing: 'border-box',
	paddingLeft: '8px',
	paddingRight: '8px',
	overflow: 'visible',
	backgroundClip: 'padding-box',
	border: 'solid 2px transparent',
	transition: 'all 2s',
	backgroundColor: '#0e0d24',
	boxShadow: 3,
	'&:before': {
		content: '""',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		zIndex: -1,
		margin: '-2px !important',
		borderRadius: 4,
		background: 'linear-gradient(to right, #bb3bae, #5e47e8) !important',
		transition: 'all 4s',
	},
	'&:hover': {
		backgroundColor: '#1a1a2c',
	},
	'&:hover:before': {
		background: 'linear-gradient(to right, #5e47e8, #bb3bae) !important',
	},
}

const styleTableCell = { color: '#ffffff', fontWeight: '500', fontSize: '18px' }
const styleTableBodyCell = { color: '#ffffff', fontSize: '16px' }

const ProductTable = ({ products }) => {
	return (
		<TableContainer sx={styleTableContainer} component={Paper}>
			<Table
				sx={{ minWidth: 650, color: '#fff' }}
				size='small'
				aria-label='a dense table'
			>
				<TableHead>
					<TableRow sx={{ height: '60px' }}>
						<TableCell sx={styleTableCell}>Product Name</TableCell>
						<TableCell sx={styleTableCell} align='right'>
							Price (ETH)
						</TableCell>
						<TableCell sx={styleTableCell} align='right'>
							Created At
						</TableCell>
						<TableCell sx={styleTableCell} align='right'>
							State
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{products.length <= 0 && (
						<>
							<TableRow>
								<TableCell colSpan={4}>
									<Typography sx={{ my: 3 }} align='center' color='#fff'>
										Nothing to show.
									</Typography>
								</TableCell>
							</TableRow>
						</>
					)}
					{products.map(product => (
						<TableRow
							key={product.address}
							sx={{
								'&:last-child td, &:last-child th': { border: 0 },
								height: '42px',
							}}
						>
							<TableCell sx={styleTableBodyCell} component='th' scope='row'>
								{product.name}
							</TableCell>
							<TableCell sx={styleTableBodyCell} align='right'>
								{convertWeiToEther(product.price)}
							</TableCell>
							<TableCell sx={styleTableBodyCell} align='right'>
								{new Date(product.createdAt).toLocaleDateString()}
							</TableCell>

							<TableCell sx={styleTableBodyCell} align='right'>
								{convertStepToState(product.step)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default ProductTable
