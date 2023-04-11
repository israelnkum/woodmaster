import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Col, DatePicker, Form, Row} from "antd";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handlePrintPalletReport, handleGetAllPallets} from "../../actions/pallet/Action";
import TlaSelect from "../../commons/tla/TlaSelect";
import {thicknesses} from "../../utils";

function FilterPallets(props) {
    const {submitFilter, filter, exportFilter, species, qualities} = props
    const initials = {
        ...filter,
        export: false
    }

    return (
        <FilterWrapper initialValue={initials} submitFilter={submitFilter} exportFilter={exportFilter}>
            <Row gutter={10}>
               {/* <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Form.Item name="date" label="Date Range">
                        <DatePicker.RangePicker size={'large'}/>
                    </Form.Item>
                </Col>*/}
                <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                    <TlaSelect hasAll name={'species_id'} optionKey={'name'} options={species} label={'species'}/>
                </Col>
                <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                    <TlaSelect hasAll name={'quality_id'} optionKey={'name'} options={qualities} label={'qualities'}/>
                </Col>
                <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                    <TlaSelect hasAll name={'thickness'} optionKey={'name'} options={thicknesses} label={'thickness'}/>
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
    qualities: PropTypes.array
}

const mapStateToProps = (state) => ({
    filter: state.palletReducer.filter,
    species: state.commonReducer.commons.species,
    qualities: state.commonReducer.commons.qualities
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllPallets(params)),
    exportFilter: (params) => dispatch(handlePrintPalletReport(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterPallets)
