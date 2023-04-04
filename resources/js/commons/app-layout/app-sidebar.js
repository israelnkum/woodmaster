import {Affix, Layout} from 'antd'
import PropTypes from "prop-types";
import React from 'react'
import {FiHome, FiPlus} from "react-icons/fi";
import {connect} from "react-redux";
import {SidebarMenus} from "../../utils/side-bar-menu";
import MenuHelper from "../menu-helper";
import SideProfile from "./side-profile";
import {BsStack} from "react-icons/bs";

function AppSidebar(props) {
    const {name} = props

    return (
        <Affix offsetTop={65}>
            <Layout.Sider
                theme={'light'}
                style={{background: '#fff', height: '100vh'}}>
                <div align={'center'}>
                    <SideProfile size={50} name={name}/>
                </div>
                <MenuHelper icons={{
                    home: <FiHome/>,
                    pallet: <BsStack/>,
                    add: <FiPlus/>
                }} menus={SidebarMenus} direction={'inline'}/>
            </Layout.Sider>
        </Affix>
    )
}

AppSidebar.propTypes = {
    name: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    name: state.userReducer.loggedInUser.name,
})

export default connect(mapStateToProps)(AppSidebar)
