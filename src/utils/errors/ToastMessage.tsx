import React from 'react'
import { Content } from 'antd/lib/layout/layout'
import { Typography } from 'antd'

interface iToastMessage {
    title: string
    message: string
}

const ToastMessage = ({ title, message }: iToastMessage) => {
    return (
        <Content>
            <Typography style={{ fontWeight: 'bold' }}>{title}</Typography>
            <Typography>{message}</Typography>
        </Content>
    )
}

export default ToastMessage
