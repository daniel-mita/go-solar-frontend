import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import { Button, Col } from 'antd'
import Input from 'antd/lib/input/Input'
import { url } from 'inspector'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useToken from '../hooks/useToken'
import '../styles/homepage.scss'

const Home = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const { login } = useAuth()
    const { setToken } = useToken()
    // const { data: session } = useSession();

    // useEffect(() => {
    //   if (session) {
    //     router.push("/content/computations");
    //   }
    // }, [session]);

    const signIn = async () => {
        const token = await login({
            email,
            password,
        })
        if (token) {
            setToken(token)
            navigate('/map')
        } else {
            alert('incorect information')
        }
    }

    const noAccount = async () => {}

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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            size="large"
                            placeholder="password"
                            prefix={<EditOutlined />}
                            onChange={(e) => setPassword(e.target.value)}
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
                                onClick={() => signIn()}
                            >
                                {' '}
                                Sign in with provider name
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
