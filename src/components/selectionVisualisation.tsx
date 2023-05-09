import {
    ArrowLeftOutlined,
    SettingOutlined,
    SmileOutlined,
} from '@ant-design/icons'
import { Button, Result, Typography } from 'antd'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoordinatesContext } from '../contexts/useCoordinates'
import Loader from './loader'

const { Title } = Typography

const SelectionVisualisation = ({
    handleCalculations,
}: {
    handleCalculations: () => void
}) => {
    const { loading, isFirstTime, setIsFirstTime, allParams } =
        useContext(CoordinatesContext)

    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
        setIsFirstTime(true)
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: '1.5rem 4rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {isFirstTime ? (
                <div
                    style={{
                        marginTop: 130,
                        marginBottom: 130,
                        textAlign: 'center',
                    }}
                >
                    <Title>Almost done... </Title>
                </div>
            ) : loading ? (
                <div
                    style={{
                        marginTop: 130,
                        marginBottom: 130,
                        textAlign: 'center',
                    }}
                >
                    <Title>Almost done... </Title>
                </div>
            ) : (
                <div>
                    <Result
                        icon={<SmileOutlined />}
                        title="Great, we have done all the operations!"
                    />
                </div>
            )}
            <Button
                type="primary"
                icon={<SettingOutlined />}
                onClick={handleCalculations}
                disabled={loading || !allParams}
            >
                {loading ? 'Calculating...' : 'Calculate'}
            </Button>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Button
                        type="dashed"
                        style={{
                            marginTop: 20,
                        }}
                        icon={<ArrowLeftOutlined />}
                        onClick={handleBack}
                    >
                        Go back
                    </Button>
                    <Typography style={{ marginTop: 60, color: 'gray' }}>
                        INFO: Euro prices are calculated live
                    </Typography>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Typography style={{color: 'gray', marginRight: 10 }}>
                        Powered by: 
                    </Typography>
                    <img src="/logo.png" width="20px" height="20px" />
                    </div>
                    <div
                        style={{
                            width: '100%',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src={'/housesolars.jpeg'}
                            width={400}
                            height={400}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default SelectionVisualisation
