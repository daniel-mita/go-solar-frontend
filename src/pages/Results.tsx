import { Layout, Typography } from 'antd'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { message, Statistic, Input, Slider, Collapse, Tabs, Col, InputNumber, Select } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

import Visualisation from '../components/selectionVisualisation'
import { getResults } from '../api/calculations'
import { CoordinatesContext } from '../contexts/useCoordinates'
import { error } from 'console'
import { spawnToast } from '../utils/errors/Toast'
import { AuthContext } from '../contexts/useAuth'
import Loader from '../components/loader'

const { Panel } = Collapse;
const { Option } = Select;
const { Sider } = Layout

ChartJS.register(ArcElement, Tooltip, Legend);

const objectMap = (obj: any, fn: any) =>
    Object.fromEntries(
        Object.entries(obj).map(
            ([k, v], i) => [k, fn(v, k, i)]
        )
    )

const energyTest: EnergyGeneration = {
    kwh: 1000,
    percentages: {
        cycleGasTurbine: 0,
        oil: 0,
        coal: 0,
        nuclear: 0,
        pumpedStorage: 0,
        nonPumpedStorageHydro: 0,
        windOnShore: 50,
        others: 40,
        solar: 10
    }
}

export interface EnergySourcesPercentage {
    cycleGasTurbine: number,
    oil: number,
    coal: number,
    nuclear: number,
    pumpedStorage: number,
    nonPumpedStorageHydro: number,
    windOnShore: number,
    others: number,
    solar: number
}

export interface EnergyGeneration {
    kwh: number,
    percentages: EnergySourcesPercentage
}
const { TabPane } = Tabs

const { Title, Paragraph } = Typography

// const apiKey = "kqITGdSDOYHp9N7FsekneBJ6kmTtKXrGzh1ArZ5H";
//   const [urlData, setUrlData] = useState({
//     lat: "40",
//     lon: "-105",
//     start: "1634342400",
//     end: "1634428800",
//     system_capacity: "4",
//     azymuth: "180",
//     tilt: "40",
//     array_type: "1",
//     module_type: "1",
//     losses: "10",
//   });

//   const getSolarData = async () => {
//     const requestUrl = `https://developer.nrel.gov/api/pvwatts/v6.json?api_key=${apiKey}&lat=${urlData.lat}&lon=${urlData.lon}&system_capacity=${urlData.system_capacity}&azimuth=${urlData.azymuth}&tilt=${urlData.tilt}&array_type=${urlData.array_type}&module_type=${urlData.module_type}&losses=${urlData.losses}`;
//     try {
//       const result = await axios.get(requestUrl);
//       console.log(result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getSolarData();
//   }, []);

const ResultsPage = () => {

    const { loading, setLoading, isFirstTime, setIsFirstTime } = useContext(CoordinatesContext)

    const [anualCons, setAnualCons] = useState('0')
    const [reservedSpace, setReservedSpace] = useState('0')
    const [averageSunDay, setAverageSunDay] = useState(3)
    const [kwhPrice, setKwhPrice] = useState(157)

    useEffect(() => {

      if(anualCons !== '0' && kwhPrice > 0) {
      }
    }, [anualCons,reservedSpace, averageSunDay, kwhPrice ])

    const [rooftopType, setRooftopType] = useState('plain')
    const [angle, setAngle] = useState(0)

    const [activeTab, setActiveTab] = useState('max')
    const [activeTabConf, setActiveTabConf] = useState('general')
    const [co2Options, setCo2Options] = useState({
        'Coal': '17',
        'Oil': '0',
        'Cycle Gas Turbine': '14',
        'Nuclear': '8',
        'PS': '0',
        'NPS Hydro': '36',
        'Wind Onshore': '16',
        'Others': '1',
        'Solar': '8'
    })
    const [text, setText] = useState("You can configure general information");
    const [area, setArea] = useState(0)

    // first tab
    const [panelNumber, setPanelNumber] = useState(0)
    const [costs, setCosts] = useState(0)
    const [generated, setGenerated] = useState(0)
    const [recover, setRecover] = useState(1)
    const [produced, setProduced] = useState(1)
    const [installedPower, setInstalledPower] = useState(0)
    const [yearlyGen, setYearlyGen] = useState(0)
    const [deltaEuro, setDeltaEuro] = useState(0)
    const [deltaKW, setDeltaKW] = useState(0)

    // second tab
    const [invertor, setInvertor] = useState(0)
    const [instalation, setInstalation] = useState(0)
    const data = {
        labels: ['Coal', 'Oil', 'Cycle Gas Turbine', 'Nuclear', 'PS', 'NPS Hydro', 'Wind Onshore', 'Wind Offshore', 'Solar'],
        datasets: [
            {
                label: '# of Votes',
                data: [22, 1, 16, 21, 0, 26, 12, 0, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const { coordinates } = useContext(CoordinatesContext)
    const { logout } = useContext(AuthContext)


    useEffect(() => {
        // handleGetPanels()
        const areaStorage = localStorage.getItem('area')
        setArea(Number(areaStorage))
    }, [])

    useEffect(() => {
        if (area > 0) {
            // computePanelsData()
        }
    }, [area, anualCons, reservedSpace, activeTab, averageSunDay, kwhPrice])


    const computeCarbonFootprint = (energyGeneration: EnergyGeneration, carsOrTrees?: 'cars' | 'trees') => {
        let sum = 0;
        let carbonFootprint = 0;
        objectMap(energyGeneration.percentages, (percent: any) => sum += percent)
        if (sum !== 100) {
            const diff = 100 - sum
            if (isNaN(diff) || diff === 100) return
            const keys = Object.keys(co2Options)
            const co2OptionsCopy = { ...co2Options }
            const randomKey: any = (keys as any)[Math.floor(Math.random() * 2)] as any
            (co2OptionsCopy as any)[randomKey] = String(Number((co2OptionsCopy as any)[randomKey]) + diff)
            setCo2Options(co2OptionsCopy)
        } else {
            Object.keys(energyGeneration.percentages).map(function (key, index) {
                if (key === "cycleGasTurbine") {
                    carbonFootprint += 0.5 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "oil") {
                    carbonFootprint += 0.65 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "coal") {
                    carbonFootprint += 0.9 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "nuclear") {
                    carbonFootprint += 0.005 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "pumpedStorage") {
                    carbonFootprint += 0.02 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "nonPumpedStorageHydro") {
                    carbonFootprint += 0.005 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "windOnShore") {
                    carbonFootprint += 0.004 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "others") {
                    carbonFootprint += 0.1 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "solar") {
                    carbonFootprint += 0.058 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
            });

            if (carsOrTrees === 'cars') {
                return Number((carbonFootprint / 1000) / 4.6).toFixed(1)
            } else if (carsOrTrees === 'trees') {
                return Number((carbonFootprint / 1000) / 0.2).toFixed(0)
            } else {
                return Number(carbonFootprint / 1000).toFixed(2)
            }
        }
    }

    const handleOnTabChange = (key: string) => setActiveTab(key)

    const handleOnTabConfChange = (key: string) => {
        setActiveTabConf(key)
        if (key === 'general') {
            setText("You can configure general information");
        }
        else if (key === 'co2') {
            setText("You can configure information about CO2 emissions");
        }
    }

    const onSliderCo2Change = (value: any, key: string) => {
        const co2OptionsCopy: any = { ...co2Options } as any
        (co2OptionsCopy as any)[key] = String(value)
        const sum: any = Object.values(co2OptionsCopy).reduce((cur: any, acc: any) => Number(cur) + Number(acc), 0)
        if (sum > 100) {
            return
        }
        setCo2Options(co2OptionsCopy)
    }

    const mapCo2Configuration = () => {
        const energyTest: EnergyGeneration = {
            kwh: Number(produced),
            percentages: {
                cycleGasTurbine: Number(co2Options['Cycle Gas Turbine']),
                oil: Number(co2Options['Oil']),
                coal: Number(co2Options['Coal']),
                nuclear: Number(co2Options['Nuclear']),
                pumpedStorage: Number(co2Options['PS']),
                nonPumpedStorageHydro: Number(co2Options['NPS Hydro']),
                windOnShore: Number(co2Options['Wind Onshore']),
                others: Number(co2Options['Others']),
                solar: Number(co2Options['Solar']),
            }
        }

        return energyTest

    }

    const handleCalculations = async  () => {
        const configurations = {
          annualConsumption: anualCons,
          reservedSpace: reservedSpace,
          rooftopType: rooftopType,
          angle: angle
        }
        try {
          setLoading(true)
        const results = await getResults(coordinates, configurations)
        setIsFirstTime(false)
        console.log(results)
        setPanelNumber(results.maximum.panelsNumber)
        setCosts(results.maximum.panelsCost)
        setGenerated(results.maximum.generatedMoney)
        setRecover(results.maximum.recoverPeriod)
        setProduced(results.maximum.consumedElectricity)
        setInstalledPower(results.maximum.installedPower)
        // setYearlyGen(results.maximum.)
        // setDeltaEuro(results.maximum.consumedMoney)
        // setDeltaKW()
        setInvertor(results.aditionalCosts.invertor)
        setInstalation(results.aditionalCosts.installation)
        setLoading(false)
        }catch(e: any){
          if(e.request.status === 401){
            spawnToast("Unauthorized", "You are not logged in. Please login", false)
            logout()
          } else {
           setLoading(false)
           spawnToast(" Something went wrong"," Please try again", false)
          }
        }
    }

    return (
        <Layout
            style={{
                minHeight: '100vh',
                padding: 24,
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <div style={{ flex: 1 }}>
            <div
            style={{
                width: '100%',
                height: '100%',
                paddingRight: '1.5rem',
                flex: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div style={{
                borderRadius: 12,
                backgroundColor: 'white',
                boxShadow: '0px 3px 26px -7px rgba(0, 70, 143, 0.5)',
                height: activeTabConf === 'general' ? 400 : 500,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                        <SettingOutlined style={{ paddingRight: 6, fontSize: 18 }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                        <h3 style={{ marginBottom: 4, paddingBottom: 0 }}>Configuration</h3>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
                            <h3 style={{ marginBottom: 4, paddingBottom: 0, fontWeight: 200 }}>Surface: <strong>{/* area.toFixed(2) */} m2</strong></h3>
                        </div>
                    </div>
                </div>
                <p style={{ padding: 0, margin: 0, fontWeight: 200 }}>{text}</p>
                <Tabs defaultActiveKey={activeTab} onChange={handleOnTabConfChange}>
                    <TabPane tab="General" key="general">
                    </TabPane>
                    <TabPane tab="CO2" key="co2">
                    </TabPane>
                    <TabPane tab="Metrics" key="metrics">
                    </TabPane>
                </Tabs>
                {activeTabConf === 'general' ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ flex: 1, paddingRight: 24 }}>
                            <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                                <span>Anual Consumption (KWh)</span>
                            </div>
                            <Input type="number" value={anualCons} onChange={e => setAnualCons(e.target.value)} style={{ minWidth: 270 }} placeholder="Type your anual consumption ..." />
                        </div>
                        <div style={{ flex: 1, paddingRight: 24 }}>
                            <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                                <span>Reserved Space (%)</span>
                            </div>
                            <Input type="number" value={reservedSpace} onChange={e => setReservedSpace(e.target.value)} style={{ minWidth: 270 }} placeholder="Type your reserved space ..." />
                        </div>
                        <div style={{ flex: 1, paddingRight: 24 }}>
                            <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                                <span>Rooftop Type</span>
                            </div>
                            <Select value={rooftopType} style={{ minWidth: 270 }} onChange={(value) => { setRooftopType(value) }}>
                                <Option value="plain">Plain</Option>
                                <Option value="single">Single Slope</Option>
                                <Option value="complex">
                                    Multiple Slopes
                                </Option>
                            </Select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                                <span>Panel Angle</span>
                            </div>
                            <Slider onChange={(value) => setAngle(value)} defaultValue={angle} />
                        </div>
                    </div>
                    <div style={{ paddingTop: 12 }}>
                        <Collapse onChange={() => { }}>
                            <Panel header="Parameters Configuration" key="1">
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginRight: 12 }}>
                                        <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                                            <span>Average Sun / Day</span>
                                        </div>
                                        <Input type="number" value={averageSunDay} onChange={e => setAverageSunDay(Number(e.target.value))} style={{ minWidth: 270 }} placeholder="Type average sun day ..." />
                                    </div>
                                    <div style={{ flex: 1, flexDirection: 'column', display: 'flex' }}>
                                        <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                                            <span>KW Price -in lei</span>
                                        </div>
                                        <Input type="number" min={1} value={kwhPrice} onChange={e => setKwhPrice(Number(e.target.value))} style={{ minWidth: 270 }} placeholder="Type kW Price ..." />
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                </div> : activeTabConf === 'co2' ?
                    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', justifyContent: 'center' }}>
                        {Object.keys(co2Options).map((key: string) => {
                            return (
                                <div key={key} style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                    <div style={{ flex: 1 }}>
                                        <Slider
                                            vertical
                                            min={0}
                                            max={100}
                                            value={Number((co2Options as any)[key])}
                                            onChange={(value) => onSliderCo2Change(value, key)}
                                        />
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            value={(co2Options as any)[key]}
                                            onChange={(value) => onSliderCo2Change(value, key)}
                                        />
                                        <div style={{ paddingTop: 6 }}>
                                            <span style={{ fontSize: 12 }}>{key}</span>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div> :
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ maxHeight: 320, maxWidth: 320 }}>

                            <Pie height={320} width={320} data={data} />
                        </div>
                    </div>
                }
            </div>
            {isFirstTime ? <div style={{ 
                borderRadius: 12,
                backgroundColor: 'white',
                boxShadow: '0px 3px 26px -7px rgba(0, 70, 143, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 24,
                textAlign: 'center',
                padding: 50,
                paddingTop: 100,
                height: 300
              }}>
                 <Title level={3}>Welcome to the calculations screen!</Title>
                 <Paragraph>
                    Before we get started, please set the required parameters in order to proceed
                  </Paragraph>
              </div> : loading ? <Loader /> : <div style={{
                borderRadius: 12,
                backgroundColor: 'white',
                boxShadow: '0px 3px 26px -7px rgba(0, 70, 143, 0.5)',
                height: `calc(100% - ${activeTabConf === 'general' ? 300 : 500}px)`,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 24
            }}>
                <Tabs defaultActiveKey={activeTab} onChange={handleOnTabChange}>
                    <TabPane tab="Maximum Panels" key="max">
                    </TabPane>
                    <TabPane tab="Aditional Costs" key="extra">
                    </TabPane>
                </Tabs>
                {activeTab !== 'extra' ? <div><div style={{ display: 'flex', flexDirection: 'row', paddingTop: 6 }}>
                    <div style={{ flex: 1 }}>
                        <Statistic title="Panels Number" value={panelNumber} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Statistic title="Installed Power" value={`${Math.floor(installedPower).toFixed(2)} kW`} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Statistic title="Panels Cost" value={`€ ${costs.toFixed(2)}`} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Statistic title="Recover Money In" value={`${recover} Years`} />
                    </div>
                </div>
                    <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 6 }}>
                        <div style={{ flex: 1 }}>
                            <Statistic title="Generated Amount / Year" value={`€ ${generated.toFixed(2)}`} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Statistic title="Generated / Year" value={`${yearlyGen.toFixed(2)} kWh`} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Statistic title="Produced - Consumed" value={`€ ${deltaEuro.toFixed(2)}`} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Statistic title="Produced - Consumed" value={`${deltaKW.toFixed(2)} kWh`} />
                        </div>
                    </div>
                </div> :
                    <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 8 }}>
                        <div style={{ flex: 1 }}>
                            <Statistic title="Invertor" value={`€ ${invertor.toFixed(2)}`} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Statistic title="Installation" value={`€ ${instalation.toFixed(2)}`} />
                        </div>
                    </div>
                }
                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 48 }}>
                    <h3 style={{ marginBottom: 0, paddingBottom: 0 }}>Potential Impact</h3>
                    <p style={{ padding: 0, margin: 0, fontWeight: 200 }}>If all the viable solar installations were implemented, the amount of avoided
                        CO2 emissions from the electricity sector in the country would be:</p>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', flex: 1 }}>
                            <img src="/co2icon.jpeg" style={{ objectFit: 'fill' }} height={65} />
                            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 24 }}>
                                <span style={{ fontWeight: 200 }}>Carbon Dioxide</span>
                                <span style={{ fontSize: 26 }}>{computeCarbonFootprint(mapCo2Configuration())}M</span>
                                <span style={{ fontWeight: 200 }}>metric tone</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <span style={{ fontSize: 42 }}>=</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', flex: 1 }}>
                            <img src="/caricon.png" style={{ objectFit: 'fill' }} height={65} />
                            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 24 }}>
                                <span style={{ fontWeight: 200 }}>Passenger cars</span>
                                <span style={{ fontSize: 26 }}>{computeCarbonFootprint(mapCo2Configuration(), 'cars')}</span>
                                <span style={{ fontWeight: 200 }}>taken off the road</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <span style={{ fontSize: 42 }}>=</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', flex: 1 }}>
                            <img src="/treeicon.png" style={{ objectFit: 'fill' }} height={65} />
                            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 24 }}>
                                <span style={{ fontWeight: 200 }}>Tree seedlings</span>
                                <span style={{ fontSize: 26 }}>{computeCarbonFootprint(mapCo2Configuration(), 'trees')}</span>
                                <span style={{ fontWeight: 200 }}>grown for 10 yrs</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 48 }}>
                    <h3 style={{ marginBottom: 0, paddingBottom: 0 }}>Ask for Offer</h3>
                    <p style={{ padding: 0, margin: 0, fontWeight: 200 }}>If you consider that our results will help you and also the entire world you can ask for an offer.</p>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 6, alignItems: 'center', flex: 1 }}>
                            <img onClick={() => message.info("Congrats! An offer was sent to your email.")} id="img-transform" src="/company1.png" style={{ objectFit: 'fill', cursor: 'pointer' }} height={120} />

                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <img onClick={() => message.info("Congrats! An offer was sent to your email.")} id="img-transform" src="/company2.jpeg" style={{ objectFit: 'fill', cursor: 'pointer' }} height={120} />

                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                            <img onClick={() => message.info("Congrats! An offer was sent to your email.")} id="img-transform" src="/company3.jpeg" style={{ objectFit: 'fill', cursor: 'pointer' }} height={120} />

                        </div>
                    </div>
                </div>
            </div >}
        </div >
            </div>
            <Sider
                width={400}
                style={{
                    borderRadius: 12,
                    backgroundColor: 'white',
                    boxShadow: '0px 3px 26px -7px rgba(0, 70, 143, 0.5)',
                }}
            >
                <Visualisation handleCalculations={handleCalculations} />
            </Sider>
        </Layout>
    )
}

export default ResultsPage
