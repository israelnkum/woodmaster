import { Types } from '../actions/commons/Types'

const initialState = {
    commons: {},
    pendingActions: {},
    teamMembers: [],
    whoIsOut: [],
}

export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_COMMON_DATA:
            return {...state, commons: action.payload}

        case Types.GET_PENDING_ACTIONS:
            return {...state, pendingActions: action.payload}

        case Types.GET_MY_TEAM:
            return {...state, teamMembers: action.payload}

        case Types.GET_WHO_IS_OUT:
            return {...state, whoIsOut: action.payload}

        case Types.CHANGE_LEAVE_STATUS:
            return {
                ...state,
                pendingActions: {
                    leaveRequest: state.pendingActions.leaveRequest.filter((leave) => leave.id !== action.payload.id)
                }
            }
        default:
            return state
    }
}
