import { Container } from '@mui/material'
import Form from './Form'
import Items from './Items'

const ItemManager = ({ createItem, items, triggerPayment }) => {
	return (
		<Container>
			<Form createItem={createItem} />
			<Items items={items} triggerPayment={triggerPayment} />
		</Container>
	)
}

export default ItemManager
