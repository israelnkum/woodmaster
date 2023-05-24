import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Form, Input, Row, Spin} from 'antd'
import {connect} from 'react-redux'
import {useLocation, useNavigate} from "react-router-dom";
import {handleAddSpecie, handleUpdateSpecie} from "../../actions/species/Action";
import {TlaError, TlaSuccess} from "../../utils/messages";
import {TlaModal} from "../../commons/pop-ups/tla-modal";

function SpeciesForm(props) {
    const {addSpecie, updateSpecie} = props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const {state} = useLocation()

    const formValues = {
        id: 0,
        ...state.data
    }

    const onFinish = (values) => {
        (values.id === 0 ? addSpecie : updateSpecie)(values).then(() => {
            setLoading(false)
            TlaSuccess();
            navigate(-1);
        }).catch((error) => {
            setLoading(false)
            TlaError(error.response.data.message)
            navigate(-1);
        });
    }

    return (
        <TlaModal title={(formValues.id === 0 ? 'New' : 'Edit') + ' Species'} width={400}>
            <Spin spinning={loading} tip={'Please Wait'}>
                <Form layout={'vertical'} form={form} initialValues={formValues} onFinish={onFinish}
                      title={`${(formValues.id === 0 ? "New" : "Edit")} Species`}>
                    <Row gutter={10}>
                        <Col span={24}>
                            <Form.Item name="name" label="name"
                                       rules={[{
                                           required: true, message: 'Required'
                                       }]}>
                                <Input size={'large'}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <div>
                                <Button size={"large"}
                                        block
                                        type="primary"
                                        className={'btn-primary'} htmlType="submit">
                                    Submit
                                </Button>
                            </div>
                            <Form.Item hidden name="id" label="ID"
                                       rules={[{
                                           required: true, message: 'Required'
                                       }]}>
                                <Input size={'large'}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </TlaModal>
    )
}

SpeciesForm.propTypes = {
    addSpecie: PropTypes.func.isRequired,
    updateSpecie: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    addSpecie: (payload) => dispatch(handleAddSpecie(payload)),
    updateSpecie: (payload) => dispatch(handleUpdateSpecie(payload))
})

export default connect(null, mapDispatchToProps)(SpeciesForm)
