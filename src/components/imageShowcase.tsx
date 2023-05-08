import { Button, Card, Image } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import { deleteImage, fetchImages } from '../api/image'
import { AuthContext } from '../contexts/useAuth'
import { LoadingContext } from '../contexts/useLoadingImages'
import { ImageModel } from '../models/Image'
import { spawnToast } from '../utils/errors/Toast'

dayjs.locale('en')

const ImageShowcase = () => {
    const [images, setImages] = useState<ImageModel[] | []>([])
    const { refetchImages } = useContext(LoadingContext)
    const { logout } = useContext(AuthContext)

    const handleDelete = async (id: number) => {
      try{
        await deleteImage(id)
        const response = await fetchImages()
        setImages(response.images)
      }catch(e: any){
        if(e.request.status === 401){
          spawnToast("Unauthorized", "You are not logged in. Please login", false)
          logout()
        }
      }
    }

    useEffect(() => {
        const getImageList = async () => {
          try{
            const response = await fetchImages()
            setImages(response.images)
            console.log(response.images)
          }catch(e: any){
            if(e.request.status === 401){
              spawnToast("Unauthorized", "You are not logged in. Please login", false)
              logout()
            }
          }
        }
        getImageList()
    }, [refetchImages])

    return (
        <Content
            style={{
                padding: 16,
                marginLeft: 24,
                textAlign: 'right',
                backgroundColor: 'white',
                display: 'flex',
                borderRadius: 12,
                boxShadow: '0px 3px 26px -7px rgba(0, 70, 143, 0.5)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    height: '90vh',
                    overflow: 'auto'
                }}
            >
                {images.map((img) => {
                    return (
                        <Card
                            cover={
                                <Image
                                height={180}
                                    src={
                                        'data:image/jpeg;base64,' +
                                        img.imageData
                                    }
                                />
                            }
                            style={{margin: 20, height: 305}}
                            actions={[
                                <Button
                                    type="text"
                                    danger
                                    onClick={() => handleDelete(img.id)}
                                >
                                    Delete
                                </Button>,
                            ]}
                        >
                            <Card.Meta
                                title={
                                    'Created at: ' +
                                    dayjs(img.createdAt).format(
                                        'MMMM D, YYYY h:mm A'
                                    )
                                }
                            />
                        </Card>
                    )
                })}
            </div>
        </Content>
    )
}

export default ImageShowcase
