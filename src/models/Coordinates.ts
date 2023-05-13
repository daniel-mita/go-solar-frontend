type SinglePoint = {
    lat: number
    lon: number
}

export type Configurations = {
    annualConsumption: string
    reservedSpace: string
    rooftopType: string
    angle: number
    kWPrice: number
}

export type Coordinates = Array<SinglePoint>
