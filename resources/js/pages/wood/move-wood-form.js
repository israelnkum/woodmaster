import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Form, Input, Row, Spin} from 'antd'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleMoveWood} from "../../actions/wood/Action";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import {handleGetPalletSubLogs} from "../../actions/pallet/Action";
import TlaSelect from "../../commons/tla/TlaSelect";
import SearchPallet from "../pallet/search-pallet";

function MoveWoodForm(props) {
    const location = useLocation()
    const [loadingSubLogs, setLoadingSubLogs] = useState(false)
    const {moveWood, getPalletSubLogs, palletLogs, palletSubLogs} = props

    const [disabled, setDisabled] = useState(true)

    const {state} = useLocation()
    const [form] = Form.useForm();
    let formValues = {
        id: 0,
        ...state.data
    }

    return (
        <TlaFormWrapper
            customForm={form}
            modal={true}
            location={location?.state.background}
            width={520}
            initialValues={formValues}
            onSubmit={moveWood}
            formTitle={`Move Wood(s)`}>
            <Spin spinning={loadingSubLogs}>
                <Row gutter={10}>
                    {
                        state.data.sub_logs.length === 0 ?
                            <>
                                <Col span={8}>
                                    <TlaSelect onChange={(value) => {
                                        setLoadingSubLogs(true)
                                        getPalletSubLogs(value).then((res) => {
                                            form.resetFields(['sub_log'])
                                            setDisabled(res.data.length === 0)
                                            setLoadingSubLogs(false)
                                        })
                                    }}
                                               label={'Log'}
                                               name={'pallet_log_id'}
                                               required options={palletLogs}
                                               optionKey={'log_number'}/>
                                </Col>
                                <Col span={8}>
                                    <TlaSelect
                                        disabled={disabled}
                                        hasAll
                                        label={'Sub Log'}
                                        name={'sub_log'}
                                        required options={palletSubLogs}
                                        optionKey={'self'}/>
                                </Col>
                            </> :
                            <Col span={8} className={'flex items-center'}>
                                <p>Move <b>{state.data.sub_logs.length}</b> wood(s) to which pallet?</p>
                            </Col>
                    }
                    <Col span={8}>
                        <Form.Item hidden name={'id'}>
                            <Input/>
                        </Form.Item>
                        <Form.Item hidden name={'sub_logs'}>
                            <Input/>
                        </Form.Item>
                        <SearchPallet form={form}/>
                       {/* <TlaSelect
                            label={'Pallet'}
                            name={'pallet_id'}
                            required options={pallets}
                            optionKey={'pallet_number'}/>*/}
                    </Col>
                </Row>
            </Spin>
        </TlaFormWrapper>
    )
}

MoveWoodForm.propTypes = {
    moveWood: PropTypes.func.isRequired,
    getPalletSubLogs: PropTypes.func.isRequired,
    pallets: PropTypes.array.isRequired,
    palletLogs: PropTypes.array.isRequired,
    palletSubLogs: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    pallets: state.palletReducer.pallets.data,
    palletLogs: state.palletReducer.palletLogs,
    palletSubLogs: state.palletReducer.palletSubLogs,
})

const mapDispatchToProps = (dispatch) => ({
    moveWood: (payload) => dispatch(handleMoveWood(payload)),
    getPalletSubLogs: (palletLogId) => dispatch(handleGetPalletSubLogs(palletLogId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MoveWoodForm)
