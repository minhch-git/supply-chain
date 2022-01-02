import React, { useEffect, useState } from 'react'
import ItemManagerContract from './contracts/ItemManager.json'
import getWeb3 from './getWeb3'
import Navbar from './components/Navbar'
import ItemManager from './components/ItemManager'
import { Typography } from '@mui/material'

const initState = {
	loaded: false,
	item: {},
	itemManager: {},
	items: [],
}

const App = () => {
	const [state, setState] = useState(initState)
	const [accounts, setAccounts] = useState([])
	useEffect(() => {
		const loadBlockChainData = async () => {
			try {
				const web3 = await getWeb3()
				window.web3 = web3
				setAccounts(await web3.eth.getAccounts())

				const networkId = await web3.eth.net.getId()

				const itemManager = new web3.eth.Contract(
					ItemManagerContract.abi,
					ItemManagerContract.networks[networkId] &&
						ItemManagerContract.networks[networkId].address
				)

				const lastItemIndex = await itemManager.methods.itemIndex().call()
				let items = []
				for (let i = 0; i < parseInt(lastItemIndex); i++) {
					const item = await itemManager.methods.items(i).call()
					items = [...items, item]
				}
				setState({
					...state,
					itemManager,
					loaded: true,
					items: [...state.items, ...items],
				})
			} catch (error) {
				alert(
					`Failed to load web3, accounts, or contract. Check console for details.`
				)
				console.error({ error })
			}
		}
		loadBlockChainData()
	}, [accounts, state])

	const createItem = async item => {
		setState({ ...state, loaded: false })
		let result = await state.itemManager.methods
			.createItem(item.itemName, item.cost)
			.send({ from: accounts[0] })
		const { _itemAddress, _step } = await result.events.SupplyChainStep
			.returnValues

		const newItem = {
			_item: _itemAddress,
			_state: _step,
			_itemPrice: item.cost,
			_identifier: item.itemName,
		}
		setState({ ...state, loaded: true, items: [...state.items, newItem] })
	}

	return (
		<div className='App'>
			<Navbar account={accounts[0]} />
			{!state.loaded && (
				<Typography variant='h6' align='center' mt={3} components='div'>
					Loading...
				</Typography>
			)}
			{state.loaded && (
				<ItemManager createItem={createItem} items={state.items} />
			)}
		</div>
	)
}

export default App
