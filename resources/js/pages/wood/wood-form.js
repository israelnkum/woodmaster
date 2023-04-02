import React from 'react'
import PropTypes from 'prop-types'
import {Col, Form, Input, InputNumber, Row} from 'antd'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleAddWood, handleUpdateWood} from "../../actions/wood/Action";
import TlaFormWrapper from "../../commons/tla-form-wrapper";

function WoodForm(props) {
    const {addWood, updateWood} = props

    const {state} = useLocation()

    const formValues = {
        id: 0,
        parcel: 'NULL',
        ...state.data
    }

    return (
        <TlaFormWrapper
            width={520}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addWood : updateWood}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Wood`}>
            <Row gutter={10}>
                <Col span={8}>
                    <Form.Item name="log" label="Log"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <InputNumber size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="sub_log" label="Sub Log"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="length" label="length"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <InputNumber size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="width" label="width"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <InputNumber size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="sheets" label="sheets"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <InputNumber size={'large'}/>
                    </Form.Item>
                </Col>
               {/* <Col span={8}>
                    <Form.Item name="parcel" label="Parcel">
                        <InputNumber size={'large'}/>
                    </Form.Item>
                </Col>*/}
                <Col>
                    <Form.Item hidden name="id" label="ID"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item hidden name="pallet_id" label="pallet_id"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    )
}

WoodForm.propTypes = {
    addWood: PropTypes.func.isRequired,
    updateWood: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    addWood: (payload) => dispatch(handleAddWood(payload)),
    updateWood: (payload) => dispatch(handleUpdateWood(payload))
})

export default connect(null, mapDispatchToProps)(WoodForm)
