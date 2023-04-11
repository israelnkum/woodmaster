import React from 'react'
import {Card, Statistic} from "antd";
import CountUp from 'react-countup';

const formatter = (value) => <CountUp end={value} separator=","/>;

// eslint-disable-next-line react/prop-types
function Widget({ title, value }) {
    return (
        <Card bordered={false} className={'min-w-[150px]'}>
            <Statistic title={title} value={value} formatter={formatter}/>
        </Card>
    )
}

export default Widget
