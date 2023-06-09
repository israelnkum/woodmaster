import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {handleGetPalletLogs} from "../../actions/pallet/Action";
import {useParams} from "react-router";
import {Select, Spin} from "antd";

function PalletLogs(props) {
    const {getPalletLogs, palletLogs} = props
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        setLoading(true)
        getPalletLogs(id).then((res) => {
            if (res.data.length) {
                const {id, log_number} = res.data[res.data.length - 1]
                localStorage.setItem('palletLogNumber', log_number)
                localStorage.setItem('palletLogId', id)
            }
            setLoading(false)
        })
    }, [localStorage.getItem('palletLogId')])

    return (
        <div className={'mb-2'}>
            <p className={'uppercase'}>Log</p>
            <Spin spinning={loading}>
                {
                    (!loading && palletLogs.length > 0) &&
                    <Select onChange={(value, option) => {
                        localStorage.setItem('palletLogNumber', option.children)
                        localStorage.setItem('palletLogId', value)
                    }} className={'w-full'} defaultValue={parseInt(palletLogs[palletLogs.length - 1].id)}>
                        {
                            palletLogs.map(({id, log_number}) => (
                                <Select.Option key={id} value={id}>{log_number}</Select.Option>
                            ))
                        }
                    </Select>
                }
            </Spin>
        </div>
    )
}

PalletLogs.propTypes = {
    palletLogs: PropTypes.array,
    getPalletLogs: PropTypes.func,
}

const mapStateToProps = (state) => ({
    palletLogs: state.palletReducer.palletLogs
})

const mapDispatchToProps = (dispatch) => ({
    getPalletLogs: (id) => dispatch(handleGetPalletLogs(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PalletLogs)
