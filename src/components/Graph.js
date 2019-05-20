import React, { Component, Fragment } from 'react';
import Plot from 'react-plotly.js';
import { getNearestNeighbours } from '../math/mathDistance'
import update from 'immutability-helper'
import getRandomColor from './../utils/randomColor'

class Graph extends Component {

    state = { data: [], lastPoint: null };

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
                const currentColor = getRandomColor()
                const pointIndex = updatedList.findIndex(point => point.x[0] === newPoint.x[0] && point.y[0] === newPoint.y[0])
                const neighbourList = getNearestNeighbours(
                    newPoint.x[0], 
                    newPoint.y[0], 
                    5, 
                    data.map((f) => ({ x: f.x, y: f.y, type: f.fruit.type })),
                    "type"
                )
                const lineList = neighbourList.map((n) => (
                    {
                        "type": "line",
                        "x": [n.x[0], updatedList[pointIndex].x[0]],
                        "y": [n.y[0], updatedList[pointIndex].y[0]],
                        "marker": {
                            "color": currentColor 
                        },
                        "text": [n.distance]
                    }
                ))
                //have to clean the lines of previous point and add new lines
                let updatedData = update(this.state.data, { $push: lineList })
                
                //the only way to figure out the new point type is to get nearest point and take its type
                const nearest = this.state.data.find( p => p.x[0] === neighbourList[0].x[0] && p.y[0] === neighbourList[0].y[0])
                console.log(nearest)
                updatedData = update(updatedData, { 
                    [pointIndex]: {
                        fruit: { $set: {"fill" : nearest.fruit.fill, "type": nearest.fruit.type} },
                        text: { $set: [nearest.fruit.type === 0 ? "orange" : "grapefruit"] }, 
                        marker: { color: {$set: nearest.fruit.fill } } 
                    } 
                })
                this.setState({ data: updatedData })
            })
        }
    }

    makeDataForGraph(){
        const data = this.props.data.map(f => ({
            "fruit": {"fill" : f.fill, "type": f.type},
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
            "text": [f.x, f.y, f.type === 0 ? "orange" : "grapefruit"]
        }))
        this.setState({ data })
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