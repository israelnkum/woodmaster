import React from 'react'
import PropTypes from 'prop-types'
import Pagination from 'react-js-pagination'
import {Typography} from 'antd'
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi'

function TlaPagination(props) {
    const {meta, loadData, children, showHeader, extra, rowSelectionActions, filterExtra} = props

    const PaginationC = () => (
        <Pagination
            activePage={meta.current_page}
            itemsCountPerPage={meta.per_page}
            totalItemsCount={meta.total || 0}
            onChange={loadData}
            pageRangeDisplayed={8}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="First"
            lastPageText="Last"
            hideFirstLastPages={true}
            nextPageText={<FiArrowRight/>}
            prevPageText={<FiArrowLeft/>}
        />
    )
    return (
        <div>
            {
                (showHeader || extra) &&
                <div className={'flex justify-between items-center mb-2'}>
                    <Typography.Text>
                        {meta.from} - {meta.to} of {meta.total}
                    </Typography.Text>
                    {rowSelectionActions}
                    {extra}
                </div>
            }
            <hr/>
            <div className={'flex flex-wrap justify-between py-2 items-center'}>
                {filterExtra ?? <>&nbsp;</>} <PaginationC/>
            </div>
            {children}
            <div className={'flex flex-wrap justify-end py-2 items-center'}>
                <PaginationC/>
            </div>
        </div>

    )
}

TlaPagination.defaultProps = {
    meta: {
        from: 0,
        to: 0,
        total: 0
    },
    showHeader: true
}

TlaPagination.propTypes = {
    meta: PropTypes.object.isRequired,
    children: PropTypes.node,
    loadData: PropTypes.func.isRequired,
    showHeader: PropTypes.bool,
    rowSelectionActions: PropTypes.any,
    extra: PropTypes.any,
    filterExtra: PropTypes.any,
}

export default TlaPagination
