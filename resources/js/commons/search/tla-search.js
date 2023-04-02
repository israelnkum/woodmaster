import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { FiSearch } from 'react-icons/fi'

const TlaSearch = (props) => {
  const { callback } = props
  const [loading, setLoading] = useState(false)
  const onSearch = (value) => {
    setLoading(true)
    callback(value).then(() => {
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }
  return (
      <div align={'center'} style={{ marginTop: 10 }}>
        <Input  prefix={<FiSearch style={{ color: 'var(--Gray-500)'}} />} size={'large'} placeholder="Search"/>
      </div>
  )
}

TlaSearch.propTypes = {
  callback: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TlaSearch)
