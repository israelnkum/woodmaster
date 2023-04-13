import React from 'react'
import Widget from "./widget";
import {connect} from "react-redux";
import PropTypes from "prop-types";

function Dashboard({ counts }) {
    return (
        <div className={'mt-1.5 flex-wrap flex gap-2'}>
            <Widget title={'Total Pallets'} value={counts?.pallets}/>
            <Widget title={'Total Species'} value={counts?.species}/>
            <Widget title={'Total Qualities'} value={counts?.qualities}/>
            <Widget title={'Total Logs'} value={counts?.palletLogs}/>
            <Widget title={'Total Woods'} value={counts?.woods}/>
        </div>
    )
}

Dashboard.propTypes = {
    counts: PropTypes.object.isRequired
}

const mapStateToProps = (stata) => ({
    counts: stata.commonReducer.commons.counts
})

export default connect(mapStateToProps)(Dashboard)
