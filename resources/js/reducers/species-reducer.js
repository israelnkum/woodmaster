import {Types} from '../actions/species/Types'

const initialState = {
    species: {
        data: [],
        meta: {}
    },
    filter: {
    },
    specie: {}
}

export default function specieReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_SPECIES:
            return {...state, species: action.payload}

        case Types.GET_SPECIE:
            return {...state, specie: action.payload}

        case Types.ADD_SPECIE_FILTER:
            return {...state, filter: action.payload}

        case Types.ADD_SPECIE:
            return {
                ...state,
                species: {
                    ...state.species,
                    data: state.species.data.concat(action.payload)
                }
            }

        case Types.UPDATE_SPECIE:
            return {
                ...state,
                species: {
                    ...state.species,
                    data: state.species.data.map((specie) => {
                        return specie.id === action.payload.id ? action.payload : specie
                    })
                }
            }

        case Types.REMOVE_SPECIE:
            return {
                ...state,
                species: {...state.species, data: state.species.data.filter((specie) => specie.id !== action.id)}
            }

        default:
            return state
    }
}
