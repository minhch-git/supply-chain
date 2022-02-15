import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { StoreProvider, AuthProvider } from './store'

ReactDOM.render(
	<StoreProvider>
		<AuthProvider>
			<App />
		</AuthProvider>
	</StoreProvider>,
	document.getElementById('root')
)
serviceWorker.unregister()
