import { Types } from './Types'

export const getPallets = (payload) => {
  return {
    type: Types.GET_PALLETS,
      payload: payload
  }
}

export const getPallet = (payload) => {
  return {
    type: Types.GET_PALLET,
      payload: payload
  }
}

export const addPallet = (payload) => {
    return {
        type: Types.ADD_PALLET,
        payload: payload
    }
}

export const removePallet = (id) => {
  return {
    type: Types.REMOVE_PALLET,
      id: id
  }
}

export const updatePallet = (payload) => {
  return {
    type: Types.UPDATE_PALLET,
      payload: payload
  }
}

export const getPalletWood = (payload) => {
  return {
    type: Types.GET_PALLET_WOOD,
      payload: payload
  }
}


export const getPalletLogs = (payload) => {
  return {
    type: Types.GET_PALLET_LOGS,
      payload: payload
  }
}
export const getPalletSubLogs = (payload) => {
  return {
    type: Types.GET_PALLET_SUB_LOGS,
      payload: payload
  }
}

export const addFilter = (payload) => {
    return {
        type: Types.ADD_PALLET_FILTER,
        payload: payload
    }
}

export const getPalletStats = (payload) => {
    return {
        type: Types.GET_PALLET_STATS,
        payload: payload
    }
}
