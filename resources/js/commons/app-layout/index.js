import { Spin } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { handleGetCommonData } from "../../actions/commons/CommonAction";
import { getActiveRoles } from "../../actions/users/UserAction";
import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";

const AppLayout = (props) => {
    const [loading, setLoading] = useState(true)

    const {children, getRoles, getCommonData} = props

    useEffect(() => {
        getRoles().then(() => {
            setLoading(false)
        }).then(() => {
            setLoading(true)
            getCommonData().then(() => setLoading(false))
        })
    }, [])

    return (
        <Spin spinning={ loading }>
            <div className={ 'max-w-screen-2xl mx-auto' }>
                {
                    !loading &&
                    <div>
                        <AppHeader/>
                        <div className={'flex gap-x-2'}>
                            <AppSidebar/>
                            <div className={'mt-1.5 grow'}>
                                { children }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Spin>
    )
}

AppLayout.propTypes = {
    children: PropTypes.any,
    getCommonData: PropTypes.func,
    getRoles: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
    getRoles: () => dispatch(getActiveRoles('21993de6-123a-54c68c0b')),
    getCommonData: () => dispatch(handleGetCommonData()),
})

export default connect(null, mapDispatchToProps)(AppLayout)
