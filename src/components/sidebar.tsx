import {
    Input,
    Avatar,
    Radio,
    Button,
    Space,
    Upload,
    message,
    UploadFile,
    Modal,
} from 'antd'
import { useState, useMemo, useEffect, useContext } from 'react'
import type { UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useJsApiLoader } from '@react-google-maps/api'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { GOOGLE_MAPS_KEY } from '../utils/config'
import { useAuth } from '../contexts/useAuth'
import { useNavigate } from 'react-router-dom'
import { saveImage, uploadImage } from '../api/image'
import { toBase64 } from '../utils/helpers'
import { LoadingContext } from '../contexts/useLoadingImages'
import { spawnToast } from '../utils/errors/Toast'

const Sidebar = ({
    onLocationChange,
    type,
    setType,
}: {
    onLocationChange: any
    type: string
    setType: any
}) => {
    const [value, setValue] = useState<any>()
    const { logout } = useAuth()
    const navigate = useNavigate()
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_KEY,
        version: 'weekly',
        libraries: ['drawing', 'places'],
    })

    const [uploadedFile, setUploadedFile] = useState<File | undefined>(
        undefined
    )
    const [uploading, setUploading] = useState(false)
    const [open, setOpen] = useState(false)
    const [finishedImage, setFinishedImage] = useState<string | undefined>()
    const { refetchImages, setRefetchImages } = useContext(LoadingContext)

    const handleUpload = async () => {
        try {
            setUploading(true)
            const base64File = await toBase64(uploadedFile)
            const result = await uploadImage(base64File)
            if (result) {
                setFinishedImage(result.image)
                setOpen(true)
            }
        } catch (e: any) {
            if(e.request.status === 401){
              spawnToast("Unauthorized", "You are not logged in. Please login", false)
              logout()
            }
        } finally {
            setUploadedFile(undefined)
            setUploading(false)
        }
    }

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        accept: 'image/*',
        listType: 'picture',
        onRemove: (file) => {
            setUploadedFile(undefined)
        },
        beforeUpload: (rcFile) => {
            if (uploadedFile) {
                return false
            }
            const parsedfile = new File([rcFile], rcFile.name, {
                type: rcFile.type,
            })
            setUploadedFile(parsedfile)
            return false
        },
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleSave = async () => {
        try {
            const result = await saveImage(finishedImage)
            setRefetchImages(!refetchImages)
            setOpen(false)
        } catch (e: any) {
          if(e.request.status === 401){
            spawnToast("Unauthorized", "You are not logged in. Please login", false)
            logout()
          }
        }
    }

    const onLogout = () => {
        logout()
        navigate('/login')
    }

    useEffect(() => {
        if (!value || !value.value || !value.value.place_id) return
        onLocationChange(value.value.place_id)
    }, [value])

    const renderModal = () => {
        return (
            <Modal
                open={open}
                style={{display: 'flex', justifyContent: 'center', padding: 30}}
                onOk={() => setOpen(false)}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleSave}
                    >
                        Save
                    </Button>,
                ]}
            >
                <img src={'data:image/jpeg;base64,' + finishedImage} />
            </Modal>
        )
    }

    const renderUploadImage = () => {
        return (
            <>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={uploadedFile === undefined}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </>
        )
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
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div>
                <Avatar
                    size={164}
                    src={`https://api.dicebear.com/6.x/personas/svg?seed=${localStorage.getItem('avatar_seed')}`}
                />
            </div>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                }}
            >
                <div style={{ paddingTop: 24 }}>
                    <p
                        style={{
                            fontSize: 16,
                            padding: 0,
                            margin: 0,
                            fontWeight: 200,
                        }}
                    >
                        Welcome,{' '}
                    </p>
                    <p
                        style={{
                            fontSize: 24,
                            padding: '0px 0px 24px 0px',
                            margin: 0,
                            fontWeight: 500,
                            color: '#1890ff',
                            letterSpacing: 2,
                        }}
                    >
                        {localStorage.getItem("username")}
                    </p>
                </div>
                <div style={{ width: '100%' }}>
                    <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                        <span>Address</span>
                    </div>
                    {isLoaded && (
                        <GooglePlacesAutocomplete
                            selectProps={{
                                value,
                                onChange: setValue,
                            }}
                        />
                    )}
                </div>
                <div style={{ width: '100%', paddingTop: 28 }}>
                    <div>
                        <p style={{ fontWeight: 200 }}>Selection Type</p>
                    </div>
                    <Radio.Group
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    >
                        <Space direction="vertical">
                            <Radio value={'maps'}>
                                <img
                                    id="img-transform"
                                    src="/google-logo.png"
                                    style={{ objectFit: 'fill' }}
                                    height={35}
                                />{' '}
                                search
                            </Radio>
                            <Radio value={'pdfs'}>Upload Sattelite Image</Radio>
                        </Space>
                    </Radio.Group>
                </div>
                {type === 'pdfs' && (
                    <div style={{ paddingTop: 24, width: '100%' }}>
                        {renderUploadImage()}
                    </div>
                )}
                {renderModal()}
            </div>
            <div style={{ width: '100%' }}>
                <Button
                    onClick={() => onLogout()}
                    style={{ width: '100%' }}
                    type="primary"
                >
                    Leave
                </Button>
            </div>
        </div>
    )
}

export default Sidebar
