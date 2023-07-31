import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Form, Input} from "antd";
import {FiFilter} from "react-icons/fi";
import dayjs from "dayjs";

function FilterWrapper(props) {
    const {submitFilter, exportFilter, children, initialValue} = props
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const onFinish = (values) => {
        setLoading(true)
        values.export = false
        values.print = false
        const dateFormat = 'YYYY-MM-DD';

        if (values.date && values.date.length > 0) {
            values['startDate'] = dayjs(values.date[0]).format(dateFormat)
            values['endDate'] = dayjs(values.date[1]).format(dateFormat)
        } else {
            values['startDate'] = null
            values['endDate'] = null
        }
        submitFilter(new URLSearchParams(values))
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }

    const completeExport = (values) => {
        setLoading(true)
        exportFilter(new URLSearchParams(values)).then(() => setLoading(false))
    }

    const FilterTitle = () => (
        <div className={'flex gap-x-2 justify-start'}>
            {/*<Button style={{ background: "darkgreen", color: "white", borderColor: "darkgreen" }} loading={loading} onClick={() => {
                form.setFieldsValue({export: true, print: false })
                completeExport(form.getFieldsValue())
            }}>
                Export
            </Button>
            <Button icon={<FiPrinter/>} danger loading={loading} onClick={() => {
                form.setFieldsValue({print: true, export: false})
                completeExport(form.getFieldsValue())
            }}>
                &nbsp;Print
            </Button>*/}
        </div>
    )
    return (
        <Form form={form} onFinish={onFinish} layout={'vertical'} initialValues={{...initialValue, export: false}}>
            <Card title={'Filter'} size={'small'} extra={[
                <Button key={'filter'} icon={<FiFilter/>} loading={loading} htmlType={'submit'} type={'primary'}>
                    &nbsp;Filter
                </Button>
            ]}>
                <Form.Item hidden name="export" label="export">
                    <Input/>
                </Form.Item>
                <Form.Item hidden name="print" label="print">
                    <Input/>
                </Form.Item>
                {
                    children &&
                    <>
                        {children}
                    </>
                }
            </Card>
        </Form>
    )
}

FilterWrapper.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    children: PropTypes.any,
    initialValue: PropTypes.object,
}


export default (FilterWrapper)
