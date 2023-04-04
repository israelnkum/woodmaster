import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FiEdit2 } from "react-icons/fi";

function TlaEdit({link, data, text, icon, type, activeRoles}) {
    const location = useLocation()
    return (
        // activeRoles.includes('Admin') &&
        <Link to={ link } style={{ textDecoration: 'none' }} state={ {background: location, data: data} }>
            <Button title={'Edit'} icon={ icon && <FiEdit2/> }>
                {text ?? <>&nbsp; { text }</>}
            </Button>
        </Link>
    )
}

TlaEdit.defaultProps = {
    text: '',
    type: 'default',
    icon: false
}
TlaEdit.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired,
    activeRoles: PropTypes.array.isRequired,
}
const mapStateToProps = (state) => ({
    activeRoles: state.userReducer.activeRoles
})

export default connect(mapStateToProps)(TlaEdit)
