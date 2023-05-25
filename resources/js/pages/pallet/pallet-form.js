import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Col, DatePicker, Form, Input, Row, Select, Spin} from 'antd'
import {connect} from 'react-redux'
import {useLocation, useNavigate} from "react-router-dom";
import {handleAddPallet, handleGetPalletLogs, handleUpdatePallet} from "../../actions/pallet/Action";
import {TlaError, TlaSuccess} from "../../utils/messages";
import {TlaModal} from "../../commons/pop-ups/tla-modal";
import {thicknesses} from "../../utils";
import dayjs from "dayjs";

function PalletForm(props) {
    const {addPallet, updatePallet, species, qualities, getPalletLogs} = props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const {state} = useLocation()

    const formValues = {
        id: 0,
        pallet_number: null,
        ...state.data,
        custom_created_date: state?.data ? dayjs(state.data.custom_created_date) : null,

    }

    const onFinish = (values) => {
        (values.id === 0 ? addPallet : updatePallet)(values).then((res) => {
            values.id !== 0 && localStorage.setItem('palletLogId', res.data.id)
            setLoading(false)
            TlaSuccess();
            navigate(`/app/pallets/${res.data.id}/details`)
        }).catch((error) => {
            setLoading(false)
            TlaError(error.response.data.message)
        });
    }

    return (
        <TlaModal title={(formValues.id === 0 ? 'New' : 'Edit') + ' Pallet'} width={520}>
            <Spin spinning={loading} tip={'Please Wait'}>
                <Form layout={'vertical'} form={form} initialValues={formValues} onFinish={onFinish}
                      title={`${(formValues.id === 0 ? "New" : "Edit")} Pallet`}>
                    <Row gutter={10}>
                        <Col span={formValues.id === 0 ? 24 : 12}>
                            <Form.Item name="pallet_number" label="pallet number"
                                       rules={[{
                                           required: true, message: 'Required'
                                       }]}>
                                <Input size={'large'}/>
                            </Form.Item>
                        </Col>
                        {
                            formValues.id !== 0 &&
                            <Col span={12}>
                                <Form.Item name="custom_created_date" label="Date"
                                           rules={[{
                                               required: true, message: 'Required'
                                           }]}>
                                    <DatePicker className={'!w-full'} size={'large'}/>
                                </Form.Item>
                            </Col>
                        }
                        <Col span={12}>
                            <Form.Item name="log" label="log"
                                       rules={[{
                                           required: true, message: 'Required'
                                       }]}>
                                <Input size={'large'}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="thickness"
                                       rules={[{
                                           required: true, message: 'Required'
                                       }]}
                                       label="Thickness">
                                <Select size={'large'} showSearch>
                                    {
                                        thicknesses.map(({id, name}) => (
                                            <Select.Option key={id} value={id}>{name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item rules={[{
                                required: true, message: 'Required'
                            }]} name="quality_id" label="Quality">
                                <Select size={'large'} showSearch>
                                    {qualities.map(({id, name}) => (
                                        <Select.Option key={id} value={id}>{name}</Select.Option>))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item rules={[{
                                required: true, message: 'Required'
                            }]} name="species_id" label="Species">
                                <Select size={'large'} showSearch>
                                    {species.map(({id, name}) => (
                                        <Select.Option key={id} value={id}>{name}</Select.Option>))}
                                </Select>
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

PalletForm.propTypes = {
    addPallet: PropTypes.func.isRequired,
    updatePallet: PropTypes.func.isRequired,
    getPalletLogs: PropTypes.func.isRequired,
    species: PropTypes.array.isRequired,
    qualities: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    species: state.commonReducer.commons.species,
    qualities: state.commonReducer.commons.qualities
});

const mapDispatchToProps = (dispatch) => ({
    addPallet: (payload) => dispatch(handleAddPallet(payload)),
    updatePallet: (payload) => dispatch(handleUpdatePallet(payload)),
    getPalletLogs: (id) => dispatch(handleGetPalletLogs(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PalletForm)
