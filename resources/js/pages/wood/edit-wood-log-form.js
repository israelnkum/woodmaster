import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Checkbox, Col, Form, Input, Row} from 'antd'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleEditLogNumber} from "../../actions/wood/Action";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import TlaSelect from "../../commons/tla/TlaSelect";

function EditWoodLogForm(props) {
    const location = useLocation()
    const [createNew, setCreateNew] = useState(false)
    const {editLog, palletLogs} = props

    const {state} = useLocation()
    const [form] = Form.useForm();

    let formValues = {
        id: 0,
        create_new: false,
        ...state.data
    }

    return (
        <TlaFormWrapper
            customForm={form}
            modal={true}
            location={location?.state.background}
            width={300}
            initialValues={formValues}
            onSubmit={editLog}
            formTitle={`Edit Log Number`}>
            <Row gutter={10}>
                <Col span={24} className={'mb-3'}>
                    <Form.Item name="create_new" valuePropName="checked" noStyle>
                        <Checkbox onChange={() => setCreateNew(!createNew)}>Create New</Checkbox>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    {
                        createNew ?
                            <Form.Item rules={[
                                {required: true}
                            ]} label={'Log Number'} name={'log_number'}>
                                <Input size={'large'}/>
                            </Form.Item> :
                            <TlaSelect
                                label={'Log Number'} name={'pallet_log_id'}
                                required options={palletLogs}
                                optionKey={'log_number'}/>
                    }
                </Col>
                <Col span={8}>
                    <Form.Item hidden name={'id'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item hidden name={'pallet_id'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item hidden name={'sub_logs'}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    )
}

EditWoodLogForm.propTypes = {
    editLog: PropTypes.func.isRequired,
    palletLogs: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    palletLogs: state.palletReducer.palletLogs
})

const mapDispatchToProps = (dispatch) => ({
    editLog: (payload) => dispatch(handleEditLogNumber(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditWoodLogForm)
