import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {Checkbox, Col, Form, Input, InputNumber, Row} from 'antd'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleAddWood, handleUpdateWood} from "../../actions/wood/Action";
import TlaFormWrapper from "../../commons/tla-form-wrapper";

function WoodFormOld(props) {
    const location = useLocation()
    const {addWood, updateWood} = props
    const lengthInputRef = useRef(null)
    const widthInputRef = useRef(null)
    const sheetsInputRef = useRef(null)

    const {state} = useLocation()

    const formValues = {
        id: 0,
        print_barcode: true,
        parcel: 'NULL',
        ...state.data
    }

    useEffect(() => {
        if (lengthInputRef.current) {
            lengthInputRef.current.focus({
                cursor: 'all',
            });
        }
    }, []);

    return (
        <TlaFormWrapper
            modal={true}
            location={location?.state.background}
            nextPage={'/app/wood/form'}
            width={520}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addWood : updateWood}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Wood`}>
            <Row gutter={10}>
                <Col span={8}>
                    <Form.Item name="length"
                               label="length"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <Input onPressEnter={(e) => {
                            e.target.value !== '' &&
                            widthInputRef.current.focus({cursor: 'all'})
                        }}
                               ref={lengthInputRef} size={'large'}/>
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
                        <InputNumber onPressEnter={(e) => {
                            e.target.value !== '' &&
                            sheetsInputRef.current.focus({cursor: 'all'})
                        }}
                                     ref={widthInputRef} size={'large'}/>
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
                        <InputNumber onPressEnter={(e) => {
                            e.target.value !== '' &&
                            lengthInputRef.current.focus({cursor: 'all'})
                        }}
                                     ref={sheetsInputRef} size={'large'}/>
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
                    <Form.Item hidden name="pallet_log_id" label="pallet_log_id"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                    <Form.Item hidden name="sub_log" label="sub_log"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="print_barcode" valuePropName="checked">
                        <Checkbox>Print Barcode</Checkbox>
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    )
}

WoodFormOld.propTypes = {
    addWood: PropTypes.func.isRequired,
    updateWood: PropTypes.func.isRequired
}


const mapDispatchToProps = (dispatch) => ({
    addWood: (payload) => dispatch(handleAddWood(payload)),
    updateWood: (payload) => dispatch(handleUpdateWood(payload))
})

export default connect(null, mapDispatchToProps)(WoodFormOld)
