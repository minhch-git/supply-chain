import React, { useEffect, useState } from 'react'
import ItemManagerContract from './contracts/ItemManager.json'
import getWeb3 from './getWeb3'
import Navbar from './components/Navbar'
import ItemManager from './components/ItemManager'
import { Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const initState = {
	loaded: false,
	account: '',
	item: {},
	itemManager: {},
	items: [],
}

const App = () => {
	const [state, setState] = useState(initState)
	useEffect(() => {
		const loadBlockChainData = async () => {
			try {
				const web3 = await getWeb3()
				window.web3 = web3
				const accounts = await web3.eth.getAccounts()
				const networkId = await web3.eth.net.getId()

				const itemManager = new web3.eth.Contract(
					ItemManagerContract.abi,
					ItemManagerContract.networks[networkId] &&
						ItemManagerContract.networks[networkId].address
				)

				const lastItemIndex = await itemManager.methods.itemIndex().call()
				let items = []
				for (let i = 0; i < parseInt(lastItemIndex); i++) {
					const result = await itemManager.methods.items(i).call()
					const item = {
						address: result._item,
						step: result._state,
						index: i,
						price: result._itemPrice,
						identifier: result._identifier,
					}

					items = [...items, item]
				}
				setState({
					...state,
					itemManager,
					account: accounts[0],
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
	}, [state])

	const createItem = async item => {
		try {
			setState({ ...state, loaded: false })
			let result = await state.itemManager.methods
				.createItem(item.itemName, item.cost)
				.send({ from: state.account })
			const { _itemAddress, _itemIndex, _step } = await result.events
				.SupplyChainStep.returnValues

			const newItem = {
				address: _itemAddress,
				step: _step,
				index: +_itemIndex,
				price: item.cost,
				identifier: item.itemName,
			}
			setState({ ...state, loaded: true, items: [...state.items, newItem] })
			toast.success(`Create ${item.itemName} success !`, {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		} catch (error) {
			console.log({ error })
			toast.error(`Create failure !`, {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		}
	}

	const triggerPayment = async (itemIndex, price) => {
		setState({ ...state, loaded: false })
		let result = await state.itemManager.methods
			.triggerPayment(itemIndex)
			.send({ from: state.account, value: price })
		const { _itemIndex } = await result.events.SupplyChainStep.returnValues

		let items = state.items.map(item => {
			if (item.index === _itemIndex) {
				item = { ...item, step: '1' }
			}
			return item
		})
		setState({ ...state, loaded: true, items })
		toast.success(`Purchased successfully, delivery now!`, {
			position: toast.POSITION.BOTTOM_RIGHT,
		})
	}

	const triggerDelivery = async (itemIndex) => {
		setState({ ...state, loaded: false })
		let result = await state.itemManager.methods
			.triggerDelivery(itemIndex)
			.send({ from: state.account})
		const { _itemIndex } = await result.events.SupplyChainStep.returnValues

		let items = state.items.map(item => {
			if (item.index === _itemIndex) {
				item = { ...item, step: '2' }
			}
			return item
		})
		setState({ ...state, loaded: true, items })
		console.log('Delivery')
		toast.success(`Delivery successfully`, {
			position: toast.POSITION.BOTTOM_RIGHT,
		})
	}

	return (
		<div className='App'>
			<ToastContainer autoClose={4000} />
			<Navbar account={state.account} />
			{!state.loaded && (
				<Typography variant='h6' align='center' mt={3} components='div'>
					Loading...
				</Typography>
			)}
			{state.loaded && (
				<ItemManager
					createItem={createItem}
					items={state.items}
					triggerPayment={triggerPayment}
					triggerDelivery={triggerDelivery}
				/>
			)}
		</div>
	)
}

export default App
