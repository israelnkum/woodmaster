import { applyMiddleware, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {}

const middleware = [thunk]

export const Store = createStore(
  rootReducer,
  initialState,
  // applyMiddleware(...middleware),
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
)

window.store = Store

export const persistor = persistStore(Store)

export default { Store, persistor }
