import React from "react";
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

function TlaAddNew({modal, link, children, data}) {
    const location = useLocation()
    return (
        <Link
            style={{ textDecoration: 'none !important'}}
            className={ '!no-underline' }
            to={ link } state={ {background: modal ? location : null, data} }>
            { children }
        </Link>
    )
}

TlaAddNew.defaultProps = {
    modal: true
}

TlaAddNew.propTypes = {
    children: PropTypes.node,
    data: PropTypes.object,
    link: PropTypes.string.isRequired,
    modal: PropTypes.bool,
}

export default connect()(TlaAddNew)
