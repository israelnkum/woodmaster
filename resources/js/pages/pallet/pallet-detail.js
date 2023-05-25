import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {handleDeletePallet, handleGetPalletWood, handleGetSinglePallet} from "../../actions/pallet/Action";
import {useOutletContext, useParams} from "react-router";
import {Affix, Button, Card, Col, Row, Spin, Tabs} from "antd";
import WoodTable from "../wood/wood-table";
import WoodForm from "../wood/wood-form";
import PalletInfo from "./pallet-info";
import PalletStats from "./pallet-stats";

function PalletDetail(props) {
    const {getPallet, getPalletWood, palletWood, pallet, palletLogs, filter} = props
    const [loading, setLoading] = useState(true)
    const [displayAll, setDisplayAll] = useState(false)
    const [loadingWood, setLoadingWood] = useState(true)
    const {setPageInfo} = useOutletContext();
    const {id} = useParams()

    let pageData = {
        title: 'Pallet Detail', buttonText: 'Wood'
    }

    filter['palletId'] = id

    useEffect(() => {
        setPageInfo(pageData)

        getPallet(id).then((res) => {
            localStorage.setItem('totalSquareMeter', res.data.square_meter)
            setLoading(false)
        })
        filter['displayAll'] = false
        getPalletWood(new URLSearchParams(filter)).then(() => setLoadingWood(false))
    }, [])

    return (<div className={'pb-10'}>
        <Spin spinning={loadingWood || loading}>
            {/*<FilterPallets/>*/}
            {(!loading && !loadingWood) &&
                <Row gutter={10}>
                    <Col span={18} xs={24} sm={24} md={18}>
                        <Affix offsetTop={70}>
                            <WoodForm id={id} palletNumber={pallet?.pallet_number}/>
                        </Affix>
                        <WoodTable displayAllNode={
                            <Button onClick={() => {
                                setDisplayAll(!displayAll)
                                setLoadingWood(true);
                                filter['displayAll'] = !displayAll;
                                getPalletWood(new URLSearchParams(filter)).then(() => setLoadingWood(false))
                            }}>{displayAll ? 'Group' : 'Display All'}</Button>
                        } wood={palletWood}/>
                    </Col>
                    <Col span={6} xs={24} sm={24} md={6}>
                        <Affix offsetTop={70}>
                            <Card>
                                <Tabs destroyInactiveTabPane={true} items={[
                                    {
                                        key: 'detail',
                                        label: 'Pallet Info',
                                        children: <PalletInfo pallet={pallet} palletLogs={palletLogs}
                                                              loading={loading}/>,
                                        forceRender: true
                                    },
                                    {
                                        key: 'pallet-info',
                                        label: 'Pallet Stats',
                                        children: <PalletStats/>
                                    }
                                ]}/>
                            </Card>
                        </Affix>
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
    filter: state.woodReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    getPallet: (id) => dispatch(handleGetSinglePallet(id)),
    getPalletWood: (id) => dispatch(handleGetPalletWood(id)),
    deletePallet: (id) => dispatch(handleDeletePallet(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PalletDetail)
