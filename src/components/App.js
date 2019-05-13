import React, { Component, Fragment } from "react";
import '../styles/App.css';
import Graph from "./Graph";
import styled from 'styled-components'
import getRandomData from './../utils/dataGenerator'
import { Row, Col } from 'antd'
import 'antd/dist/antd.css'

const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
`;

const Header = styled.section`
    font-size: 45px;
    font-weight: lighter;
    padding-left: 30px;
    border-bottom: 1px solid #e0e0e0;

`;

const LeftPane = styled.section`
    height: calc(100vh - 90px);
    font-size: 45px;
    font-weight: lighter;
    padding: 20px;
    box-shadow: 0px 9px 8px #f7f5f5;
`;

class App extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        const data = getRandomData()

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
                <Col span={4}>
                    <LeftPane>
                        
                    </LeftPane>    
                </Col>
                <Col span={20}>
                    <Wrapper>
                        <div className="graph-column">
                            <Graph
                                data={data}
                            />
                        </div>
                    </Wrapper>
                </Col>
            </Row>
            </Fragment>
        );
    }
}

export default App;