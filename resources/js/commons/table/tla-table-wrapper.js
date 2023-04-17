import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Card, Table} from 'antd'
import {connect} from 'react-redux'
import TlaPagination from "./TlaPagination";
import ViewAllWrapper from "../view-all-wrapper";

function TlaTableWrapper({
                             meta,
                             data,
                             callbackFunction,
                             children,
                             numberColumn,
                             numberColumnTitle,
                             hasSelection,
                             filterObj,
                             extra,
                             setSelectedRows,
                             rowSelectionActions
                         }) {
    const [loading, setLoading] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRows(newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (

        <Card>
            <TlaPagination rowSelectionActions={rowSelectionActions} extra={extra} meta={meta} loadData={(pageNumber) => {
                const urlParams = new URLSearchParams(filterObj)
                urlParams.append('page', pageNumber);
                setLoading(true);
                (callbackFunction(urlParams)).then(() => setLoading(false))
            }}>
                <Table rowSelection={hasSelection ? rowSelection : null} pagination={false}
                       loading={loading} dataSource={data} scroll={{x: 50}} rowKey={'id'}>
                    {
                        numberColumn &&
                        <Table.Column
                            width={50}
                            title={numberColumnTitle}
                            render={(text, record, index) => {
                                let number = index + meta.from
                                return <>{`${number++}.`}</>
                            }}/>
                    }
                    <ViewAllWrapper loading={false} noData={data.length === 0}>
                        {children}
                    </ViewAllWrapper>
                </Table>
            </TlaPagination>
        </Card>
    )
}


TlaTableWrapper.defaultProps = {
    meta: {
        from: 1,
        to: 10,
        total: 500
    },
    data: [],
    numberColumnTitle: '#',
    numberColumn: true,
    hasSelection: false,
    filterObj: null,
}

TlaTableWrapper.propTypes = {
    meta: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    callbackFunction: PropTypes.func,
    children: PropTypes.any,
    hasSelection: PropTypes.bool,
    filterObj: PropTypes.object,
    numberColumnTitle: PropTypes.string,
    numberColumn: PropTypes.bool,
    extra: PropTypes.any,
    rowSelectionActions: PropTypes.any,
    setSelectedRows: PropTypes.func
}


export default connect()(TlaTableWrapper)
