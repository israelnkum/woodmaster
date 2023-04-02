import React from 'react'
import PrintWrapper from "./print-wrapper";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Avatar, Badge, Col, Row, Space, Typography} from "antd";
import {createGlobalStyle} from "styled-components";
import CountVote from "../../components/voting/results/count-vote";

const PrintStyles = createGlobalStyle`
    .p-title-container {
        background: #1a337e;
        border-radius: 20px;
        color: yellow;
        width: 50%;
    }
    .p-title {
        padding: 10px;
        text-transform: uppercase;
    }
`
function PrintResultsNew (props) {
    const {electionName, results} = props
    return (
        <PrintWrapper electionName={electionName} title={'Election Results'}>
            <PrintStyles/>
            <Row justify={'center'} gutter={[ 0, 30 ]}>
                {
                    results.map((result) => (
                        <Col span={20} key={result.id}>
                            <table align={'center'} style={{ width: '100%', fontSize: '30px' }}>
                                <tbody className="ant-table-tbody">
                                <tr>
                                    <td colSpan={2}>
                                        <Typography.Text className={'portfolio-title'}>{result.portfolio.name}</Typography.Text>
                                    </td>
                                    <td>
                                        <Space>
                                            <CountVote size={25} space={16} votes={`Voted ${result.totalVotes}`} color={'blue'} key={'totalVotes'}/>
                                            <CountVote size={25} space={16} votes={`Valid ${result.validVotes}`} color={'green'} key={'validVotes'}/>
                                            <CountVote size={25} space={16} votes={`Skipped ${result.results_count}`} color={'red'} key={'resultsCount'}/>
                                        </Space>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: '20px' }}>Picture</td>
                                    <td style={{ fontSize: '20px' }}>Candidate</td>
                                    <td style={{ fontSize: '20px' }}>Vote Count</td>
                                </tr>
                                {
                                    result.portfolio.candidates.map((candidate, index) => (
                                        <tr key={candidate.id}>
                                            <td style={{ width: 200 }}>
                                                <Badge style={{ backgroundColor: '#1890ff' }} count={++index}>
                                                    <Avatar size={150} src={'/storage/images/profile-pictures/' + candidate.photo.photoUrl}/>
                                                </Badge>
                                            </td>
                                            <td style={{ width: 350}}>
                                                <Typography.Text style={{ textTransform: 'uppercase' }}>{candidate.name}</Typography.Text>
                                            </td>
                                            <td>
                                                {candidate.results_count}
                                            </td>
                                        </tr>
                                    ))
                                }

                                </tbody>
                            </table>
                        </Col>
                    ))
                }
            </Row>
        </PrintWrapper>
    )
}

PrintResultsNew.defaultProps = {
    results: [],
    electionName: 'Election Name'
}

PrintResultsNew.propTypes = {
    results: PropTypes.array.isRequired,
    electionName: PropTypes.string,
}

export default connect()(PrintResultsNew)
