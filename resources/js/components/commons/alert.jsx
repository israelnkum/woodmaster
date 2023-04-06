import React from 'react'
import { Button, notification, Space } from 'antd'
const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Notification Title',
    description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
  })
}
export default function Alert () {
  return (
        <Space>
            <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
        </Space>
  )
}
