import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import { Button, Col } from 'antd'
import Input from 'antd/lib/input/Input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'
import '../styles/homepage.scss'

export type LoginInfo<T> = {
    email: T
    password: T
}

const Home = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [loginInfo, setLoginInfo] = useState<LoginInfo<string>>({
        email: '',
        password: '',
    })

    const onChangeEmail = (val: string) => {
        setLoginInfo({ ...loginInfo!, email: val })
    }

    const onChangePassword = (val: string) => {
        setLoginInfo({ ...loginInfo!, password: val })
    }

    const onLogin = () => {
        login(loginInfo)
        navigate('/home')
    }

    const noAccount = async () => {
        navigate('/signup')
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
                        <img src="/logo.png" width="200px" height="200px" />
                    </div>
                    <div>
                        <Input
                            size="large"
                            className="input"
                            placeholder="email"
                            prefix={<UserOutlined />}
                            onChange={(e) => onChangeEmail(e.target.value)}
                        />
                        <Input
                            size="large"
                            className="input"
                            placeholder="password"
                            type="password"
                            prefix={<EditOutlined />}
                            onChange={(e) => onChangePassword(e.target.value)}
                        />
                        <Button
                            type="text"
                            htmlType="submit"
                            className="button"
                            onClick={() => noAccount()}
                        >
                            {' '}
                            No account? Click here to sign up!
                        </Button>
                        <div key={'a'}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button button"
                                onClick={() => onLogin()}
                            >
                                {' '}
                                Sign in
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

export default Home
