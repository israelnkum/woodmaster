import { Form } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { handleSearchEmployees } from "../../../actions/employee/EmployeeAction";
import SearchItems from "./search";

function Employees(props) {
    const { getEmployees, form, label } = props
    return (
        <Form.Item
            name="employee_id"
            label={label}
            rules={[
                {
                    required: true,
                    message: `${label} is Required`,
                },
            ]}>
            <SearchItems search={getEmployees} displayField={'name'}
                         text={'Search by last name'}
                         onChangeCallback={({ id }) => {
                             form.setFieldsValue({
                                 employee_id: id
                             })
                         }}/>
        </Form.Item>
    )
}

Employees.defaultProps = {
    label: 'Employee'
}

Employees.propTypes = {
    getEmployees: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
    label: PropTypes.string,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEmployees: (query) => dispatch(handleSearchEmployees(query))
    }
}

export default connect(null, mapDispatchToProps)(Employees)
