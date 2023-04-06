import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import {connect} from 'react-redux'
import ProfileBg from '../../assets/img/profile-bg.svg'
import PropTypes from 'prop-types'
import TlaImage from "../tla-image";

const GlobalStyles = createGlobalStyle`

  .profile-image {
    width: 70px;
    height: 70px;
    border: 4px solid #FFFFFF;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 200px;
  }
  .profile-name {
    color: var(--Gray-900);
    margin-top: 20px;
  }

  .profile-job-title {
    margin-top: -28px;
  }
`
const ProfileContainer = styled.div`
  background: url(${ProfileBg}) center center no-repeat;
  background-size: cover;
  height: 100px;
`
const AvatarContainer = styled.div`
  margin-top: -32px;
  justify-content: center;
  display: block;
  text-align: center;
  align-items: center;
  align-content: center;
`

function Profile ({user, size}) {
    return (
        <>
            <GlobalStyles/>
            <ProfileContainer/>
            <AvatarContainer>
                <TlaImage name={user.name} size={size} src={''}/>
                <h3 className={'text-md-medium profile-name'}>{user.name}</h3> <br/>
                {/*<h4 className={'text-sm-normal profile-job-title'}>Product Designer</h4>*/}
            </AvatarContainer>
        </>
    )
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    size: PropTypes.number,
}

const mapStateToProps = (state) => ({
    user: state.userReducer.loggedInUser,
})

export default connect(mapStateToProps, null)(Profile)
