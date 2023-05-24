import {Types} from '../actions/pallet/Types'

const initialState = {
    pallets: {
        data: [],
        meta: {}
    },
    filter: {
        pallet_number: '',
        log_number: 'all',
        species_id: 'all',
        quality_id: 'all',
        thickness: 'all',
        date: 'null'
    },
    pallet: {},
    palletStats: {},
    palletLogs: [],
    palletSubLogs: [],
}

export default function palletReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_PALLETS:
            return {...state, pallets: action.payload}

        case Types.GET_PALLET:
            return {...state, pallet: action.payload}

        case Types.ADD_PALLET_FILTER:
            return {...state, filter: action.payload}

        case Types.UPDATE_SQUARE_METER:
            return {...state, pallet: {
                ...state.pallet,
                    square_meter: state.pallet.square_meter + action.payload.square_meter,
                    total_sheets: state.pallet.total_sheets + action.payload.sheets,
            }}

        case Types.GET_PALLET_LOGS:
            return {...state, palletLogs: action.payload}

        case Types.GET_PALLET_SUB_LOGS:
            return {...state, palletSubLogs: action.payload}

        case Types.GET_PALLET_STATS:
            return {...state, palletStats: action.payload}

        case Types.ADD_PALLET:
            return {
                ...state,
                pallets: {
                    ...state.pallets,
                    data: state.pallets.data.concat(action.payload)
                }
            }

        case Types.UPDATE_PALLET:
            return {
                ...state,
                pallet: action.payload,
                pallets: {
                    ...state.pallets,
                    data: state.pallets.data.map((pallet) => {
                        return pallet.id === action.payload.id ? action.payload : pallet
                    })
                }
            }

        case Types.REMOVE_PALLET:
            return {
                ...state,
                pallets: {...state.pallets, data: state.pallets.data.filter((pallet) => pallet.id !== action.id)}
            }

        default:
            return state
    }
}
