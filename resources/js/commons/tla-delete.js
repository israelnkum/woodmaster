import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, notification, Popconfirm} from 'antd'
import {connect} from "react-redux";

function TlaDelete (props) {
    const { deleteAction, activeRoles, context} = props
    const [deleting, setDeleting] = useState(false)
    const handleDelete = () => {
        setDeleting(true)
        deleteAction().then(() =>{
            notification.success({
                message: 'Success',
                description: `${context} Deleted`
            })
            setDeleting(false)
        }).catch((error) => {
            notification.warning({
                message: 'Warning',
                description: error.response.data
            })
            setDeleting(false)
        })
    }
    return (
        activeRoles.includes('Admin') &&
        <Popconfirm title="Sure to delete?" onConfirm={handleDelete} cancelText={'No'} okText={'Yes'}>
            <Button loading={deleting} danger>
                Delete
            </Button>
        </Popconfirm>
    )
}

TlaDelete.propTypes = {
    deleteAction: PropTypes.func,
    activeRoles: PropTypes.array.isRequired,
    context: PropTypes.string,
    loading: PropTypes.bool
}
const mapStateToProps = (state) => ({
    activeRoles: state.userReducer.activeRoles
})

export default connect(mapStateToProps)(TlaDelete)
