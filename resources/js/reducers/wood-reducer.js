import { Types } from '../actions/wood/Types'
const initialState = {
    woods: {
        data: [],
        meta: {}
    },
    filter: {},
    wood: {}
}

export default function woodReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_WOODS:
            return { ...state, woods: action.payload }

        case Types.GET_WOOD:
            return { ...state, wood: action.payload }

        case Types.ADD_WOOD:
            return {
                ...state,
                woods: {
                    ...state.woods,
                    data: state.woods.data.concat(action.payload)
                }
            }

        case Types.UPDATE_WOOD:
            return {
                ...state,
                woods: {
                    ...state.woods,
                    data: state.woods.data.map((wood) => {
                        return wood.id === action.payload.id ? action.payload : wood
                    })
                }
            }

        case Types.REMOVE_WOOD:
            return {
                ...state,
                woods: { ...state.woods, data: state.woods.data.filter((wood) => wood.id !== action.id) }
            }

        default:
            return state
    }
}
