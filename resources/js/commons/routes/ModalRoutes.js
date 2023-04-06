import React from 'react'
import {Route, Routes} from 'react-router-dom'
import PreviewFile from "../preview-file";
import PalletForm from "../../pages/pallet/pallet-form";
import WoodFormOld from "../../pages/wood/wood-form-old";

export const ModalRoutes = () => {
    return (
        <Routes>
            <Route exact path="preview/:fileName" element={<PreviewFile/>}/>
            <Route exact path="app">
                <Route exact path="pallets/form" element={<PalletForm/>}/>
                <Route exact path="wood/form" element={<WoodFormOld/>}/>
            </Route>
        </Routes>
    )
}
