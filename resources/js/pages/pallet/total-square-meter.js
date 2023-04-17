import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";

function TotalSquareMeter(props) {
    const {pallet} = props

    return (
        <p>Square Meter: {pallet?.square_meter.toFixed(2)}</p>
    )
}

TotalSquareMeter.propTypes = {
    pallet: PropTypes.object,
}

const mapStateToProps = (state) => ({
    pallet: state.palletReducer.pallet,
})

export default connect(mapStateToProps)(TotalSquareMeter)
