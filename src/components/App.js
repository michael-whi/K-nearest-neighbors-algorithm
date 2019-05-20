import React, { Component, Fragment } from "react";
import '../styles/App.css';
import Graph from "./Graph";
import styled from 'styled-components'
import getRandomData from './../utils/dataGenerator'
import { Row, Col } from 'antd'
import 'antd/dist/antd.css'

const Header = styled.section`
    font-size: 45px;
    font-weight: lighter;
    padding-left: 30px;
    border-bottom: 1px solid #e0e0e0;
`;

const LeftPane = styled.section`
    height: calc(100vh - 90px);
    font-weight: lighter;
    padding: 20px;
    box-shadow: 0px 9px 21px #dadada
    background: #fff;
    height: 280px;
`;

const Plate = styled.section`
    padding: 20px;
    box-shadow: 0px 9px 21px #dadada;
    width: 97%;
    margin-top: 20px;
    margin-left: 15px;
`;

const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    border-radius: 3px;
    font-size: 15px;
    border: 1px solid #ccc;
    width: 90%;
`;

const Info = styled.textarea`
    padding: 0.5em;
    margin: 0.5em;
    border-radius: 17px;
    font-size: 15px;
    border: 1px solid #f4f4f4;
    width: 90%;
    height: auto;
    resize: none;
`;

const Button = styled.button`
    border: none;
    color: #FFFFFF;
    padding: 15px 32px;
    text-align: center;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    margin: 16px 0 !important;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    height: auto;
    width: 90%;
`;

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