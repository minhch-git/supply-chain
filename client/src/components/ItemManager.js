import { Container } from '@mui/material'
import Form from './Form'
import Items from './Items'

const ItemManager = ({ createItem, items }) => {
	return (
		<Container>
			<Form createItem={createItem} />
			<Items items={items} />
		</Container>
	)
}

export default ItemManager
