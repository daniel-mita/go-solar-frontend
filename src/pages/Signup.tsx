import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import { Button, Col } from 'antd'
import Input from 'antd/lib/input/Input'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'
import '../styles/homepage.scss'

export type RegInfo<T> = {
    email: T
    username: T
    password: T
}

const SignupPage = () => {
    const navigate = useNavigate()
    const { signUp } = useAuth()

    const [regInfo, setRegInfo] = useState<RegInfo<string>>({
        email: '',
        username: '',
        password: '',
    })

    const onChangeEmail = (val: string) => {
        setRegInfo({ ...regInfo!, email: val })
    }

    const onChangeUsername = (val: string) => {
        setRegInfo({ ...regInfo!, username: val })
    }

    const onChangePassword = (val: string) => {
        setRegInfo({ ...regInfo!, password: val })
    }

    const onSignup = () => {
        signUp(regInfo)
        navigate('/login')
    }

    const alreadyRegistered = async () => {
        navigate('/login')
    }

    return (
        <div>
            <div className="wrapper">
                <Col className="column">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <img src="/logo.png" width="200px" height="150px" />
                    </div>
                    <div>
                        <Input
                            size="large"
                            placeholder="email"
                            prefix={<UserOutlined />}
                            onChange={(e) => onChangeEmail(e.target.value)}
                        />
                        <Input
                            size="large"
                            placeholder="username"
                            prefix={<EditOutlined />}
                            onChange={(e) => onChangeUsername(e.target.value)}
                        />
                        <Input
                            size="large"
                            placeholder="password"
                            type="password"
                            prefix={<EditOutlined />}
                            onChange={(e) => onChangePassword(e.target.value)}
                        />
                        <Button
                            type="text"
                            htmlType="submit"
                            className="button"
                            onClick={() => alreadyRegistered()}
                        >
                            {' '}
                            Already have an account? Go to the login page!
                        </Button>
                        <div key={'a'}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button button"
                                onClick={() => onSignup()}
                            >
                                {' '}
                                Sign up
                            </Button>
                        </div>
                    </div>
                </Col>
            </div>
            <div className="video-container">
                <video style={{ position: 'relative' }} loop autoPlay muted>
                    <source src="video.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    )
}

export default SignupPage
