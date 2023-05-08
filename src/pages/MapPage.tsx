import React, { useContext, useEffect, useRef, useState } from 'react'
import { Breadcrumb, Button, Layout, Menu } from 'antd'
import { Footer } from 'antd/lib/layout/layout'

import Map from '../components/map'
import Sidebar from '../components/sidebar'
import { useNavigate } from 'react-router-dom'
import ImageShowcase from '../components/imageShowcase'
import { CoordinatesContext } from '../contexts/useCoordinates'
import { Coordinates } from '../models/Coordinates'

const { Header, Content, Sider } = Layout

const MapPage = () => {
    const [location, setLocation] = useState<string>()
    const [drawing, setDrawing] = useState<any>()
    const [reset, setReset] = useState<boolean>(false)
    const [drawnMap, setDrawnMap] = useState<any>(undefined)
    const [disableSave, setDisableSave] = useState<boolean>(true)
    const navigate = useNavigate()
    const { setCoordinates } = useContext(CoordinatesContext)

    const [type, setType] = useState('maps')

    const googlemap = useRef(null)

    const polyArea = (points: Coordinates) => {
        var i = 0,
            area = 0,
            len = points.length
        while (i < len) {
            const p1 = points[i++]
            const p2 = points[i % len]
            area += Math.abs(
                Math.abs(p1.lon * p2.lat) - Math.abs(p1.lat * p2.lon)
            )
        }
        return Math.abs(0.5 * area)
    }

    const computeRectangle = (overlay: any) => {
        const points: Coordinates = []

        const res = overlay.getBounds()
        points.push({ lat: res.Ab.h, lon: res.Ab.j })
        points.push({ lat: res.Ua.h, lon: res.Ua.j })
        points.push({ lat: res.Ab.h, lon: res.Ua.j })
        points.push({ lat: res.Ua.h, lon: res.Ab.j })
        setCoordinates(points)
        // localStorage.removeItem('points')
        // localStorage.setItem('points', JSON.stringify(points))
        // localStorage.setItem('area', String(getAreaOfPolygon(points)))
    }

    const computePolygon = (overlay: any) => {
        const points: Coordinates = []
        overlay.getPath().forEach((path: any) => {
            points.push({
                lat: path.lat(),
                lon: path.lng(),
            })
        })
        console.log(polyArea(points))
        // console.log(String(getAreaOfPolygon(points)))
        setCoordinates(points)

        // localStorage.removeItem('points')
        // localStorage.removeItem('area')
        // localStorage.setItem('points', JSON.stringify(points))
        // localStorage.setItem('area', String(getAreaOfPolygon(points)))
    }

    const handleClick = () => {
        //next page
        if (drawing.type === 'polygon') {
            computePolygon(drawing.overlay)
        } else if (drawing.type === 'rectangle') {
            computeRectangle(drawing.overlay)
        }
        navigate('/results')
    }

    const handleReset = () => {
        setReset(!reset)
    }

    useEffect(() => {
        setDisableSave(true)
    }, [reset])

    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',
                    padding: 24,
                    backgroundColor: 'white',
                }}
            >
                <Sider
                    width={400}
                    style={{
                        borderRadius: 12,
                        backgroundColor: 'white',
                        boxShadow: '0px 3px 26px -7px rgba(0, 70, 143, 0.5)',
                    }}
                >
                    <Sidebar
                        onLocationChange={(location: string) =>
                            setLocation(location)
                        }
                        type={type}
                        setType={setType}
                    />
                </Sider>
                {type === 'maps' ? (
                    <Layout style={{ backgroundColor: 'white' }}>
                        <Content
                            style={{
                                paddingLeft: 24,
                                margin: 0,
                                minHeight: 280,
                                background: '#fff',
                            }}
                        >
                            <Map
                                location={location}
                                reset={reset}
                                setDrawing={setDrawing}
                                setDisableSave={setDisableSave}
                            />
                        </Content>
                        <Footer
                            style={{
                                padding: 16,
                                marginTop: 24,
                                marginLeft: 24,
                                textAlign: 'right',
                                backgroundColor: 'white',
                                display: 'flex',
                                borderRadius: 12,
                                boxShadow:
                                    '0px 3px 26px -7px rgba(0, 70, 143, 0.5)',
                            }}
                        >
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleReset}
                            >
                                Reset drawing
                            </Button>
                            {drawnMap ? (
                                <div id="map" ref={googlemap} />
                            ) : (
                                <div></div>
                            )}
                            <div style={{ flexGrow: 1 }}></div>
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleClick}
                                disabled={disableSave}
                            >
                                {' '}
                                Save{' '}
                            </Button>
                        </Footer>
                    </Layout>
                ) : (
                    <ImageShowcase />
                )}
            </Layout>
        </>
    )
}

export default MapPage
