import React from 'react'
import PropTypes from 'prop-types'
import {Card} from 'antd'

export default function PageInner (props) {
    const { children, title } = props
    return (
        <Card title={title}>
            {children}
        </Card>
    )
}
PageInner.defaultProps = {
    title: ''
}

PageInner.propTypes = {
    children: PropTypes.any,
    title: PropTypes.any
}
