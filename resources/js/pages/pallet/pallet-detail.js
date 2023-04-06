import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {handleDeletePallet, handleGetPalletWood, handleGetSinglePallet} from "../../actions/pallet/Action";
import {useOutletContext, useParams} from "react-router";
import {Card, Col, Row, Spin, Tabs} from "antd";
import WoodTable from "../wood/wood-table";
import WoodForm from "../wood/wood-form";
import PalletInfo from "./pallet-info";
import PalletStats from "./pallet-stats";

function PalletDetail(props) {
    const {getPallet, getPalletWood, palletWood, pallet, palletLogs, filter} = props
    const [loading, setLoading] = useState(true)
    const [loadingWood, setLoadingWood] = useState(true)
    const {setPageInfo} = useOutletContext();
    const {id} = useParams()

    let pageData = {
        title: 'Pallet Detail', buttonText: 'Wood'
    }

    useEffect(() => {
        setPageInfo(pageData)

        getPallet(id).then(() => {
            setLoading(false)
        })

        filter['palletId'] = id
        getPalletWood(new URLSearchParams(filter)).then(() => setLoadingWood(false))
    }, [])



    return (<div className={'pb-10'}>
            <Spin spinning={loadingWood || loading}>
                {/*<FilterPallets/>*/}
                {(!loading && !loadingWood) && <Row gutter={10}>
                    <Col span={18} xs={24} sm={24} md={18}>
                        <WoodForm id={id} palletNumber={pallet?.pallet_number}/>
                        <WoodTable wood={palletWood}/>
                    </Col>
                    <Col span={6} xs={24} sm={24} md={6}>
                        <Card>
                            <Tabs items={[
                                {
                                    key: 'detail',
                                    label: 'Pallet Info',
                                    children: <PalletInfo pallet={pallet} palletLogs={palletLogs} loading={loading}/>
                                },
                                {
                                    key: 'pallet-info',
                                    label: 'Pallet Stats',
                                    children: <PalletStats/>
                                }
                            ]}/>
                        </Card>
                    </Col>
                </Row>}
            </Spin>
        </div>)
}

PalletDetail.propTypes = {
    pageInfo: PropTypes.object,
    palletWood: PropTypes.object,
    getPallet: PropTypes.func,
    getPalletWood: PropTypes.func,
    deletePallet: PropTypes.func,
    pallet: PropTypes.object,
    filter: PropTypes.object,
    palletLogs: PropTypes.array
}

const mapStateToProps = (state) => ({
    pallet: state.palletReducer.pallet,
    palletWood: state.woodReducer.woods,
    palletLogs: state.palletReducer.palletLogs,
    filter: state.palletReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    getPallet: (id) => dispatch(handleGetSinglePallet(id)),
    getPalletWood: (id) => dispatch(handleGetPalletWood(id)),
    deletePallet: (id) => dispatch(handleDeletePallet(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PalletDetail)
