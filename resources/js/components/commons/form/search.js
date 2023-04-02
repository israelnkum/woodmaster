import React, { useState } from 'react'
import { Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const { Option } = Select

let timeout
let currentValue

const SearchItems = (props) => {
    const { search, onChangeCallback, text, displayField } = props

    const [data, setData] = useState([])
    const [value, setValue] = useState(undefined)
    const [hasData, setHasData] = useState(true)


    const fetch = (value, callback) => {
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
        currentValue = value

        function fake () {
            search(currentValue)
                .then(res => {
                    if (currentValue === value) {
                        const data = []
                        res.data.forEach(item => {
                            data.push(item)
                        })
                        setHasData(data.length > 0)
                        callback(data)
                    }
                })
        }

        timeout = setTimeout(fake, 300)
    }

    const handleSearch = value => {
        if (value) {
            fetch(value, data => setData(data))
        } else {
            setData([])
            setHasData(true)
        }
    }

    const handleChange = value => {
        setValue(value)
        onChangeCallback(data.find((itm) => itm.id === value))
    }

    const options = data.map(d => <Option key={d.id} value={d.id}>{d[displayField]}</Option>)
    return (
        <>
            <Select
                style={{ width: '100%' }}
                size={'large'}
                showSearch
                suffixIcon={<SearchOutlined/>}
                value={value}
                className="item-search"
                placeholder={text}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}>
                {options}
            </Select>
            {
                !hasData && <small style={{ color: 'red' }}>No data found the search</small>
            }
        </>
    )
}

SearchItems.defaultProps = {
    text: "Type to search...",
    displayField: 'name'
}

SearchItems.propTypes = {
    text: PropTypes.string,
    displayField: PropTypes.string,
    search: PropTypes.func.isRequired,
    onChangeCallback: PropTypes.func,
}

export default SearchItems
