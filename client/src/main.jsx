import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "antd/dist/reset.css" //that "resets" the styling of all HTML elements to a consistent baseline. This is done to neutralize the default styling that browsers apply to elements, which can vary significantly from one browser to another. 
import {Provider} from "react-redux"
import store from './redux/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
        <App />
  </React.StrictMode>,
  </Provider>
)
