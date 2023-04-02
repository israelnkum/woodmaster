import {ArrowUpOutlined} from '@ant-design/icons';
import {Card, Statistic} from 'antd';
import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const TlaWidget = (props) => {
    const {title, value, icon, link} = props
    return (
        <Link to={link}>
            <Card hoverable={link !== '#'}>
                <Statistic
                    title={title}
                    value={value}
                    precision={0}
                    valueStyle={{
                        color: '#000000',
                    }}
                    prefix={icon}
                />
            </Card>
        </Link>
    )
};
TlaWidget.defaultProps = {
    title: 'Title',
    value:'0.00',
    icon: null,
    link: '#'
}
TlaWidget.propTypes = {
    title: PropTypes.string,
    value: PropTypes.any,
    icon: PropTypes.node,
    link: PropTypes.string
}
export default TlaWidget;
