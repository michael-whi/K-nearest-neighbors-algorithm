import React, { Component, Fragment } from "react";
import { Row, Col } from 'antd'
import 'antd/dist/antd.css'

import getRandomData from './../utils/dataGenerator'
import '../styles/App.css';
import Graph from "./Graph";



import { Button, Info, Input, Plate, LeftPane, Header } from './../styles/styledLibrary'

class App extends Component {

    state = {
        initialAmountOfPoints: 50,
        neighbourAmount: 5,
        infoText: "Make double click to create a new point.",
        initData: getRandomData()
    }

    handleResetData = () => {
        const {initialAmountOfPoints} = this.state
        this.setState({ initData: getRandomData(initialAmountOfPoints) })
    }

    handleInitialAmountChange = (event) => {
        this.setState({ initialAmountOfPoints: event.target.value })
    }

    handleNeighbourChange = (event) => {
        this.setState({ neighbourAmount: event.target.value })
    }

    setInfoBoxMessage = (text) => {
        this.setState({ infoText: text })
    }

    render() {
        const { neighbourAmount, infoText, initialAmountOfPoints, initData } = this.state
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
                            Initial amount of points
                            <Input
                                value={initialAmountOfPoints}
                                onChange={this.handleInitialAmountChange}
                            />
                            <Info placeholder={infoText} />
                            <Button onClick={this.handleResetData}>Reset data</Button>
                        </LeftPane>
                    </Col>
                    <Col span={20}>
                        <Plate>
                            <Graph
                                initData={initData}
                                setInfoBoxMessage={this.setInfoBoxMessage}
                                neighbourAmount={neighbourAmount}
                            />
                        </Plate>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default App;