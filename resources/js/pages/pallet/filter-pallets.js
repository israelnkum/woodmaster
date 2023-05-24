import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Col, DatePicker, Form, Input, Row} from "antd";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handleGetAllPallets, handlePrintPalletReport} from "../../actions/pallet/Action";
import TlaSelect from "../../commons/tla/TlaSelect";
import {thicknesses} from "../../utils";
import dayjs from "dayjs";

function FilterPallets(props) {
    const {submitFilter, filter, exportFilter, species, logNumbers, qualities} = props

    const dateFormat = 'YYYY-MM-DD';

    const initials = {
        ...filter,
        date: filter?.date === 'null' ? [] : [dayjs(filter?.startDate, dateFormat), dayjs(filter?.endDate, dateFormat)],
        export: false
    }

    return (
        <FilterWrapper initialValue={initials} submitFilter={submitFilter} exportFilter={exportFilter}>
            <Row gutter={10}>
                <Col span={3} xs={24} sm={24} md={3} lg={3} xl={3}>
                    <Form.Item
                        label={"Pallet Number"}
                        name={'pallet_number'}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={3} xs={24} sm={24} md={3} lg={3} xl={3}>
                    <TlaSelect hasAll name={'log_number'} optionKey={'self'} options={logNumbers} label={'Log Number'}/>
                </Col>
                <Col span={3} xs={24} sm={24} md={3} lg={3} xl={3}>
                    <TlaSelect hasAll name={'species_id'} optionKey={'name'} options={species} label={'species'}/>
                </Col>
                <Col span={4} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <TlaSelect hasAll name={'quality_id'} optionKey={'name'} options={qualities} label={'qualities'}/>
                </Col>
                <Col span={4} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <TlaSelect hasAll name={'thickness'} optionKey={'name'} options={thicknesses} label={'thickness'}/>
                </Col>
                <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item label={'Date'} name={'date'}>
                        <DatePicker.RangePicker size={'large'}/>
                    </Form.Item>
                </Col>
            </Row>
        </FilterWrapper>
    )
}

FilterPallets.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
    species: PropTypes.array,
    logNumbers: PropTypes.array,
    qualities: PropTypes.array
}

const mapStateToProps = (state) => ({
    filter: state.palletReducer.filter,
    species: state.commonReducer.commons.species,
    logNumbers: state.commonReducer.commons.logNumbers,
    qualities: state.commonReducer.commons.qualities
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllPallets(params)),
    exportFilter: (params) => dispatch(handlePrintPalletReport(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterPallets)
