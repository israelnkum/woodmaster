import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {handleGetPalletStats} from "../../actions/pallet/Action";
import {useParams} from "react-router";
import {Spin} from "antd";

function PalletStats(props) {
    const {getPalletStats, palletStats} = props
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        getPalletStats(id).then(() => {
            setLoading(false)
        })
    }, [])


    return (
        <div className={'mb-2'}>
            <Spin spinning={loading}>
                {
                    !loading &&
                    <>
                        <div className={'!flex !justify-between py-2 border-b font-bold'}>
                            <p>Log/Sub Log</p>
                            <p>Total</p>
                        </div>
                        {
                            Object.keys(palletStats).length === 0 ? <>No Data</> :
                                palletStats?.items.map((item) => {
                                    return (
                                        Object.keys(item).map((itm, index) => (
                                            <div className={'!flex !justify-between py-2 border-b'} key={index}>
                                                <p>{itm}</p>
                                                <p>{item[itm][0]}</p>
                                            </div>
                                        ))
                                    )
                                })
                        }
                    </>
                }
            </Spin>
        </div>
    )
}

PalletStats.propTypes = {
    palletStats: PropTypes.any,
    getPalletStats: PropTypes.func,
}

const mapStateToProps = (state) => ({
    palletStats: state.palletReducer.palletStats
})

const mapDispatchToProps = (dispatch) => ({
    getPalletStats: (id) => dispatch(handleGetPalletStats(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PalletStats)
