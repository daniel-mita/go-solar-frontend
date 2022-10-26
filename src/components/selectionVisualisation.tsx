import { SmileOutlined } from '@ant-design/icons';
import { Result } from 'antd';

import Area3D from './area3d'

import SolarsPanel from '/Users/silviumanzur/Documents/work/hacktm/rooftop-detection-python/output1.jpg'

const SelectionVisualisation = () => {


    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: "1.5rem 4rem",
                flex: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div >
                <Result
                    icon={<SmileOutlined />}
                    title="Great, we have done all the operations!"
                    extra={<p style={{ margin: 0, padding: 0, position: 'relative', top: -20, fontSize: 18, fontWeight: 200 }}>The following image represents your selection together with panels.</p>}
                />
            </div>
            <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {/* <Area3D /> */}
                <img src={"/housesolars.jpeg"} width={400} height={400} />
            </div>
        </div>
    )
}

export default SelectionVisualisation