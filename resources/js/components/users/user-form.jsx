import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Input, notification } from 'antd'
import { useDispatch } from 'react-redux'
import { addNewUser, setUserData } from '../../actions/users/UserAction'

export default function UserForm (props) {
  const dispatch = useDispatch()
  const { defaultValues } = props
  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)

  const submit = async (values) => {
    dispatch(values.id === '0' ? addNewUser(values) : setUserData(values)).then(() => {
      notification.success({
        message: 'Success',
        description: 'User Account ' + values.id === '0' ? 'Created' : 'Updated'
      })
      form.resetFields()
      setVisible(false)
    }).catch((error) => {
      notification.warning({
        message: 'Warning',
        description: error.response.data
      })
    })
  }

  const validate = (errorInfo) => {
    notification.warning({
      message: 'Warning',
      description: 'Invalid Data'
    })
  }
  useEffect(() => {
  }, [])

  return (
        <div>
            <span onClick={() => { setVisible(true) }}>
                {props.children}
            </span>

            <Modal
                onCancel={() => { setVisible(false) } }
                footer={null}
                width={300}
                visible={visible}
                title="New User"
               >
                <Form
                    form={form}
                    onFinish={submit}
                    onFinishFailed={validate}
                    layout="vertical"
                    name="createGroupForm"
                    initialValues={defaultValues}>
                    <Form.Item name="first_name" label="First Name"
                        rules={[
                          {
                            required: true,
                            message: 'First Name is Required'
                          }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="last_name" label="Last Name"
                        rules={[
                          {
                            required: true,
                            message: 'Last Name is Required'
                          }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="id" hidden label="ID"
                        rules={[
                          {
                            required: true,
                            message: 'ID is Required'
                          }
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phoneNumber" label="Phone Number">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <div>
                            <Button onClick={() => { setVisible(false) }} >
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
  )
};
UserForm.propTypes = {
  defaultValues: PropTypes.object.isRequired,
  success: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
