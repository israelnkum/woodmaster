import React from 'react'
import PropTypes from 'prop-types'
import {Form, Select} from 'antd'

const TlaSelect = (props) => {
    const {options, optionKey, label, name, required, hasAll, onChange, disabled} = props

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
                    disabled={disabled}
                    onChange={onChange}
                    placeholder="Select"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    showSearch>
                {hasAll && <Select.Option value={'all'}>All</Select.Option>}
                {
                    options.map((option) => (
                        <Select.Option
                            key={option.id || option.name || option}
                            value={optionKey === "self" ? option : option.id}>
                            {optionKey === "self" ? option : option[optionKey]}
                        </Select.Option>
                    ))
                }
            </Select>
        </Form.Item>
    )
}
TlaSelect.propTypes = {
    required: false,
    hasAll: false,
    disabled: false,
}

TlaSelect.propTypes = {
    label: PropTypes.string,
    hasAll: PropTypes.bool,
    optionKey: PropTypes.node,
    required: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    options: PropTypes.array
}

export default TlaSelect
