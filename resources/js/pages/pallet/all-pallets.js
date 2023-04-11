import React, {useEffect, useState} from 'react'
import {Space, Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import {handleDeletePallet, handleGetAllPallets} from "../../actions/pallet/Action";
import ViewAllWrapper from "../../commons/view-all-wrapper";
import TlaEdit from "../../commons/tla-edit";
import TlaConfirm from "../../commons/TlaConfirm";
import {TlaSuccess} from "../../utils/messages";
import {useNavigate} from "react-router-dom";
import FilterPallets from "./filter-pallets";

const {Column} = Table

function AllPallets(props) {
    const {getPallets, deletePallet, pallets, filter} = props
    const {data, meta} = pallets
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    const navigate = useNavigate()

    useEffect(() => {
        setPageInfo({title: 'Pallets', addLink: '/app/pallets/form', buttonText: 'Pallet'})

        getPallets(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    const Details = ({id}) => {
        return {
            onClick: () => {
                navigate(`/app/pallets/${id}/details`)
            },
        };
    }

    return (
        <div className={'pb-10'}>
            <FilterPallets/>
            <ViewAllWrapper loading={loading} noData={data.length === 0}>
                <TlaTableWrapper filterObj={filter} callbackFunction={getPallets} data={data} meta={meta}>
                    <Column className={'cursor-pointer'} onCell={Details} title="pallet #" dataIndex={'pallet_number'}/>
                    <Column className={'cursor-pointer'} onCell={Details} title="thickness" dataIndex={'thickness'}/>
                    <Column className={'cursor-pointer'} onCell={Details} title="quality" dataIndex={'quality'}/>
                    <Column className={'cursor-pointer'} onCell={Details} title="species" dataIndex={'species'}/>
                    <Column className={'cursor-pointer'} onCell={Details} title="date created" dataIndex={'date_created'}/>
                    <Column className={'cursor-pointer'} onCell={Details} title="square meter" dataIndex={'square_meter'}/>
                    <Column className={'cursor-pointer'} onCell={Details} title="logs" dataIndex={'logs_count'}/>
                    <Column className={'cursor-pointer'} onCell={Details} title="woods" dataIndex={'wood_count'}/>
                    <Column className={'cursor-pointer'} title="Action" render={(value) => (
                        <Space>
                            <TlaEdit icon
                                     data={{...value, log: value?.pallet_logs[value.pallet_logs.length - 1].log_number}}
                                     link={'form'} type={'text'}/>
                            <TlaConfirm title={'Pallet'} callBack={() => {
                                deletePallet(value.id).then(() => TlaSuccess('Pallet Deleted'))
                            }}/>
                        </Space>
                    )}/>
                </TlaTableWrapper>
            </ViewAllWrapper>
        </div>
    )
}

AllPallets.propTypes = {
    pageInfo: PropTypes.object,
    getPallets: PropTypes.func,
    deletePallet: PropTypes.func,
    pallets: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    pallets: state.palletReducer.pallets,
    filter: state.palletReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getPallets: (payload) => dispatch(handleGetAllPallets(payload)),
    deletePallet: (id) => dispatch(handleDeletePallet(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllPallets)
