import api from '../../utils/api'
import {
    addFilter,
    addSpecie,
    getSpecie,
    getSpecies,
    removeSpecie,
    updateSpecie,
} from './ActionCreators'
import {addWoodFilter, getWoods} from "../wood/ActionCreators";
import {completeExport} from "../../utils";

/**
 * Store a newly created resource in storage.
 * @param data
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddSpecie = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/species', data).then((res) => {
            dispatch(addSpecie(res.data))
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
export const handleGetAllSpecies = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/species?${params}`).then((res) => {
            dispatch(getSpecies(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleSpecie = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/species/${id}`).then((res) => {
            dispatch(getSpecie(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSpecieWood = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/specie/woods?${params}`).then((res) => {
            dispatch(getWoods(res.data))
            params?.delete('page')
            params && dispatch(addWoodFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleFilterSpecieWood = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/specie/woods/filter?${params}`).then((res) => {
            dispatch(getWoods(res.data))
            params?.delete('page')
            params && dispatch(addWoodFilter(Object.fromEntries(params)))
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
export const handleDeleteSpecie = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/species/${id}`).then((res) => {
            dispatch(removeSpecie(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handlePrintSpecieReport = (id, specieNumber, excel = true) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/specie/${id}/report?export=${excel}`, {responseType: 'blob'})
            .then((res) => {
                completeExport(res.data, `specie-${specieNumber}`)
                resolve()
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
export const handleUpdateSpecie = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        data['_method'] = 'PUT';
        api().post(`/species/${data.id}`, data)
            .then((res) => {
                dispatch(updateSpecie(res.data))
                resolve(res)
            }).catch((err) => {
            reject(err)
        })
    })
}
