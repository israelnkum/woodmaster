import PropTypes from "prop-types";
import React from 'react'
import {connect} from "react-redux";
import {Outlet, useLocation} from 'react-router'
import {Route, Routes} from 'react-router-dom'
import Dashboard from "../../components/dashboard";
import {ModalRoutes} from "./ModalRoutes";
import AllPallets from "../../pages/pallet/all-pallets";
import PageWrapper from "../../pages/common/page-wrapper";
import AllWood from "../../pages/wood/all-wood";
import PalletDetail from "../../pages/pallet/pallet-detail";
import AllSpecies from "../../pages/species/all-species";

const ProtectedRoutes = () => {
    const location = useLocation()
    const background = location.state && location.state.background

    return (
        <>
            {background && (<React.Fragment><ModalRoutes/> <Outlet/></React.Fragment>)}
            <Routes location={background || location}>
                <Route exact element={<Dashboard/>} path='home'/>
                <Route exact element={<Dashboard/>} path='/'/>
                <Route exact element={<Dashboard/>} path='/js/*'/>
                <Route path={'app'} element={<PageWrapper/>}>
                    <Route exact element={<AllPallets/>} path='pallets'/>
                    <Route exact element={<PalletDetail/>} path='pallets/:id/details'/>
                    <Route exact element={<AllWood/>} path='wood'/>

                    <Route exact element={<AllSpecies/>} path='species'/>
                </Route>
                <Route exact>
                    <>not found</>
                </Route>
            </Routes>
        </>
    )
}

ProtectedRoutes.propTypes = {
    activeRoles: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    activeRoles: state.userReducer.activeRoles
})


export default connect(mapStateToProps, null)(ProtectedRoutes)
