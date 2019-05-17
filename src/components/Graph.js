import React, { Component, Fragment } from 'react';
import Plot from 'react-plotly.js';
import { getDistanceByXYSimple, getNearestNeighbours } from '../math/mathDistance'
import update from 'immutability-helper'

class Graph extends Component {


    state = { data: [], lastPoint: null };

    clearStaleSegments(){

    }

    onCreateNewPoint() {
        const { lastPoint, data } = this.state
        console.log('double')
        if (this.o) {
            const newPoint = {
                "type": "scatter",
                "mode": "markers",
                "x": this.o.xvals,
                "y": this.o.yvals,
                "marker": {
                    "color": "#777777",
                    "size": [10 * this.o.xvals / 2],
                    "sizeref": 1,
                    "sizemin": 1
                },
                "text": [this.o.xvals, this.o.yvals]
            }
            const updatedList = update(this.state.data, { $push: [newPoint] })
            this.setState({ data: updatedList, lastPoint: newPoint }, () => {
                const pointIndex = data.findIndex(point => point.x[0] === lastPoint.x[0] && point.y[0] === lastPoint.y[0])
                const test = data.map((f) => ({ x: f.x, y: f.y }))
                const neighbourList = getNearestNeighbours(lastPoint.x[0], lastPoint.y[0], 5, test)
                const lineList = neighbourList.map((n) => (
                    {
                        "type": "line",
                        "x": [n.x, data[pointIndex].x[0]],
                        "y": [n.y, data[pointIndex].y[0]],
                        "marker": {
                            "color": "#1890ff"
                        },
                        "text": [n.distance]
                    }
                ))
                //have to clean the lines of previous point and add new lines
                let updatedData = update(this.state.data, { $push: lineList })
                
                updatedData = update(this.state.data, { [pointIndex]: { text: { $set: [data[pointIndex].type] } } })
                this.setState({ data: updatedData })
            })
        }
    }

    makeDataForGraph(){
        const data = this.props.data.map(f => ({
            "type": "scatter",
            "mode": "markers",
            "x": [f.x],
            "y": [f.y],
            "marker": {
                "color": f.fill,
                "size": [10 * (f.x / 2)],
                "sizeref": 1,
                "sizemin": 1
            },
            "text": [f.x, f.y]
        }))
        this.setState({ data }/*, () => {
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
        }*/)
    }

    componentDidMount() {
        this.makeDataForGraph()
    }

    componentDidUpdate(prevProps, prevState) {
        const { lastPoint, data } = this.state
        if (prevState.lastPoint !== lastPoint && lastPoint.x) {

        }
    }

    render() {
        //const {data} = this.state
        return (
            <Fragment>
                {this.state.data.length > 0 && <Plot
                    data={this.state.data}
                    layout={{ width: '100%', height: '100%', title: 'Oranges and grapefruits' }}
                    onHover={(o) => this.o = o}
                    onDoubleClick={this.onCreateNewPoint.bind(this)}
                />}
            </Fragment>
        );

    }

}

export default Graph;