import React from 'react'
import PropTypes from 'prop-types'
import {Col, Form, Input, Row, Select} from 'antd'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleAddPallet, handleUpdatePallet} from "../../actions/pallet/Action";
import TlaFormWrapper from "../../commons/tla-form-wrapper";

function PalletForm(props) {
    const {addPallet, updatePallet, species, qualities} = props

    const {state} = useLocation()

    const formValues = {
        id: 0,
        pallet_number: null,
        ...state.data
    }

    return (
        <TlaFormWrapper
            width={500}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addPallet : updatePallet}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Pallet`}>
            <Row gutter={10}>
                <Col span={12}>
                    <Form.Item name="pallet_number" label="pallet number">
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="thickness"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}
                               label="Thickness">
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Required'
                        }
                    ]} name="quality_id" label="Quality">
                        <Select size={'large'} showSearch>
                            {qualities.map(({id, name}) => (
                                <Select.Option key={id} value={id}>{name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Required'
                        }
                    ]} name="species_id" label="Species">
                        <Select size={'large'} showSearch>
                            {species.map(({id, name}) => (
                                <Select.Option key={id} value={id}>{name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item hidden name="id" label="ID"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    )
}

PalletForm.propTypes = {
    addPallet: PropTypes.func.isRequired,
    updatePallet: PropTypes.func.isRequired,
    species: PropTypes.array.isRequired,
    qualities: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    species: state.commonReducer.commons.species,
    qualities: state.commonReducer.commons.qualities
});

const mapDispatchToProps = (dispatch) => ({
    addPallet: (payload) => dispatch(handleAddPallet(payload)),
    updatePallet: (payload) => dispatch(handleUpdatePallet(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PalletForm)
