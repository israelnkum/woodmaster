import React, {useEffect, useState} from 'react'
import {Spin} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {useOutletContext} from 'react-router'
import {handleGetAllWoods} from "../../actions/wood/Action";
import WoodTable from "./wood-table";

function AllWood (props) {
    const { getWood, wood, filter } = props
    const [loading, setLoading] = useState(true)
    const { setPageInfo, setExtra } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Wood', addLink: '/app/wood/form', buttonText: 'Wood' })

        getWood(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className={'pb-10'}>
            {/*<FilterWood/>*/}
            <Spin spinning={loading}>
                <WoodTable wood={wood}/>
            </Spin>
        </div>
    )
}

AllWood.propTypes = {
    pageInfo: PropTypes.object,
    getWood: PropTypes.func,
    wood: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    wood: state.woodReducer.wood,
    filter: state.woodReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getWood: (payload) => dispatch(handleGetAllWoods(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllWood)
