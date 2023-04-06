import api from '../../utils/api'
import { getCommonData, getMyTeam, getPendingActions, getWhoIsOut, } from './ActionCreators'

export const handleGetCommonData = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get('/commons').then((res) => {
            dispatch(getCommonData(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetPendingActions = (supervisorId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/supervisor/${supervisorId}/pending-actions`).then((res) => {
            dispatch(getPendingActions(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetMyTeam = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/my-team`).then((res) => {
            dispatch(getMyTeam(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetWhoIsOut = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/who-is-out`).then((res) => {
            dispatch(getWhoIsOut(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
