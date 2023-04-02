import api from '../../utils/api'
import {addPallet, getPallet, getPallets, removePallet, updatePallet,} from './ActionCreators'
import {getWoods} from "../wood/ActionCreators";

/**
 * Store a newly created resource in storage.
 * @param data
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddPallet = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/pallets', data).then((res) => {
            dispatch(addPallet(res.data))
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
export const handleGetAllPallets = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/pallets?${params}`).then((res) => {
            dispatch(getPallets(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSinglePallet = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/pallets/${id}`).then((res) => {
            dispatch(getPallet(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetPalletWood = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/pallet/${id}/wood`).then((res) => {
            dispatch(getWoods(res.data))
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
export const handleUpdatePallet = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/pallets/${data.get('id')}`, data, {
            // headers: { 'Content-type': 'multipart/employee-dashboard-data' }
        }).then((res) => {
            dispatch(updatePallet(res.data))
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
export const handleDeletePallet = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/pallets/${id}`).then((res) => {
            dispatch(removePallet(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
