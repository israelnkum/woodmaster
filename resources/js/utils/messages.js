import { notification } from 'antd'

export const TlaSuccess = (msg = null) => (
    notification.success({
        message: 'Success',
        description: msg,
        placement: "top",
    })
)

export const TlaWarning = (msg = null) => (
    notification.warning({
        message: 'Warning',
        description: msg,
        placement: "top",
    })
)

export const TlaError = (msg = null) => (
    notification.warning({
        message: 'Error',
        description: msg,
        placement: "top",
    })
)
