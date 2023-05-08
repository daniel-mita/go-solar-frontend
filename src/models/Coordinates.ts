type SinglePoint = {
    lat: number
    lon: number
}

export type Configurations = {
    annualConsumption: string
    reservedSpace: string
    rooftopType: string
    angle: number
}

export type Coordinates = Array<SinglePoint>
