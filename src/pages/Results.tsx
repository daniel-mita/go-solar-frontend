import { Layout } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

import Visualisation from '../components/selectionVisualisation'
import Statistics from "../components/statistics"

const { Sider } = Layout;

const ResultsPage = () => {
  const apiKey = "kqITGdSDOYHp9N7FsekneBJ6kmTtKXrGzh1ArZ5H";
  const [urlData, setUrlData] = useState({
    lat: "40",
    lon: "-105",
    start: "1634342400",
    end: "1634428800",
    system_capacity: "4",
    azymuth: "180",
    tilt: "40",
    array_type: "1",
    module_type: "1",
    losses: "10",
  });

  const getSolarData = async () => {
    const requestUrl = `https://developer.nrel.gov/api/pvwatts/v6.json?api_key=${apiKey}&lat=${urlData.lat}&lon=${urlData.lon}&system_capacity=${urlData.system_capacity}&azimuth=${urlData.azymuth}&tilt=${urlData.tilt}&array_type=${urlData.array_type}&module_type=${urlData.module_type}&losses=${urlData.losses}`;
    try {
      const result = await axios.get(requestUrl);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSolarData();
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        padding: 24,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ flex: 1 }}>
        <Statistics />
      </div>
      <Sider width={400} style={{
        borderRadius: 12,
        backgroundColor: 'white',
        boxShadow: '0px 3px 26px -7px rgba(0, 70, 143, 0.5)'
      }}>
        <Visualisation />
      </Sider>
    </Layout>
  );
};

export default ResultsPage;
