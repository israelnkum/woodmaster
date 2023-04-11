import api from '../../utils/api'
import {addWood, getWood, getWoods, moveWood, removeWood, updateWood,} from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param data
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddWood = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/wood', data).then((res) => {
            dispatch(addWood(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const handleMoveWood = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/wood/move', data).then((res) => {
            dispatch(moveWood(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Display a listing of the resource.
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetAllWoods = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/wood?${params}`).then((res) => {
            dispatch(getWoods(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleWood = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/wood/${id}`).then((res) => {
            dispatch(getWood(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
/**
 * Update the specified resource in storage.
 * @param data
 * @returns {function(*): Promise<unknown>}
 */
export const handleUpdateWood = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/wood/${data.get('id')}`, data, {
            // headers: { 'Content-type': 'multipart/employee-dashboard-data' }
        }).then((res) => {
            dispatch(updateWood(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Remove the specified resource from storage.
 * @param id
 * @returns {function(*): Promise<unknown>}
 */
export const handleDeleteWood = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/wood/${id}`).then((res) => {
            dispatch(removeWood(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handlePrintBarcode = (id) => () => {
    return new Promise((resolve, reject) => {
        api().post(`/wood/${id}/barcode`).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
