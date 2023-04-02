import React from 'react'
import {Route, Routes} from 'react-router-dom'
import PreviewFile from "../preview-file";
import PalletForm from "../../pages/pallet/pallet-form";
import WoodForm from "../../pages/wood/wood-form";

export const ModalRoutes = () => {
    return (
        <Routes>
            <Route exact path="preview/:fileName" element={<PreviewFile/>}/>
            <Route exact path="app">
                <Route exact path="pallets/form" element={<PalletForm/>}/>
                <Route exact path="wood/form" element={<WoodForm/>}/>
            </Route>
        </Routes>
    )
}
