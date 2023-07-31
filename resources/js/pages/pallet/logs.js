import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {handleDeletePalletLog, handleGetPalletLogs} from "../../actions/pallet/Action";
import {useParams} from "react-router";
import {Spin} from "antd";
import {TlaSuccess} from "../../utils/messages";
import TlaConfirm from "../../commons/TlaConfirm";

function Logs(props) {
    const {getPalletLogs, palletLogs, deletePalletLog} = props
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        setLoading(true)
        getPalletLogs(id).then(() => setLoading(false))
    }, [localStorage.getItem('palletLogId')])

    return (
        <div className={'mb-2 overflow-auto max-h-[400px]'}>
            <Spin spinning={loading}>
                {
                    (!loading && palletLogs.length > 0) &&
                    <div>
                        {
                            palletLogs.map(({id, pallet_id, log_number}) => (
                                <div key={id} className={'flex justify-between items-center border-b pb-2'}>
                                    {log_number}
                                    <TlaConfirm title={'Log'}
                                                callBack={() => deletePalletLog({
                                                    palletId: pallet_id,
                                                    logNumber: log_number
                                                }).then(() => {
                                                    TlaSuccess("Log Deleted")
                                                    window.location.reload()
                                                })}/>
                                </div>
                            ))
                        }
                    </div>
                }
            </Spin>
        </div>
    )
}

Logs.propTypes = {
    palletLogs: PropTypes.array,
    getPalletLogs: PropTypes.func,
    deletePalletLog: PropTypes.func,
}

const mapStateToProps = (state) => ({
    palletLogs: state.palletReducer.palletLogs
})

const mapDispatchToProps = (dispatch) => ({
    getPalletLogs: (id) => dispatch(handleGetPalletLogs(id)),
    deletePalletLog: (data) => dispatch(handleDeletePalletLog(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Logs)
