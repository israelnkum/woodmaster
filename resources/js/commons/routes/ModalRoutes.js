import React from 'react'
import {Route, Routes} from 'react-router-dom'
import PalletForm from "../../pages/pallet/pallet-form";
import WoodFormOld from "../../pages/wood/wood-form-old";
import MoveWoodForm from "../../pages/wood/move-wood-form";
import EditWoodLogForm from "../../pages/wood/edit-wood-log-form";
import ShowPalletLogs from "../../pages/pallet/show-pallet-logs";
import SpeciesForm from "../../pages/species/species-form";

export const ModalRoutes = () => {
    return (
        <Routes>
            <Route exact path="app">
                <Route exact path="pallets/form" element={<PalletForm/>}/>
                <Route exact path="species/form" element={<SpeciesForm/>}/>
                <Route exact path="pallets/:id/logs" element={<ShowPalletLogs/>}/>
                <Route exact path="wood/form" element={<WoodFormOld/>}/>
                <Route exact path="pallet/:id/woods/edit-log" element={<EditWoodLogForm/>}/>
                <Route exact path="pallet/:id/woods/move" element={<MoveWoodForm/>}/>
            </Route>
        </Routes>
    )
}
