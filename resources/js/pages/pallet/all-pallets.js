import React, {useEffect, useState} from 'react'
import {Space, Table, Button} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import {handleDeletePallet, handleGetAllPallets} from "../../actions/pallet/Action";
import ViewAllWrapper from "../../commons/view-all-wrapper";
import TlaEdit from "../../commons/tla-edit";
import TlaConfirm from "../../commons/TlaConfirm";
import {TlaSuccess} from "../../utils/messages";
import {Link} from "react-router-dom";

const { Column } = Table

function AllPallets (props) {
    const { getPallets, deletePallet, pallets, filter } = props
    const { data, meta }= pallets
    const [loading, setLoading] = useState(true)
    const { setPageInfo } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Pallets', addLink: '/app/pallets/form', buttonText: 'Pallet' })

        getPallets(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className={'pb-10'}>
            {/*<FilterPallets/>*/}
            <ViewAllWrapper loading={loading} noData={data.length === 0}>
                <TlaTableWrapper filterObj={filter}  callbackFunction={getPallets} data={data} meta={meta}>
                    <Column title="pallet #" dataIndex={'pallet_number'}/>
                    <Column title="thickness" dataIndex={'thickness'}/>
                    <Column title="quality" dataIndex={'quality'}/>
                    <Column title="species" dataIndex={'species'}/>
                    <Column title="date created" dataIndex={'date_created'}/>
                    <Column title="wood count" dataIndex={'wood_count'}/>
                    <Column title="details" render={ ({ id }) => (
                        <Link to={`/app/pallets/${id}/details`}>
                            <Button>
                                Details
                            </Button>
                        </Link>
                    ) }/>
                    <Column title="Action" render={ (value) => (
                        <Space size={ 0 }>
                            <TlaEdit icon data={ value } link={ 'form' } type={ 'text' }/>
                            <TlaConfirm title={ 'Pallet' } callBack={ () => {
                                deletePallet(value.id).then(() => TlaSuccess('Pallet Deleted'))
                            } }/>
                        </Space>
                    ) }/>
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
