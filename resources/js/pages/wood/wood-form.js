import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Checkbox, Col, Form, Input, InputNumber, Row} from 'antd'
import {connect} from 'react-redux'
import {handleAddWood, handleUpdateWood} from "../../actions/wood/Action";
import {TlaError, TlaSuccess} from "../../utils/messages";
import {FiPrinter} from "react-icons/fi";
import {handlePrintPalletReport} from "../../actions/pallet/Action";

function WoodForm(props) {
    const [loading, setLoading] = useState(false)
    const [printing, setPrinting] = useState(false)
    const [form] = Form.useForm();
    const {addWood, updateWood, printReport, id, palletNumber} = props
    const lengthInputRef = useRef(null)
    const widthInputRef = useRef(null)
    const sheetsInputRef = useRef(null)
    const formValues = {
        id: 0,
        parcel: 'NULL',
        print_barcode: true
    }

    const startPrinting = () => {
        setPrinting(true)
        printReport(id, palletNumber).then(() => setPrinting(false))
    }

    const submit = (values) => {
        setLoading(true)
        const formData = new FormData();

        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                formData.append(key, values[key]);
            }
        }

        formData.append('pallet_log_id', localStorage.getItem('palletLogId'));
        formData.append('sub_log', localStorage.getItem('subLog'));
        (values.id === 0 ? addWood : updateWood)(formData).then(() => {
            // form.resetFields()
            setLoading(false)
            lengthInputRef.current.focus({cursor: 'all'})
            TlaSuccess();
        }).catch((error) => {
            setLoading(false)
            TlaError(error.response.data.message)
        });
    };

    useEffect(() => {
        if (lengthInputRef.current) {
            lengthInputRef.current.focus({
                cursor: 'all',
            });
        }
    }, []);

    return (
        <Card title={'Add Record'} size={'small'} extra={[
            <Button
                    loading={printing}
                    onClick={startPrinting}
                    key={'print'} icon={<FiPrinter/>}>Print</Button>
        ]}>
            <Form form={form} preserve onFinish={submit} initialValues={formValues} layout="vertical">
                <Row gutter={10}>
                    <Col span={4}>
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
                    <Col span={4}>
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
                    <Col span={4}>
                        <Form.Item name="sheets" label="sheets"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Required'
                                       }
                                   ]}>
                            <InputNumber ref={sheetsInputRef} size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={4} className={'pt-7'}>
                        <Form.Item>
                            <Button loading={loading} size={"large"}
                                    block
                                    type="primary"
                                    className={'btn-primary'} htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={4} className={'pt-7'}>
                        <Form.Item name="print_barcode" valuePropName="checked" >
                            <Checkbox>Print Barcode</Checkbox>
                        </Form.Item>
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
                </Row>
            </Form>
        </Card>
    )
}

WoodForm.propTypes = {
    addWood: PropTypes.func.isRequired,
    id: PropTypes.any.isRequired,
    palletNumber: PropTypes.any.isRequired,
    printReport: PropTypes.func.isRequired,
    updateWood: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    addWood: (payload) => dispatch(handleAddWood(payload)),
    updateWood: (payload) => dispatch(handleUpdateWood(payload)),
    printReport: (id, palletNumber) => dispatch(handlePrintPalletReport(id, palletNumber))
})

export default connect(null, mapDispatchToProps)(WoodForm)
