import 'antd/dist/antd.css';
import React from "react";
import { Tabs } from "antd";
import Track from './Track'; 
import Ship from './Ship'; 

const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};

class Home extends React.Component {
    render() {
        return (
            <main>
                <br />
                <div className='HomePage'>
                    <Tabs
                        defaultActiveKey="1"
                        onChange={onChange}
                        size="large"
                        centered
                    >
                        <TabPane tab="Track" key="1">

                            {/* Track order */}
                            <Track />
                        </TabPane>
                        <TabPane tab="Ship" key="2" className="shipForm">

                            {/* From address */}
                            <Ship />
                        </TabPane>
                    </Tabs>
                </div>
            </main>
        );
    }
}

export default Home; 
