import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {handleFilterPalletWood} from "../../actions/pallet/Action";
import TlaSelect from "../../commons/tla/TlaSelect";
import {Button, DatePicker, Form} from "antd";
import {useParams} from "react-router";
import dayjs from "dayjs";

function FilterWoods(props) {
    const {submitFilter, logNumbers, filter} = props
    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm()
    const {id} = useParams()

    const dateFormat = 'YYYY-MM-DD';

    const formValues = {
        ...filter,
        date: filter?.date === 'null' ? [] : [dayjs(filter?.startDate, dateFormat), dayjs(filter?.endDate, dateFormat)]
    }

    const submit = (values) => {
        setLoading(true)

        if (values.date) {
            values['startDate'] = dayjs(values.date[0]).format(dateFormat)
            values['endDate'] = dayjs(values.date[1]).format(dateFormat)
        }else {
            values['startDate'] = null
            values['endDate'] = null
        }

        values['palletId'] = id
        submitFilter(new URLSearchParams(values)).then(() => {
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        });
    };

    return (
        <Form initialValues={formValues} form={form} layout={'vertical'} onFinish={submit}>
            <div className={'flex flex-wrap items-center gap-2'}>
                <div className={'min-w-[100px]'}>
                    <TlaSelect
                        hasAll name={'pallet_log_id'}
                        optionKey={'log_number'}
                        options={logNumbers}
                        label={'Log Number'}/>
                </div>
                <div>
                    <Form.Item className={'max-w-[250px]'} label={'Date'} name={'date'}>
                        <DatePicker.RangePicker size={'large'}/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item label={'-'}>
                        <Button loading={loading} size={'large'} htmlType={'submit'}>Filter</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    )
}

FilterWoods.propTypes = {
    submitFilter: PropTypes.func,
    filter: PropTypes.object,
    logNumbers: PropTypes.array
}

const mapStateToProps = (state) => ({
    logNumbers: state.palletReducer.palletLogs,
    filter: state.woodReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleFilterPalletWood(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterWoods)
