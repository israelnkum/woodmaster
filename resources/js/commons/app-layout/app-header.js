import { Affix, Dropdown, Space, Spin } from 'antd'
import PropTypes from "prop-types";
import React, { useState } from 'react'
import { FiChevronDown, FiInfo, FiLogOut } from "react-icons/fi";
import { connect, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { logout } from '../../actions/logout/LogoutAction'
import Logo from '../../assets/img/app-logo.png'

function AppHeader({user}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleLogout = () => {
        setLoading(true)
        dispatch(logout()).then(() => {
            window.location.reload()
            window.location.replace('/login')
            setLoading(false)
        })
    }
    const items = [
        {
            key: '2',
            label: (
                <Link to={ `/employees/${ user.employee_id }/${ user.name }` }>My Info</Link>
            ),
            icon: <FiInfo/>
        },
        {
            key: '4',
            label: <p title={ 'Logout' } onClick={ () => handleLogout() }>Logout</p>,
            icon: <FiLogOut/>
        },
    ];

    return (
        <Affix offsetTop={ 1 }>
            <div className={ 'bg-white h-[60px] px-5 flex items-center justify-between' }>
                <div>
                    <img width={ 150 } src={ Logo } alt="WoodMaster"/>
                </div>
                <div>

                </div>
                <div>
                    <Spin spinning={ loading }>
                        <Dropdown
                            menu={ {items} }>
                            <a onClick={ (e) => e.preventDefault() }>
                                <Space>
                                    Hi { user.name }
                                    <FiChevronDown/>
                                </Space>
                            </a>
                        </Dropdown>
                    </Spin>
                </div>
            </div>
        </Affix>
    )
}

AppHeader.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.userReducer.loggedInUser
})

export default connect(mapStateToProps)(AppHeader)
