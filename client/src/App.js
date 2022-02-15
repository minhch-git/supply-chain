import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useStore, actions, useAuth, authActions } from './store'

import Navbar from './components/Navbar'
import Main from './playground/Main'
import Dashboard from './playground/Dashboard'
import NewProductForm from './playground/NewProductForm'
import ProductDetail from './playground/ProductDetail'
import LoginPage from './playground/Login'

import MarketplaceContract from './contracts/Marketplace.json'

import getWeb3 from './getWeb3'
import 'react-toastify/dist/ReactToastify.css'
import LoadingPage from './components/LoadingPage'
import { toast, ToastContainer } from 'react-toastify'

const App = () => {
	// const [state, setState] = useState(initState)
	const [loading, setLoading] = useState(true)
	const [_, dispatch] = useStore()
	const [authState, authDispatch] = useAuth()
	const { isLoggedIn, token } = authState

	useEffect(() => {
		const loadBlockChainData = async () => {
			try {
				const web3 = await getWeb3()
				const accounts = await web3.eth.getAccounts()
				const networkId = await web3.eth.net.getId()
				const marketplaceAbi = MarketplaceContract.abi
				const marketplaceData = MarketplaceContract.networks[networkId]

				const marketplace = new web3.eth.Contract(
					marketplaceAbi,
					marketplaceData && marketplaceData.address
				)

				const productCount = await marketplace.methods.productCount().call()

				let products = []
				for (let index = parseInt(productCount); index >= 1; index--) {
					const productObj = await marketplace.methods.products(index).call()
					const product = {
						name: productObj.name,
						index: productObj.index,
						price: productObj.price,
						owner: productObj.owner,
						address: productObj.product,
						step: productObj.state,
					}

					products = [...products, product]
				}

				products = products.map(async prod => {
					const res = await axios.get(
						`http://localhost:8888/api/products/address/${prod.address}`
					)

					return {
						openSale: res.data?.openSale,
						image: res.data?.image,
						createdAt: res.data?.createdAt,
						...prod,
						owner: res.data?.user ? res.data.user : prod.owner,
					}
				})

				products = await Promise.all(products)
				window.web3 = web3
				dispatch(actions.getMarketData({ marketplace, products }))
				authDispatch(authActions.setAccount(accounts[0]))
				setLoading(false)
			} catch (error) {
				alert(
					`Failed to load web3, accounts, or contract. Check console for details.`
				)
				console.error({ error })
			}
		}
		loadBlockChainData()
	}, [dispatch, authDispatch])
	// Get ac_token
	useEffect(() => {
		const _appSignging = localStorage.getItem('_appSignging')
		if (_appSignging) {
			const getToken = async () => {
				try {
					const res = await axios.get(
						'http://localhost:8888/api/auth/access_token',
						{
							withCredentials: true,
						}
					)
					authDispatch(authActions.getToken(res.data.ac_token))
				} catch (error) {
					console.log({ error })
				}
			}
			getToken()
		}
	}, [authDispatch, isLoggedIn])

	// get user data
	useEffect(() => {
		if (token) {
			authDispatch(authActions.signing())
			const getUser = async () => {
				const res = await axios.get('http://localhost:8888/api/users/me', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				authDispatch(authActions.getUser(res.data.user))
			}
			getUser()
		}
	}, [authDispatch, token])

	// Account change
	useEffect(() => {
		async function listenMMAccount() {
			window.ethereum.on('accountsChanged', async function () {
				const accounts = await window.web3.eth.getAccounts()
				try {
					const _appSignging = localStorage.getItem('_appSignging')
					if (_appSignging && token) {
						await axios.get('http://localhost:8888/api/auth/signout', {
							withCredentials: true,
							headers: {
								Authorization: `Bearer ${token}`,
							},
						})
						localStorage.removeItem('_appSignging')
						authDispatch(authActions.signOut())
					}

					setLoading(true)
					authDispatch(authActions.setAccount(accounts[0]))
				} catch (err) {
					return toast.error(err.response.data.message, {
						position: toast.POSITION.BOTTOM_RIGHT,
					})
				}
				setLoading(false)
			})
		}
		listenMMAccount()
	}, [token, setLoading, authDispatch])

	return (
		<>
			<BrowserRouter>
				<div className='App'>
					<ToastContainer />
					{isLoggedIn && <Navbar name={authState.user.name} />}
					{loading && <LoadingPage />}

					{!loading && (
						<Routes>
							{!isLoggedIn ? (
								<Route path='/' element={<LoginPage />} />
							) : (
								<>
									<Route path='/' element={<Main />} />
									<Route path='/dashboard' element={<Dashboard />} />
									<Route
										path='/products/:address'
										element={<ProductDetail />}
									/>
									<Route path='/products/new' element={<NewProductForm />} />
								</>
							)}
						</Routes>
					)}
				</div>
			</BrowserRouter>
		</>
	)
}

export default App
