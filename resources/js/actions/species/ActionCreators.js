import { Types } from './Types'

export const getSpecies = (payload) => {
  return {
    type: Types.GET_SPECIES,
      payload: payload
  }
}

export const getSpecie = (payload) => {
  return {
    type: Types.GET_SPECIE,
      payload: payload
  }
}

export const addSpecie = (payload) => {
    return {
        type: Types.ADD_SPECIE,
        payload: payload
    }
}

export const removeSpecie = (id) => {
  return {
    type: Types.REMOVE_SPECIE,
      id: id
  }
}

export const updateSpecie = (payload) => {
  return {
    type: Types.UPDATE_SPECIE,
      payload: payload
  }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_SPECIE_FILTER,
        payload: payload
    }
}
