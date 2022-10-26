import { useEffect, useRef, useState } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_KEY } from '../utils/config'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { message } from 'antd'

function Map({ location, reset, setDrawing, setDisableSave }: { location: string | undefined, reset: boolean, setDrawing: React.Dispatch<React.SetStateAction<any>>, setDisableSave: React.Dispatch<React.SetStateAction<boolean>> }) {
	const googlemap = useRef(null)
	const [userPosition, setUserPosition] = useState<{ lat: number; lng: number }>()

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: GOOGLE_MAPS_KEY,
		version: 'weekly',
		libraries: ['drawing', 'places']
	})

	const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
		apiKey: GOOGLE_MAPS_KEY
	})

  useEffect(() => {
    if(!isLoaded) return
    getCurrentPosition()
      .then(res => setUserPosition(res)).catch((error) => {
        message.error("Please allow access to location from your browser")
      })
  },[isLoaded])

	const getCurrentPosition = (): Promise<{ lat: number; lng: number }> =>
		new Promise((resolve, reject) =>
			navigator.geolocation.getCurrentPosition(
				position =>
					resolve({
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}),
				error => {
					if (error) return reject(error)
				}
			)
		)

	useEffect(() => {
		if (!isLoaded) return

		const compute = async () => {
			let map
			const google = window.google
			map = new google.maps.Map(googlemap.current as any, {
				center: { lat: -34.397, lng: 150.644 },
				zoom: 8,
				fullscreenControl: false, // remove the top-right button
        streetViewControl: false, // remove the pegman
			})

			if (location && placesService) {
				const getPlacesDetails = (placeId: string): Promise<{ lat: number; lng: number }> => {
					return new Promise((resolve, reject) => {
						placesService.getDetails({ placeId }, (result: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
							if (status !== 'OK' || !result) {
								return reject('Eroare la google maps place details')
							}

							resolve({
								lat: Number(result.geometry?.location?.lat()),
								lng: Number(result.geometry?.location?.lng())
							})
						})
					})
				}
				const result = await getPlacesDetails(location)

				map = new google.maps.Map(googlemap.current as any, {
					center: { ...result },
					zoom: 20,
          fullscreenControl: false, // remove the top-right button
          streetViewControl: false, // remove the pegman
				})

				new google.maps.Marker({
					position: { ...result },
					map
				})
			} else if(userPosition) {
				map = new google.maps.Map(googlemap.current as any, {
					center: { ...userPosition },
					zoom: 20,
					fullscreenControl: false, // remove the top-right button
					streetViewControl: false, // remove the pegman
				})

				new google.maps.Marker({
					position: { ...userPosition },
					map
				})
			}

			const drawingManager = new google.maps.drawing.DrawingManager({
				drawingMode: google.maps.drawing.OverlayType.POLYGON,
				drawingControl: true,
				drawingControlOptions: {
					position: google.maps.ControlPosition.TOP_CENTER,
					drawingModes: [google.maps.drawing.OverlayType.POLYGON]
				},
        polygonOptions:{
          clickable: false,
          editable: true,
          zIndex: 1,
        },
        rectangleOptions:{
          clickable: false,
          editable: true,
          zIndex: 1,
        }
			})

      google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event: any) {
        setDrawing(event)
        setDisableSave(false)
        drawingManager.setOptions({
          drawingMode: null,
          drawingControl: false
        })

      });

			drawingManager.setMap(map)
		}

		compute()
	}, [isLoaded, location, placesService, userPosition, reset])
	return <div id="map" style={{height: '100%'}} ref={googlemap} />
}
export default Map
