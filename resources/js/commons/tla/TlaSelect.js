import React from 'react'
import PropTypes from 'prop-types'
import {Form, Select} from 'antd'


const TlaSelect = (props) => {
    const {options, optionKey, label, name, required, hasAll} = props

    return (
        <Form.Item
            label={label}
            name={name}
            rules={[
                {
                    required: required,
                    message: 'Required'
                }
            ]}>
            <Select size={'large'}
                    placeholder="Select"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch>
                { hasAll && <Select.Option value={'all'}>All</Select.Option>}
                {
                    options.map((option) => (
                        <Select.Option key={option.id || option.name}
                                       value={option.id}>{option[optionKey]}</Select.Option>
                    ))
                }
            </Select>
        </Form.Item>
    )
}
TlaSelect.propTypes = {
    required: false,
    hasAll: false,
}

TlaSelect.propTypes = {
    label: PropTypes.string,
    hasAll: PropTypes.bool,
    optionKey: PropTypes.node,
    required: PropTypes.bool,
    name: PropTypes.string,
    options: PropTypes.array
}

export default TlaSelect
