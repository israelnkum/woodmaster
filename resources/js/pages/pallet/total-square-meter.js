import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Space} from "antd";

function TotalSquareMeter(props) {
    const {pallet} = props

    return (
        <Space>
            <p><span className={'font-bold'}>Total Sheets:</span> {pallet?.total_sheets}</p> |
            <p><span className={'font-bold'}>Square Meter:</span> {pallet?.square_meter.toFixed(2)}</p>
        </Space>
    )
}

TotalSquareMeter.propTypes = {
    pallet: PropTypes.object,
}

const mapStateToProps = (state) => ({
    pallet: state.palletReducer.pallet,
})

export default connect(mapStateToProps)(TotalSquareMeter)
