import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

export default function ChangePicture (props) {
    const {hasFile, setFile, isDocument} = props
    const [preview, setPreview] = useState({
        image: '',
        visible: false,
        title: ''
    })

    const uploadProps = {
        beforeUpload: (file) => {
            setFile(file)
            return true
        },
        listType: isDocument ? 'text' : 'picture-card',
        maxCount: 1,
        onRemove: () => {
            setFile(null)
        },
        method: 'get'
    }

    function getBase64 (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }
    const onPreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreview({
            image: file.url || file.preview,
            visible: true,
            title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })
    }

    return (
        <div>
            {
                isDocument ?
                    <Upload {...uploadProps} onPreview={onPreview}>
                        <Button type={'primary'} icon={<UploadOutlined />}>
                            {!hasFile  ? 'Change' : 'Select File'}
                        </Button>
                    </Upload> :
                    <>
                        <ImgCrop rotate>
                            <Upload {...uploadProps} onPreview={onPreview}>
                                {!hasFile  ? 'Change' : 'Select'}
                            </Upload>
                        </ImgCrop>
                        <Modal
                            width={400}
                            open={preview.visible}
                            title={preview.title}
                            footer={null}
                            onCancel={() => { setPreview({ visible: false }) }}>
                            <img alt="Profile Picture" style={{ width: '100%' }} src={preview.image} />
                        </Modal>
                    </>
            }
        </div>
    )
}
ChangePicture.propTypes = {
    hasFile: false,
    isDocument: false,
}
ChangePicture.propTypes = {
    setFile: PropTypes.func,
    hasFile: PropTypes.bool,
    isDocument: PropTypes.bool,
}
