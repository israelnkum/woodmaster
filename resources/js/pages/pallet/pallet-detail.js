import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {handleDeletePallet, handleGetPalletWood, handleGetSinglePallet} from "../../actions/pallet/Action";
import {useOutletContext, useParams} from "react-router";
import {Card, Col, Descriptions, Divider, Input, Row, Spin} from "antd";
import WoodTable from "../wood/wood-table";
import TlaEdit from "../../commons/tla-edit";
import WoodForm from "../wood/wood-form";
import PalletLogs from "./pallet-logs";

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
                    <Col span={20} xs={24} sm={24} md={20}>
                        <WoodForm id={id} palletNumber={pallet?.pallet_number}/>
                        <WoodTable wood={palletWood}/>
                    </Col>
                    <Col span={4} xs={24} sm={24} md={4}>
                        <Card loading={loading}>
                            <div className={'mb-2'}>
                                <div>
                                    <PalletLogs/>
                                </div>
                                <div>
                                    <p className={'uppercase'}>Sub&nbsp;Log</p>
                                    <Input defaultValue={localStorage.getItem('subLog')}
                                           onChange={(e) => {
                                               localStorage.setItem('subLog', e.target.value)
                                           }}/>
                                </div>
                            </div>
                            <Divider className={'!m-1'}/>
                            <Descriptions layout='vertical' size={'small'} column={{sm: 1}}>
                                <Descriptions.Item label="PALLET #">{pallet?.pallet_number}</Descriptions.Item>
                                <Descriptions.Item label="THICKNESS">{pallet?.thickness}</Descriptions.Item>
                                <Descriptions.Item label="QUALITY">{pallet?.quality}</Descriptions.Item>
                                <Descriptions.Item label="SPECIES">{pallet?.species}</Descriptions.Item>
                                <Descriptions.Item label="DATE">{pallet?.date_created}</Descriptions.Item>
                            </Descriptions>
                            <Divider className={'!m-1'}/>
                            <div className={'flex justify-center'}>
                                <TlaEdit icon text={"Edit Pallet"}
                                         data={{...pallet, log: palletLogs[palletLogs?.length - 1]?.log_number}}
                                         link={'/app/pallets/form'} type={'text'}/>
                            </div>
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
