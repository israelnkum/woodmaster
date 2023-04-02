import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Badge, Empty, Space, Button, Tag, Typography, Divider } from 'antd'
import ReactToPrint from 'react-to-print'
import { PrinterOutlined } from '@ant-design/icons'
import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    .print-btn {
    }
`
export default function PrintCandidates (props) {
  const componentRef = useRef()
  return (

        <React.Fragment>
            <GlobalStyles/>
            <ReactToPrint
                trigger={() => <Button className={'print-btn'} icon={<PrinterOutlined/>}>Print Provisional Results</Button>}
                content={() => componentRef.current}
            />

            <div style={{ display: 'none', marginTop: 120, width: '100%' }}>
                <div ref={componentRef} style={{ display: 'block', marginTop: 25 }}>
                    {
                        props.electionResults[0] && props.electionResults[0].length === 0
                          ? <Empty/>
                          : <>
                                <table align={'center'}>
                                    <tbody className="ant-table-tbody">
                                    <tr style={{ marginTop: 30 }} className={'table-data'}>
                                        <td colSpan="3" align={'center'} className={'table-data'}>
                                            <Avatar
                                                size={100}
                                                src={'/images/ttuLogo.png'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" align={'center'} className={'table-data'}>
                                            <div style={{ justifyContent: 'center', alignContent: 'center', display: 'flex', alignItems: 'center' }}>
                                                <div align={'center'}>
                                                    <Typography.Title style={{ fontWeight: 'normal', marginBottom: -10 }} level={4}>
                                                        {'PROVISIONAL RESULTS'}
                                                    </Typography.Title>
                                                    <Typography.Title style={{ textTransform: 'uppercase', fontWeight: 'normal', marginBottom: -10 }} level={4}>
                                                        {props.electionName}
                                                    </Typography.Title>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <Divider/>
                                {
                                    props.electionResults[0]
                                      ?
                                        <table align={'center'} style={{ width: '90%', fontSize: '20px' }}>
                                            <tbody className="ant-table-tbody">
                                            <tr style={{ marginTop: 30 }} className={'table-data'}>
                                                <td align={'right'} className={'table-data'}>
                                                    <Tag color={'blue'} style={{ fontSize: 15, padding: 5 }}>
                                                        Eligible Voters: {props.electionResults[1]}
                                                    </Tag>
                                                </td>
                                                <td align={'left'} className={'table-data'}>
                                                    <Tag color={'purple'} style={{ fontSize: 15, padding: 5 }}>
                                                        Not Voted: {props.electionResults[2]}
                                                    </Tag>
                                                </td>
                                            </tr>
                                            {
                                                props.electionResults[0].map((results) => {
                                                  return (
                                                        <React.Fragment key={results.id}>

                                                            <tr>
                                                                <td style={{ border: 'none' }}>&nbsp;</td>
                                                                <td style={{ border: 'none' }}>&nbsp;</td>
                                                                <td style={{ border: 'none' }}>&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={2}>
                                                                    <Typography.Text style={{ textTransform: 'uppercase' }}>
                                                                        {results.portfolio.name}
                                                                    </Typography.Text>
                                                                </td>
                                                                <td>
                                                                    <Space>
                                                                        <Tag color={'green'}>
                                                                            Voted:&nbsp;{results.totalVotes}
                                                                        </Tag>
                                                                        <Tag color={'blue'}>
                                                                            Valid:&nbsp;{results.validVotes}
                                                                        </Tag>
                                                                        <Tag color={'red'}>
                                                                            Skipped:&nbsp;{results.results_count}
                                                                        </Tag>
                                                                    </Space>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Picture</td>
                                                                <td>Candidate</td>
                                                                <td>Vote Count</td>
                                                            </tr>
                                                            {
                                                                results.portfolio.candidates.map((candidate, index) => (
                                                                    <tr key={results.id + Math.random()}>
                                                                        <td>
                                                                            <Badge style={{ backgroundColor: '#1890ff' }} count={++index}>
                                                                                <Avatar size={80} src={'/storage/images/profile-pictures/' + candidate.photo.photoUrl}/>
                                                                            </Badge>
                                                                        </td>
                                                                        <td>
                                                                            <p style={{ textTransform: 'uppercase' }}>{candidate.name}</p>
                                                                        </td>
                                                                        <td>
                                                                            {candidate.results_count}
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </React.Fragment>
                                                  )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                      : <>
                                            Loading
                                        </>
                                }
                            </>
                    }
                </div>
            </div>
        </React.Fragment>

  )
}

PrintCandidates.propTypes = {
  electionResults: PropTypes.array.isRequired,
  electionName: PropTypes.string.isRequired,
}
