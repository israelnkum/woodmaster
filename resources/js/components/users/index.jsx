import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row, Button } from 'antd'
import TlaPageHeader from '../../commons/tla-page-header'
import UserForm from './user-form'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../../actions/users/UserAction'
import AllUsersContainer from '../../containers/users/AllUsersContainer'
export default function User (props) {
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    dispatch(getAllUsers())
    setLoader(false)
  }, [])
  return (
        <>
            <Row style={{ marginBottom: 5 }} justify="space-between" align="middle">
                <Col span={24}>
                    <TlaPageHeader title={'Users'} ext={[
                        <UserForm key={'1'} defaultValues={{ id: '0' }}>
                            <Button type="primary" >
                                New Admin
                            </Button>
                        </UserForm>
                    ]}/>
                </Col>
                <Col span={24}>
                    <Card bordered={false}>
                         <AllUsersContainer loading={loader} users={props.users}/>
                    </Card>
                </Col>
            </Row>
        </>
  )
}
User.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}
