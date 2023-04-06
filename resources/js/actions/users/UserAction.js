import { Types } from './Types'
import api from '../../utils/api'

export const getAllUsers = () => async (dispatch) => {
  await api().get('/users')
    .then((res) => {
      dispatch({
        type: Types.GET_ALL_USERS,
        payload: res.data
      })
    })
}

export const addNewUser = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/users', values).then((res) => {
      dispatch({
        type: Types.NEW_USER,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const setUserData = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().put(`/users/${values.id}`, values).then((res) => {
      dispatch({
        type: Types.SET_USER_DATA,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getUserDetail = (payload) => {
  return {
    type: Types.GET_USER_DETAIL,
    payload: payload
  }
}

export const deleteUser = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().delete(`/users/${id}`).then((res) => {
      dispatch({
        type: Types.DELETE_USER,
        payload: id
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
export const getActiveRoles = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(`user/${id}/roles/active`).then((res) => {
      dispatch({
        type: Types.GET_ACTIVE_USER_ROLES,
        payload: res.data
      })
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}
export const getUserRoles = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get(`/user/${id}/roles`).then((res) => {
      dispatch({
        type: Types.GET_USER_ROLES,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const addUserRoles = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/user/roles/add', values).then((res) => {
      dispatch({
        type: Types.ADD_USER_ROLE,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getDashboardData = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get('/dashboard/').then((res) => {
      dispatch({
        type: Types.GET_DASHBOARD_DATA,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const getTime = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().get('/time/').then((res) => {
      dispatch({
        type: Types.GET_TIME,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export const roleActions = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    api().post('/user/roles/actions/', data).then((res) => {
      dispatch({
        type: Types.SET_ROLE_DATA,
        payload: res.data
      })
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
