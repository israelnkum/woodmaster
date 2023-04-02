import { Types } from '../actions/users/Types'

const initialState = {
    users: [],
    newUser: {},
    userData: {},
    userDetail: {},
    userRoles: [],
    permissions: [],
    loggedInUser: {},
    activeRoles: [],
    otherRoles: [],
    dashboardData: {}
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_ALL_USERS:
            return {...state, users: action.payload}

        case Types.GET_TIME:
            return {...state, serverTime: action.payload}

        case Types.NEW_USER:
            return {
                ...state,
                users: state.users.concat(action.payload)
            }
        case Types.GET_DASHBOARD_DATA:
            return {
                ...state,
                dashboardData: action.payload
            }

        case Types.SET_USER_DATA:
            return {
                ...state,
                users: state.users.map((user) => {
                    return user.id === action.payload.id ? action.payload : user
                })
            }

        case Types.GET_USER_DETAIL:
            return {...state, userDetail: action.payload}

        case Types.DELETE_USER:
            return {...state, users: state.users.filter((group) => group.id !== action.payload)}

        case Types.GET_USER_ROLES:
            return {
                ...state,
                userRoles: action.payload[0],
                otherRoles: action.payload[1],
            }

        case Types.ADD_USER_ROLE:
            return {
                ...state,
                userRoles: state.userRoles.concat(action.payload),
                otherRoles: state.otherRoles.filter((other) => !action.payload.map(item => item.id).includes(other.id))
            }

        case Types.SET_ROLE_DATA:
            return {
                ...state,
                userRoles: state.userRoles.map((role) => {
                    return role.id === action.payload.id ? action.payload : role
                })
            }

        case Types.GET_ACTIVE_USER_ROLES:
            return {
                ...state,
                loggedInUser: {...action.payload.user, employee_id: action.payload.employee_id},
                activeRoles: action.payload.roles,
                permissions: action.payload.permissions
            }

        default:
            return state
    }
}
