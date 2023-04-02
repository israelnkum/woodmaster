import React, {useEffect} from 'react'
import PrintWrapper from "./print-wrapper";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getElectionCandidates} from "../../actions/candidates/CandidatesAction";
import {useParams} from "react-router";
import TlaImage from "../tla-image";
import {Tag} from "antd";
import {createGlobalStyle} from "styled-components";

const PrintStyles = createGlobalStyle`
    .p-title-container {
        background: #1a337e;
        border-radius: 20px;
        color: yellow;
        width: 50%;
    }
    .p-title {
        padding: 10px;
    }
`
function PrintCandidates (props) {
    const { getCandidates, electionData } = props
    const { id } = useParams()
    useEffect(() => {
        getCandidates(id).then()
    }, [])

    return (
        <PrintWrapper electionName={electionData.name} title={'Vetting Results'}>
            <PrintStyles/>
            {
                electionData.portfolios && electionData.portfolios.map((portfolio) => (
                    <table key={portfolio.id} align={'center'} style={{ width: '90%', pageBreakAfter: 'always', fontSize: '20px' }}>
                        <tbody className="ant-table-tbody">
                        <tr>
                            <td colSpan={4} align={'center'}>
                                <div className={'p-title-container'}>
                                    <p className={'p-title'}>{portfolio.portfolio}</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Avatar</td>
                            <td>Name</td>
                            <td>Vetting Score</td>
                            <td>Status</td>
                        </tr>
                        {
                            portfolio.candidates.map((candidate) => (
                                <tr key={candidate.id}>
                                    <td>
                                        <TlaImage preview={false} src={candidate.file} height={100} width={100} radius={10}/>
                                    </td>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.vettingScore}%</td>
                                    <td>
                                        {candidate.isNominee ? <Tag color={'darkred'}>DISQUALIFIED</Tag>: <Tag color={'darkgreen'}>QUALIFIED</Tag>}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                ))
            }

        </PrintWrapper>
    )
}

PrintCandidates.defaultProps = {
    electionData: {},
}

PrintCandidates.propTypes = {
    electionData: PropTypes.object.isRequired,
    getCandidates: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    electionData: state.candidateReducer.electionData
})

const mapDispatchToProps = (dispatch) => ({
    getCandidates:(id) => dispatch(getElectionCandidates(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PrintCandidates)
