import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Form, Row, Select, Spin} from 'antd'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleMoveWood} from "../../actions/wood/Action";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import {handleGetPalletSubLogs} from "../../actions/pallet/Action";
import {useParams} from "react-router";

function MoveWoodForm(props) {
    const location = useLocation()
    const [loadingSubLogs, setLoadingSubLogs] = useState(true)
    const {moveWood, getPalletSubLogs, pallets} = props

    const {id} = useParams()
    const {state} = useLocation()

    const formValues = {
        id: 0,
        parcel: 'NULL',
        ...state.data
    }

    useEffect(() => {
        getPalletSubLogs(id).then(() => setLoadingSubLogs(false))
    }, [])

    return (
        <TlaFormWrapper
            modal={true}
            location={location?.state.background}
            width={520}
            initialValues={formValues}
            onSubmit={moveWood}
            formTitle={`Move Wood`}>
            <Spin spinning={loadingSubLogs}>
                <Row gutter={10}>
                    <Col span={8}>
                        <Form.Item name="pallet_id"
                                   label="pallet"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Required'
                                       }
                                   ]}>
                            <Select>
                                {
                                    pallets.map(({id, pallet_number}) => (
                                        <Select.Option key={id}>{pallet_number}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>

                    </Col>
                    <Col span={8}>

                    </Col>
                </Row>
            </Spin>
        </TlaFormWrapper>
    )
}

MoveWoodForm.propTypes = {
    moveWood: PropTypes.func.isRequired,
    getPalletSubLogs: PropTypes.func.isRequired,
    pallets: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    pallets: state.palletReducer.pallets.data
})

const mapDispatchToProps = (dispatch) => ({
    moveWood: (payload) => dispatch(handleMoveWood(payload)),
    getPalletSubLogs: (palletId) => dispatch(handleGetPalletSubLogs(palletId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MoveWoodForm)
