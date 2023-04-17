import {Form} from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {handleSearchPallets} from "../../actions/pallet/Action";
import SearchItems from "../../components/commons/form/search";

function SearchPallet(props) {
    const {getPallets, form, label} = props
    return (
        <Form.Item
            name="pallet_id"
            label={label}
            rules={[
                {
                    required: true,
                    message: `${label} is Required`,
                },
            ]}>
            <SearchItems search={getPallets} displayField={'pallet_number'}
                         text={'Pallet Number'}
                         onChangeCallback={({id}) => {
                             form.setFieldsValue({
                                 pallet_id: id
                             })
                         }}/>
        </Form.Item>
    )
}

SearchPallet.defaultProps = {
    label: 'Pallet'
}

SearchPallet.propTypes = {
    getPallets: PropTypes.func.isRequired,
    form: PropTypes.any.isRequired,
    label: PropTypes.string,
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPallets: (query) => dispatch(handleSearchPallets(query))
    }
}

export default connect(null, mapDispatchToProps)(SearchPallet)
