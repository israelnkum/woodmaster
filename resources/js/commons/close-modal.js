import React from 'react'
import {Button} from 'antd'
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function CloseModal({btnText}) {
    const navigate = useNavigate()
    return (
        <Button size={'large'} block onClick={() => navigate(-1)}>
            {btnText}
        </Button>
    )
}

CloseModal.defaultProps = {
    btnText: 'Cancel'
}

CloseModal.propTypes = {
    btnText: PropTypes.string
}

export default CloseModal
