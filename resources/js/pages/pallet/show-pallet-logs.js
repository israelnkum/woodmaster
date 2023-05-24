import React from 'react'
import {TlaModal} from "../../commons/pop-ups/tla-modal";
import {useLocation} from "react-router";
import CloseModal from "../../commons/close-modal";

function ShowPalletLogs() {

    const {state} = useLocation()
    return (
        <div className={'mb-2'}>
            <TlaModal title={'Pallet Logs'}>
                <div className={'flex flex-wrap gap-2'}>
                    {
                        state?.data.map((item) => (
                            <span key={item.id}>{item.log_number}</span>
                        ))
                    }
                </div>
                <div className={'max-w-[100px] mx-auto pt-2'}>
                    <CloseModal btnText={'Close'}/>
                </div>
            </TlaModal>
        </div>
    )
}

export default ShowPalletLogs
