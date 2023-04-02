import Exclamation from '../assets/img/exclamation.svg'
import { Button, Modal } from 'antd'
import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { createGlobalStyle } from 'styled-components'
import PropTypes from 'prop-types'

const GlobalStyles = createGlobalStyle`
  .tla-delete-confirm .ant-modal-content{
    border-radius: 10px !important;
    width: 400px;
  }

  .tla-delete-confirm .ant-modal-content{
    text-align: center !important;
    font-family: var(--Popins) !important;
    font-weight: 500 !important;
    font-size: 18px !important;
  }
  .tla-delete-confirm .ant-modal-confirm-btns {
    margin-top: 24px;
    text-align: right;
    display: flex;
    justify-content: space-between;
  }
  .confirm-delete-btn, .confirm-delete-btn:hover {
    background-color: #D92D20 !important;
    border: solid 1px #D92D20 !important;
  }
`



const TlaConfirm = (props) => {
    const { title, callBack, btnText, showIcon } = props
    const confirm = () => {
        Modal.confirm({
            title: '',
            icon: <img className={'mx-auto'} src={Exclamation} alt={'Confirm'}/>,
            content: `Do you want to delete ${title}?`,
            okText: 'Delete',
            cancelText: 'Cancel',
            className: 'tla-delete-confirm',
            okButtonProps: {
                className: 'btn confirm-delete-btn',
                danger: true,
                size: 'large',
                block: true
            },
            cancelButtonProps: {
                className: 'btn',
                size: 'large',
                block: true
            },
            onOk: callBack
        });
    };
    return (
        <>
            <GlobalStyles/>
            <Button title={'Delete'} onClick={confirm} icon={showIcon && <FiTrash2 className={'icon'}/>}>
                {btnText}
            </Button>
        </>
    )
};

TlaConfirm.defaultProps = {
    title: '',
    btnText: '',
    showIcon: true,
}

TlaConfirm.propTypes = {
    title: PropTypes.string,
    btnText: PropTypes.any,
    callBack: PropTypes.func,
    showIcon: PropTypes.bool,
}

export default TlaConfirm;
