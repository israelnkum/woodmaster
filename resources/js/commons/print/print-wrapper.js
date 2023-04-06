import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'antd'
import ReactToPrint from 'react-to-print'
import {PrinterOutlined} from '@ant-design/icons'
import {createGlobalStyle} from "styled-components";
import PrintHeader from "./print-header";

const GlobalStyles = createGlobalStyle`

`
export default function PrintWrapper (props) {
    const { children, electionName, title, btnText } = props
    const componentRef = useRef()
    return (

        <React.Fragment>
            <GlobalStyles/>
            <ReactToPrint
                trigger={() => <Button className={'print-btn'} icon={<PrinterOutlined/>}>Print {btnText}</Button>}
                content={() => componentRef.current}
            />

            <div style={{ display: 'none', marginTop: 120, width: '100%' }}>
                <div ref={componentRef} style={{ display: 'block', marginTop: 25 }}>
                    <PrintHeader electionName={electionName} title={title}/>
                    {children}
                </div>
            </div>
        </React.Fragment>

    )
}

PrintWrapper.defaultProps = {
    children: [],
    electionName: '',
    title: '',
    btnText: ''
}

PrintWrapper.propTypes = {
    children: PropTypes.any,
    electionName: PropTypes.string,
    title: PropTypes.string,
    btnText: PropTypes.string,
}
