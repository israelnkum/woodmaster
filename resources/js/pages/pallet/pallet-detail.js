import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {handleDeletePallet, handleGetPalletWood, handleGetSinglePallet} from "../../actions/pallet/Action";
import {useOutletContext, useParams} from "react-router";
import {Card, Col, Descriptions, Row} from "antd";
import WoodTable from "../wood/wood-table";

function PalletDetail(props) {
    const {getPallet, getPalletWood, palletWood, pallet} = props
    const [loading, setLoading] = useState(true)
    const [loadingWood, setLoadingWood] = useState(true)
    const {setPageInfo} = useOutletContext();
    const {id} = useParams()

    useEffect(() => {
        setPageInfo({
            title: 'Pallet Detail',
            addLink: '/app/wood/form',
            extraInfo: { pallet_id: id },
            buttonText: 'Wood'
        })

        getPallet(id).then(() => setLoading(false))

        getPalletWood(id).then(() => setLoadingWood(false))
    }, [])

    return (
        <div className={'pb-10'}>
            {/*<FilterPallets/>*/}
            <Row gutter={10}>
                <Col span={20} xs={24} sm={24} md={20}>
                    <WoodTable wood={palletWood}/>
                </Col>
                <Col span={4} xs={24} sm={24} md={4}>
                    <Card>
                        <Descriptions layout='vertical' size={'small'} column={{sm: 1}}>
                            <Descriptions.Item label="PALLET #">{pallet?.pallet_number}</Descriptions.Item>
                            <Descriptions.Item label="THICKNESS">{pallet?.thickness}</Descriptions.Item>
                            <Descriptions.Item label="QUALITY">{pallet?.quality}</Descriptions.Item>
                            <Descriptions.Item label="SPECIES">{pallet?.species}</Descriptions.Item>
                            <Descriptions.Item label="DATE">{pallet?.date_created}</Descriptions.Item>
                        </Descriptions>
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
