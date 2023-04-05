import React from 'react'
import {Button, Space, Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {handleDeleteWood, handlePrintBarcode} from "../../actions/wood/Action";
import TlaEdit from "../../commons/tla-edit";
import {FiPrinter} from "react-icons/fi";
import {handleGetPalletWood} from "../../actions/pallet/Action";
import {useParams} from "react-router";

const {Column} = Table

function WoodTable(props) {
    // eslint-disable-next-line no-unused-vars
    const {wood, getWood, deleteWood, filter, printBarCode} = props

    const {id} = useParams()
    return (
        <div className={'pb-10'}>
            {/*<FilterWood/>*/}
            <TlaTableWrapper filterObj={{...filter, palletId: id}}
                             callbackFunction={getWood}
                             data={wood?.data}
                             meta={wood?.meta}>
                <Column title="number" dataIndex={'number'}/>
                <Column title="log" dataIndex={'log'}/>
                <Column title="sub log" dataIndex={'sub_log'}/>
                <Column title="length" dataIndex={'length'}/>
                <Column title="width" dataIndex={'width'}/>
                <Column title="sheets" dataIndex={'sheets'}/>
                <Column title="square meter" dataIndex={'square_meter'}/>
                {/*<Column title="parcel" dataIndex={'parcel'}/>*/}
                <Column title="Action" render={(value) => (
                    <Space>
                        <TlaEdit icon data={value} link={'/app/wood/form'} type={'text'}/>
                        {/*<TlaConfirm title={ 'Wood' } callBack={ () => {
                            deleteWood(value.id).then(() => TlaSuccess('Wood Wood'))
                        } }/>*/}
                        <Button onClick={() => {
                            printBarCode(value.id)
                        }} title={'Print Barcode'} icon={<FiPrinter/>}/>
                    </Space>
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

WoodTable.propTypes = {
    deleteWood: PropTypes.func,
    wood: PropTypes.object,
    filter: PropTypes.object,
    getWood: PropTypes.func,
    printBarCode: PropTypes.func,
}

const mapStateToProps = (state) => ({
    filter: state.woodReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    deleteWood: (id) => dispatch(handleDeleteWood(id)),
    printBarCode: (id) => dispatch(handlePrintBarcode(id)),
    getWood: (id) => dispatch(handleGetPalletWood(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(WoodTable)
