import React from 'react'
import PropTypes from 'prop-types'
import Pagination from 'react-js-pagination'
import { Card, Typography } from 'antd'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

function TlaPagination (props) {
    const { meta, loadData, children, showHeader, extra } = props

    return (
        <div>
            {
                (showHeader || extra) &&
                <div className={'flex justify-between items-center mb-2'}>
                    <Typography.Text>
                        {meta.from} - {meta.to} of {meta.total}
                    </Typography.Text>

                    {extra}
                </div>
            }
            {children}
            <div style={{ marginTop: 10 }} align={'right'}>
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
                    nextPageText={<FiArrowRight />}
                    prevPageText={<FiArrowLeft />}
                />
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
    extra: PropTypes.any,
}

export default TlaPagination
