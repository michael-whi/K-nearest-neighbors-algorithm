import React, { Component, Fragment } from "react";
import '../styles/App.css';
import Graph from "./Graph";

import getRandomData from './../utils/dataGenerator'
import { Row, Col } from 'antd'
import 'antd/dist/antd.css'
import { Button, Info, Input, Plate, LeftPane, Header } from './../styles/styledLibrary'

class App extends Component {

    state = {
        neighbourAmount: 5,
        infoText: "Make double click to create a new point."
    }

    handleNeighbourChange = (event) => {
        this.setState({ neighbourAmount: event.target.value })
    }

    setInfoBoxMessage() {
        this.setState({ infoText: "" })
    }

    render() {
        const data = getRandomData()
        const { neighbourAmount, infoText } = this.state
        return (
            <Fragment>
                <Row>
                    <Col span={24}>
                        <Header>
                            K nearest neighbour
                    </Header>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={{ padding: '20px' }}>
                        <LeftPane>
                            Amount of neighbours
                            <Input
                                value={neighbourAmount}
                                onChange={this.handleNeighbourChange}
                            />
                            <Info placeholder={infoText} />
                            <Button>Reset data</Button>
                        </LeftPane>
                    </Col>
                    <Col span={20}>
                        <Plate>
                            <Graph
                                data={data}
                                setInfoBoxMessage={this.setInfoBoxMessage}
                            />
                        </Plate>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default App;