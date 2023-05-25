import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Card, Descriptions, Divider, Input} from "antd";
import TlaEdit from "../../commons/tla-edit";
import PalletLogs from "./pallet-logs";

function PalletDetail(props) {
    const {pallet, palletLogs, loading} = props

    return (
        <Card loading={loading}>
            <div className={'mb-2 flex gap-2'}>
                <div className={'w-1/2'}>
                    <PalletLogs/>
                </div>
                <div className={'w-1/2'}>
                    <p className={'uppercase'}>Sub&nbsp;Log</p>
                    <Input defaultValue={localStorage.getItem('subLog')}
                           onChange={(e) => {
                               localStorage.setItem('subLog', e.target.value)
                           }}/>
                </div>
            </div>
            <Divider className={'!m-1'}/>
            <Descriptions layout='vertical' size={'small'} column={{sm: 1}}>
                <Descriptions.Item label="PALLET #">{pallet?.pallet_number}</Descriptions.Item>
                <Descriptions.Item label="THICKNESS">{pallet?.thickness}</Descriptions.Item>
                <Descriptions.Item label="QUALITY">{pallet?.quality}</Descriptions.Item>
                <Descriptions.Item label="SPECIES">{pallet?.species}</Descriptions.Item>
                <Descriptions.Item label="DATE">{pallet?.custom_created_date}</Descriptions.Item>
            </Descriptions>
            <Divider className={'!m-1'}/>
            <div className={'flex justify-center'}>
                <TlaEdit icon text={"Edit Pallet"}
                         data={{...pallet, log: palletLogs[palletLogs?.length - 1]?.log_number}}
                         link={'/app/pallets/form'} type={'text'}/>
            </div>
        </Card>
    )
}

PalletDetail.propTypes = {
   pallet: PropTypes.object,
    loading: PropTypes.bool,
    palletLogs: PropTypes.array
}


export default connect()(PalletDetail)
