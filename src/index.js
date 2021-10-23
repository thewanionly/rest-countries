import ReactDOM from 'react-dom'

import Store from 'store/Store.jsx'
import App from './App.jsx'

import 'styles/main.scss'

ReactDOM.render(
  <Store>
    <App />
  </Store>,
  document.getElementById('root')
)
