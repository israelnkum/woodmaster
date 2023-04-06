import { Types } from './Types'

export const getCommonData = (payload) => {
  return {
    type: Types.GET_COMMON_DATA,
      payload: payload
  }
}

export const getPendingActions = (payload) => {
  return {
    type: Types.GET_PENDING_ACTIONS,
      payload: payload
  }
}

export const getMyTeam = (payload) => {
  return {
    type: Types.GET_MY_TEAM,
      payload: payload
  }
}

export const changeLeaveStatus = (payload) => {
  return {
    type: Types.CHANGE_LEAVE_STATUS,
      payload: payload
  }
}

export const getWhoIsOut = (payload) => {
  return {
    type: Types.GET_WHO_IS_OUT,
      payload: payload
  }
}
