import { Types } from './Types'


export const getWoods = (payload) => {
  return {
    type: Types.GET_WOODS,
      payload: payload
  }
}

export const getWood = (payload) => {
  return {
    type: Types.GET_WOOD,
      payload: payload
  }
}

export const addWood = (payload) => {
    return {
        type: Types.ADD_WOOD,
        payload: payload
    }
}

export const moveWood = (payload) => {
    return {
        type: Types.MOVE_WOOD,
        payload: payload
    }
}

export const removeWood = (id) => {
  return {
    type: Types.REMOVE_WOOD,
      id: id
  }
}

export const updateWood = (payload) => {
  return {
    type: Types.UPDATE_WOOD,
      payload: payload
  }
}
