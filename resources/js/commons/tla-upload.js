import React from 'react'
import PropTypes from 'prop-types'
import {Button, Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons'

export default function TlaUpload ({file, onUpload, handleUpload, loading}) {

    const uploadProps = {
        beforeUpload: (file) => {
            onUpload(file)
            return true
        },
        listType: 'text',
        maxCount: 1,
        onRemove: () => {
            onUpload(null)
        },
        accept: ['application/pdf'],
        method: 'get'
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>
                        {file == null ? 'Select' : 'Change'}
                    </Button>
                </Upload>
                <Button loading={loading} onClick={handleUpload} type={'primary'} disabled={file === null}>
                    Upload
                </Button>
            </div>
            <small style={{ color: 'red'}}>
                Only PDF is required
            </small>
            {/*item.fileName.split('.').pop()*/}
        </div>
    )
}
TlaUpload.defaultProps = {
    file: null,
    loading: false
}
TlaUpload.propTypes = {
    onUpload: PropTypes.func.isRequired,
    handleUpload: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    file: PropTypes.any,
}
