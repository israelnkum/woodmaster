import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import userReducer from './user-reducer'
import commonReducer from "./common-reducer";
import woodReducer from "./wood-reducer";
import palletReducer from "./pallet-reducer";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        'userReducer',
        'commonReducer',
        'woodReducer',
        'palletReducer'
    ]
}

const rootReducer = combineReducers({
    userReducer,
    commonReducer,
    woodReducer,
    palletReducer
})

export default persistReducer(persistConfig, rootReducer)
