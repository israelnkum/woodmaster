import React from 'react'
import PropTypes from 'prop-types'
import { Table, Space, Popconfirm } from 'antd'
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined'
import UserForm from './user-form'
import { DeleteOutlined } from '@ant-design/icons'
import UserRoleContainer from '../../containers/users/UserRoleContainer'
const { Column } = Table
export default function AllUsers (props) {
  return (
      <Table loading={props.loading} dataSource={props.users} scroll={{ x: 50 }} rowKey={'id'}>
          <Column title="Name" dataIndex="name"/>
          <Column title="Username" dataIndex="username"/>
          <Column title="Phone Number" dataIndex="phoneNumber"/>
          <Column title="Roles" render={(text, record) => (
              <>
                  <UserRoleContainer
                      userId={record.id}
                      username={record.name}
                      btnText={'VIEW'}
                  />
              </>
          )}/>
          <Column
              title="Action"
              render={(text, record) => (
                  <Space size="middle">
                      <UserForm defaultValues={record}>
                          <EditOutlined type={'button'}/>
                      </UserForm>
                      <Popconfirm title="Sure to delete?" onConfirm={() => { }} cancelText={'No'} okText={'Yes'}>
                          <DeleteOutlined type={'button'}/>
                      </Popconfirm>
                  </Space>
              )}
          />
      </Table>

  )
}

AllUsers.propTypes = {
  users: PropTypes.array.isRequired,
  setUserData: PropTypes.func.isRequired,
  loading: PropTypes.bool
}
