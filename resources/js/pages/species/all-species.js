import React, {useEffect, useState} from 'react'
import {Space, Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import {handleDeleteSpecie, handleGetAllSpecies} from "../../actions/species/Action";
import ViewAllWrapper from "../../commons/view-all-wrapper";
import TlaEdit from "../../commons/tla-edit";
import TlaConfirm from "../../commons/TlaConfirm";
import {TlaSuccess} from "../../utils/messages";
import {useNavigate} from "react-router-dom";

const {Column} = Table

function AllSpecies(props) {
    const {getSpecies, deleteSpecies, species, filter} = props
    const {data, meta} = species
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    const navigate = useNavigate()

    useEffect(() => {
        setPageInfo({title: 'Species', addLink: '/app/species/form', buttonText: 'Species'})

        getSpecies(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    const Details = ({id}) => {
        return {
            onClick: () => {
                navigate(`/app/species/${id}/details`)
            },
        };
    }

    return (
        <div className={'pb-10'}>
            <ViewAllWrapper loading={loading} noData={data.length === 0}>
                <TlaTableWrapper filterObj={filter} callbackFunction={getSpecies} data={data} meta={meta}>
                    <Column className={'cursor-pointer'} onCell={Details} title="Name" dataIndex={'name'}/>
                    <Column className={'cursor-pointer'} title="Action" render={(value) => (
                        <Space>
                            <TlaEdit icon data={value} link={'form'} type={'text'}/>
                           {/* <TlaConfirm title={'Species'} callBack={() => {
                                deleteSpecies(value.id).then(() => TlaSuccess('Species Deleted'))
                            }}/>*/}
                        </Space>
                    )}/>
                </TlaTableWrapper>
            </ViewAllWrapper>
        </div>
    )
}

AllSpecies.propTypes = {
    pageInfo: PropTypes.object,
    getSpecies: PropTypes.func,
    deleteSpecies: PropTypes.func,
    species: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    species: state.specieReducer.species,
    filter: state.specieReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getSpecies: (payload) => dispatch(handleGetAllSpecies(payload)),
    deleteSpecie: (id) => dispatch(handleDeleteSpecie(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllSpecies)
