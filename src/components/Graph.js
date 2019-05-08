import React, { Component, Fragment } from 'react';
import Plot from 'react-plotly.js';
import { getDistanceByXYSimple, getNearestNeighbours } from './../utils/mathDistance'
import update from 'immutability-helper'

class Graph extends Component {


    state = { data: [] };

    componentDidUpdate(prevProps, prevState) {
        
    }

    componentDidMount() {
        console.log(getDistanceByXYSimple(1, 3, 5, 3))
        const data = this.props.data.map(f => ({
            "type": "scatter",
            "mode": "markers",
            "x": [f.x],
            "y": [f.y],
            "marker": {
                "color": f.fill,
                "size": [10 * (f.x/2)],
                "sizeref": 1,
                "sizemin": 1
            },
            "text": [f.x, f.y]
        }))
        this.setState({ data }, () => {
            const test = this.props.data.map((f) => ({ x: f.x, y: f.y }))
            const point = { x: 3, y: 3 }
            const neighbourList = getNearestNeighbours(point.x, point.y, 5, test)
            const lineList = neighbourList.map((n) => (
                {
                    "type": "line",
                    "x": [n.x, point.x],
                    "y": [n.y, point.y],
                    "marker": {
                        "color": "#1890ff"
                    },
                    "text": [n.distance]
                }
            ))
            const updatedData = update(this.state.data, { $push: lineList })
            this.setState({ data: updatedData })
        })
    }

    render() {
        //const {data} = this.state
        return (
            <Fragment>
                {this.state.data.length > 0 && <Plot
                    data={this.state.data}
                    layout={{ width: 800, height: 600, title: 'Oranges and grapefruits' }}
                    onHover={(o) => this.o = o}
                    onDoubleClick={() => {
                        console.log('double')
                        if (this.o) {
                            const newPoint = {
                                "type": "scatter",
                                "mode": "markers",
                                "x": this.o.xvals,
                                "y": this.o.yvals,
                                "marker": {
                                    "color": "#777777",
                                    "size": [10*this.o.xvals],
                                    "sizeref": 1,
                                    "sizemin": 1
                                },
                                "text": [this.o.xvals, this.o.yvals]
                            }
                            const updatedList = update(this.state.data, { $push: [newPoint] })
                            this.setState({ data: updatedList })
                        }
                    }}
                />}
            </Fragment>
        );

    }

}

export default Graph;