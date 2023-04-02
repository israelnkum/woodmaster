import React from 'react'
import {Avatar} from 'antd'
import PropTypes from "prop-types";
import {createGlobalStyle} from "styled-components";

const PrintStyles = createGlobalStyle`
    .portfolio-container {
        background: #1a337e;
        padding:  5px 50px 2px 50px;
        border-radius: 20px;
    }
    .print-title{
        color: yellow;
        font-weight: 900;
        font-size: 30px;
        margin-bottom: 0;
        text-transform: uppercase;
    }
    .election-name{
        color: yellow;
        font-weight: 200;
        font-size: 25px;
    }
`
export default function PrintHeader (props) {
    const { electionName, title } = props
    return (
      <table align={'center'}>
          <PrintStyles/>
          <tbody className="ant-table-tbody">
          <tr  className={'table-data'}>
              <td colSpan="3" align={'center'} className={'table-data'}>
                  <Avatar
                      size={100}
                      src={'/images/ttuLogo.png'}
                  />
              </td>
          </tr>
          <tr>
              <td colSpan="3" align={'center'} >
                  <div className={'portfolio-container'}>
                      <h2 className={'print-title'}>
                          {title}
                      </h2>
                      <h4 className={'election-name'}>
                          {electionName}
                      </h4>
                  </div>
              </td>
          </tr>
          </tbody>
      </table>
  )
}

PrintHeader.defaultProps = {
    electionName: 'Election Name',
    title: 'Print Title'
}

PrintHeader.propTypes = {
    electionName:  PropTypes.string.isRequired,
    title:  PropTypes.string.isRequired,
}
