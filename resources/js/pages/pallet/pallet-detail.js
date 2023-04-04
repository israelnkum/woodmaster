import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {handleDeletePallet, handleGetPalletWood, handleGetSinglePallet} from "../../actions/pallet/Action";
import {useOutletContext, useParams} from "react-router";
import {Card, Col, Descriptions, Input, Row, Select, Spin} from "antd";
import WoodTable from "../wood/wood-table";
import TlaEdit from "../../commons/tla-edit";
import WoodForm from "../wood/wood-form";

function PalletDetail(props) {
    const {getPallet, getPalletWood, palletWood, pallet} = props
    const [loading, setLoading] = useState(true)
    const [loadingWood, setLoadingWood] = useState(true)
    const {setPageInfo} = useOutletContext();
    const {id} = useParams()

    let pageData = {
        title: 'Pallet Detail',
        buttonText: 'Wood'
    }

    useEffect(() => {
        setPageInfo(pageData)

        getPallet(id).then(() => setLoading(false))

        getPalletWood(id).then(() => setLoadingWood(false))

        localStorage.setItem('palletLogNumber', pallet?.logs[pallet?.logs.length - 1].log_number)
        localStorage.setItem('palletLogId', pallet?.logs[pallet?.logs.length - 1].id)
    }, [])


    return (
        <div className={'pb-10'}>
            {/*<FilterPallets/>*/}
            <Row gutter={10}>
                <Col span={20} xs={24} sm={24} md={20}>
                    <WoodForm/>
                    <Spin spinning={loadingWood}>
                        <WoodTable wood={palletWood}/>
                    </Spin>
                </Col>
                <Col span={4} xs={24} sm={24} md={4}>
                    <Card loading={loading}>
                        <div className={'mb-2'}>
                            <div>
                                <p className={'uppercase'}>Log</p>
                                <Select onChange={(value, option) => {
                                    localStorage.setItem('palletLogNumber', option.children)
                                    localStorage.setItem('palletLogId', value)
                                }} className={'w-full'}
                                        defaultValue={parseInt(localStorage.getItem('palletLogId'))}>
                                    {
                                        pallet?.logs.map(({id, log_number}) => (
                                            <Select.Option key={id} value={id}>{log_number}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div>
                                <p className={'uppercase'}>Sub&nbsp;Log</p>
                                <Input defaultValue={localStorage.getItem('subLog')}
                                       onChange={(e) => {
                                           localStorage.setItem('subLog', e.target.value)
                                       }}/>
                            </div>
                        </div>
                        <Descriptions layout='vertical' size={'small'} column={{sm: 1}}>
                            <Descriptions.Item label="PALLET #">{pallet?.pallet_number}</Descriptions.Item>
                            <Descriptions.Item label="THICKNESS">{pallet?.thickness}</Descriptions.Item>
                            <Descriptions.Item label="QUALITY">{pallet?.quality}</Descriptions.Item>
                            <Descriptions.Item label="SPECIES">{pallet?.species}</Descriptions.Item>
                            <Descriptions.Item label="DATE">{pallet?.date_created}</Descriptions.Item>
                        </Descriptions>
                        <TlaEdit icon text={"Edit Pallet"}
                                 data={{
                                     ...pallet}}
                                 link={'/app/pallets/form'} type={'text'}/>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

PalletDetail.propTypes = {
    pageInfo: PropTypes.object,
    palletWood: PropTypes.object,
    getPallet: PropTypes.func,
    getPalletWood: PropTypes.func,
    deletePallet: PropTypes.func,
    pallet: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    pallet: state.palletReducer.pallet,
    palletWood: state.woodReducer.woods,
    filter: state.palletReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    getPallet: (id) => dispatch(handleGetSinglePallet(id)),
    getPalletWood: (id) => dispatch(handleGetPalletWood(id)),
    deletePallet: (id) => dispatch(handleDeletePallet(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PalletDetail)
